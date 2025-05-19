import asyncio
import os
from passlib.context import CryptContext
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
from enum import Enum

# Setup password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# User types
class UserType(str, Enum):
    SELLER = "SELLER"
    BUYER = "BUYER"
    INVESTOR = "INVESTOR"
    ADMIN = "ADMIN"

async def create_test_user():
    # Connect to MongoDB
    mongo_url = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
    db_name = os.environ.get("DB_NAME", "seedsmb")
    
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    # Check if the test user already exists
    existing_user = await db.profiles.find_one({"email": "test@example.com"})
    if existing_user:
        print(f"Test user already exists with ID: {existing_user['_id']}")
        return
    
    # Create a hashed password
    hashed_password = pwd_context.hash("password123")
    
    # Create the test user document
    user_data = {
        "email": "test@example.com",
        "hashed_password": hashed_password,
        "user_type": UserType.BUYER.value,
        "display_name": "Test User",
        "completed_onboarding": True,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
    
    # Insert the user
    result = await db.profiles.insert_one(user_data)
    
    print(f"Created test user with ID: {result.inserted_id}")
    print("Email: test@example.com")
    print("Password: password123")

if __name__ == "__main__":
    asyncio.run(create_test_user())
