from fastapi import FastAPI, APIRouter, Depends, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
import os
import logging
from pathlib import Path
import sys

# Import our custom modules
from .logging_config import logger, setup_logging
from .error_handling import ErrorHandlingMiddleware

# Add the current directory to the path so we can import local modules
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Print environment variables for debugging
print(f"SUPABASE_URL: {os.environ.get('SUPABASE_URL')}")
print(f"SUPABASE_KEY length: {len(os.environ.get('SUPABASE_KEY', ''))}")

# Import routers - use Supabase versions of routers
from routers import auth_supabase, listings_supabase
from routers import investments, offers, deals, profiles, payments, files, seedstack, integration

# Import database functions
from database_supabase import connect_to_supabase, close_supabase_connection
from auth_supabase import get_current_user

# Create rate limiter
limiter = Limiter(key_func=get_remote_address)

# Create the main app without a prefix
app = FastAPI(title="SeedSMB API", description="API for the SeedSMB marketplace")

# Add rate limiting state and handler
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Add custom middleware
# app.add_middleware(ErrorHandlingMiddleware)  # Disabled temporarily

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Include routers
api_router.include_router(auth_supabase.router)
api_router.include_router(profiles.router)
api_router.include_router(listings_supabase.router)
api_router.include_router(investments.router)
api_router.include_router(offers.router)
api_router.include_router(deals.router)
api_router.include_router(payments.router)
api_router.include_router(files.router)
api_router.include_router(seedstack.router)
api_router.include_router(integration.router)

# Add a root endpoint for API health check
@api_router.get("/")
async def root():
    return {"status": "ok", "message": "SeedSMB API is running"}

# Include the router in the main app
app.include_router(api_router)

# Add CORS middleware with environment-specific configuration
FRONTEND_ORIGIN = os.environ.get("FRONTEND_ORIGIN", "http://localhost:3000")
ALLOWED_ORIGINS = [
    FRONTEND_ORIGIN,
    "https://59f7432c-ced4-45ce-b421-129e4da62a98.preview.emergentagent.com",  # Current frontend URL
    "http://localhost:3000",  # Local development
    "http://127.0.0.1:3000"   # Alternative local
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger("seedsmb")
logger.info("Starting SeedSMB API server")
logger.info(f"Environment: {os.environ.get('ENVIRONMENT', 'development')}")

@app.on_event("startup")
async def startup_db_client():
    # Connect to Supabase
    await connect_to_supabase()
    logger.info("Connected to Supabase")

@app.on_event("shutdown")
async def shutdown_db_client():
    # Close connection
    await close_supabase_connection()
    logger.info("Disconnected from Supabase")
