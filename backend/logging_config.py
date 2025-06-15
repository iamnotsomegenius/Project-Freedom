import logging
import os
import sys
from datetime import datetime
from pathlib import Path

# Create logs directory if it doesn't exist
logs_dir = Path(__file__).parent / "logs"
logs_dir.mkdir(exist_ok=True)

def setup_logging():
    """Setup comprehensive logging configuration"""
    
    # Get log level from environment
    log_level = os.environ.get("LOG_LEVEL", "INFO").upper()
    
    # Create formatters
    detailed_formatter = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - [%(filename)s:%(lineno)d] - %(message)s'
    )
    
    simple_formatter = logging.Formatter(
        '%(asctime)s - %(levelname)s - %(message)s'
    )
    
    # Create handlers
    handlers = []
    
    # Console handler (always enabled)
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setFormatter(simple_formatter)
    console_handler.setLevel(logging.INFO)
    handlers.append(console_handler)
    
    # File handler for detailed logs
    log_file = logs_dir / f"seedsmb_{datetime.now().strftime('%Y%m%d')}.log"
    file_handler = logging.FileHandler(log_file)
    file_handler.setFormatter(detailed_formatter)
    file_handler.setLevel(logging.DEBUG)
    handlers.append(file_handler)
    
    # Error file handler
    error_log_file = logs_dir / f"errors_{datetime.now().strftime('%Y%m%d')}.log"
    error_handler = logging.FileHandler(error_log_file)
    error_handler.setFormatter(detailed_formatter)
    error_handler.setLevel(logging.ERROR)
    handlers.append(error_handler)
    
    # Configure root logger
    logging.basicConfig(
        level=getattr(logging, log_level, logging.INFO),
        handlers=handlers,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    
    # Configure specific loggers
    logging.getLogger("uvicorn").setLevel(logging.INFO)
    logging.getLogger("fastapi").setLevel(logging.INFO)
    logging.getLogger("supabase").setLevel(logging.WARNING)
    
    # Create application logger
    logger = logging.getLogger("seedsmb")
    logger.info("Logging system initialized")
    logger.info(f"Log level set to: {log_level}")
    logger.info(f"Detailed logs: {log_file}")
    logger.info(f"Error logs: {error_log_file}")
    
    return logger

# Global logger instance
logger = setup_logging()