from fastapi import FastAPI, APIRouter, Depends
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path
import sys

# Add the current directory to the path so we can import local modules
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Import routers - use Supabase versions of routers
from routers import auth_supabase as auth
from routers import listings_supabase as listings
from routers import investments, offers, deals, profiles, payments, files

# Import database functions
from database_supabase import connect_to_supabase, close_supabase_connection
from auth_supabase import get_current_user

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create the main app without a prefix
app = FastAPI(title="SeedSMB API", description="API for the SeedSMB marketplace")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Include routers
api_router.include_router(auth.router)
api_router.include_router(profiles.router)
api_router.include_router(listings.router)
api_router.include_router(investments.router)
api_router.include_router(offers.router)
api_router.include_router(deals.router)
api_router.include_router(payments.router)
api_router.include_router(files.router)

# Add a root endpoint for API health check
@api_router.get("/")
async def root():
    return {"status": "ok", "message": "SeedSMB API is running"}

# Include the router in the main app
app.include_router(api_router)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

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
