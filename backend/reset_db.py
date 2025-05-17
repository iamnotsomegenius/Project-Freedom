import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os

async def reset_database():
    """Reset the database by dropping all collections"""
    mongo_url = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
    db_name = os.environ.get("DB_NAME", "seedsmb")
    
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    # Drop all collections
    collections = await db.list_collection_names()
    for collection in collections:
        await db.drop_collection(collection)
    
    print(f"All collections dropped from database: {db_name}")

if __name__ == "__main__":
    asyncio.run(reset_database())
