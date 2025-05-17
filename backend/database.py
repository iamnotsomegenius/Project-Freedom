from typing import Optional, List, Dict, Any
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from bson import ObjectId
import os

# Initialize MongoDB connection
mongo_url = os.environ.get("MONGO_URL")
db_name = os.environ.get("DB_NAME", "seedsmb")

client: Optional[AsyncIOMotorClient] = None
db: Optional[AsyncIOMotorDatabase] = None


def get_database() -> AsyncIOMotorDatabase:
    """
    Get the database instance for dependency injection
    """
    return db


async def connect_to_mongo():
    """
    Connect to MongoDB
    """
    global client, db
    if client is None:
        client = AsyncIOMotorClient(mongo_url)
        db = client[db_name]


async def close_mongo_connection():
    """
    Close MongoDB connection
    """
    global client
    if client is not None:
        client.close()


# MongoDB Collection helpers
async def create_document(collection: str, document: Dict[str, Any]) -> str:
    """
    Create a document in MongoDB and return its ID
    """
    result = await db[collection].insert_one(document)
    return str(result.inserted_id)


async def get_document(collection: str, document_id: str) -> Optional[Dict[str, Any]]:
    """
    Get a document by ID
    """
    document = await db[collection].find_one({"_id": document_id})
    if document:
        document["id"] = str(document["_id"])
    return document


async def update_document(
    collection: str, document_id: str, update_data: Dict[str, Any]
) -> bool:
    """
    Update a document by ID
    """
    result = await db[collection].update_one(
        {"_id": document_id}, {"$set": update_data}
    )
    return result.modified_count > 0


async def delete_document(collection: str, document_id: str) -> bool:
    """
    Delete a document by ID
    """
    result = await db[collection].delete_one({"_id": document_id})
    return result.deleted_count > 0


async def list_documents(
    collection: str, 
    filter_query: Dict[str, Any] = None, 
    skip: int = 0, 
    limit: int = 100,
    sort_by: Dict[str, int] = None
) -> List[Dict[str, Any]]:
    """
    List documents with optional filtering, pagination, and sorting
    """
    cursor = db[collection].find(filter_query or {})
    
    if sort_by:
        cursor = cursor.sort(list(sort_by.items()))
    
    cursor = cursor.skip(skip).limit(limit)
    
    documents = await cursor.to_list(length=limit)
    
    # Convert _id to string id for each document
    for document in documents:
        document["id"] = str(document["_id"])
    
    return documents
