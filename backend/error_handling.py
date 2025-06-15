from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
import logging
import traceback
import time
from typing import Dict, Any
import uuid

logger = logging.getLogger("seedsmb.middleware")

class ErrorHandlingMiddleware(BaseHTTPMiddleware):
    """
    Comprehensive error handling and logging middleware
    """
    
    async def dispatch(self, request: Request, call_next):
        # Generate request ID for tracking
        request_id = str(uuid.uuid4())[:8]
        request.state.request_id = request_id
        
        # Start timing
        start_time = time.time()
        
        # Log request
        logger.info(
            f"[{request_id}] {request.method} {request.url.path} - "
            f"Client: {request.client.host if request.client else 'unknown'}"
        )
        
        try:
            # Process request
            response = await call_next(request)
            
            # Log successful response
            process_time = time.time() - start_time
            logger.info(
                f"[{request_id}] Completed in {process_time:.3f}s - "
                f"Status: {response.status_code}"
            )
            
            return response
            
        except HTTPException as e:
            # Log HTTP exceptions
            process_time = time.time() - start_time
            logger.warning(
                f"[{request_id}] HTTP Error {e.status_code}: {e.detail} - "
                f"Completed in {process_time:.3f}s"
            )
            
            return JSONResponse(
                status_code=e.status_code,
                content={
                    "error": e.detail,
                    "request_id": request_id,
                    "type": "http_error"
                }
            )
            
        except Exception as e:
            # Log unexpected errors
            process_time = time.time() - start_time
            error_details = {
                "error": str(e),
                "type": type(e).__name__,
                "request_id": request_id,
                "path": request.url.path,
                "method": request.method,
                "process_time": process_time
            }
            
            logger.error(
                f"[{request_id}] Unexpected error: {str(e)}\n"
                f"Traceback: {traceback.format_exc()}"
            )
            
            # Return generic error response (don't expose internal details)
            return JSONResponse(
                status_code=500,
                content={
                    "error": "An internal server error occurred",
                    "request_id": request_id,
                    "type": "internal_error"
                }
            )

class DatabaseErrorHandler:
    """
    Centralized database error handling
    """
    
    @staticmethod
    def handle_database_error(operation: str, error: Exception, fallback_data: Any = None):
        """
        Handle database operation errors with fallback
        
        Args:
            operation: Description of the database operation
            error: The exception that occurred
            fallback_data: Optional fallback data to return
        
        Returns:
            Fallback data if provided, otherwise re-raises the error
        """
        error_msg = f"Database error in {operation}: {str(error)}"
        
        # Log the error
        logger.error(f"{error_msg}\nTraceback: {traceback.format_exc()}")
        
        # If we have fallback data, use it
        if fallback_data is not None:
            logger.warning(f"Using fallback data for {operation}")
            return fallback_data
        
        # Otherwise, raise a more user-friendly error
        raise HTTPException(
            status_code=503,
            detail=f"Database service temporarily unavailable. Please try again later."
        )

class ValidationErrorHandler:
    """
    Handle validation errors consistently
    """
    
    @staticmethod
    def format_validation_error(error: Exception) -> Dict[str, Any]:
        """
        Format validation errors for consistent API responses
        """
        if hasattr(error, 'errors'):
            # Pydantic validation error
            formatted_errors = []
            for err in error.errors():
                formatted_errors.append({
                    "field": " -> ".join(str(loc) for loc in err["loc"]),
                    "message": err["msg"],
                    "type": err["type"]
                })
            
            return {
                "error": "Validation failed",
                "details": formatted_errors,
                "type": "validation_error"
            }
        else:
            # Generic validation error
            return {
                "error": str(error),
                "type": "validation_error"
            }

# Utility functions for consistent error responses
def create_error_response(
    status_code: int,
    message: str,
    details: Any = None,
    error_type: str = "error"
) -> JSONResponse:
    """
    Create a standardized error response
    """
    content = {
        "error": message,
        "type": error_type
    }
    
    if details:
        content["details"] = details
    
    return JSONResponse(
        status_code=status_code,
        content=content
    )

def log_operation(operation: str, success: bool = True, **kwargs):
    """
    Log business operations for monitoring
    """
    log_msg = f"Operation: {operation}"
    
    if kwargs:
        details = ", ".join(f"{k}={v}" for k, v in kwargs.items())
        log_msg += f" - {details}"
    
    if success:
        logger.info(f"✅ {log_msg}")
    else:
        logger.warning(f"❌ {log_msg}")