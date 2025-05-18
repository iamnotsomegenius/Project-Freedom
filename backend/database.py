from typing import Optional, List, Dict, Any, Union
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


# Helper to handle ObjectId conversion
def convert_id(id_value: Union[str, ObjectId]) -> Union[str, ObjectId]:
    """Convert string ID to ObjectId for MongoDB queries or vice versa"""
    if isinstance(id_value, str):
        try:
            return ObjectId(id_value)
        except:
            return id_value
    elif isinstance(id_value, ObjectId):
        return str(id_value)
    return id_value


# MongoDB Collection helpers
async def create_document(collection: str, document: Dict[str, Any]) -> str:
    """
    Create a document in MongoDB and return its ID
    """
    # Convert string IDs to ObjectId for related fields
    for key, value in document.items():
        if key.endswith('_id') and isinstance(value, str) and value:
            try:
                document[key] = ObjectId(value)
            except:
                pass
    
    result = await db[collection].insert_one(document)
    return str(result.inserted_id)


async def get_document(collection: str, document_id: str) -> Optional[Dict[str, Any]]:
    """
    Get a document by ID
    """
    try:
        obj_id = ObjectId(document_id)
    except:
        obj_id = document_id
        
    document = await db[collection].find_one({"_id": obj_id})
    if document:
        # Convert all ObjectIds to strings for JSON serialization
        document["id"] = str(document["_id"])
        for key, value in document.items():
            if isinstance(value, ObjectId):
                document[key] = str(value)
    return document


async def update_document(
    collection: str, document_id: str, update_data: Dict[str, Any]
) -> bool:
    """
    Update a document by ID
    """
    # Convert string IDs to ObjectId for related fields
    for key, value in update_data.items():
        if key.endswith('_id') and isinstance(value, str) and value:
            try:
                update_data[key] = ObjectId(value)
            except:
                pass
    
    try:
        obj_id = ObjectId(document_id)
    except:
        obj_id = document_id
    
    result = await db[collection].update_one(
        {"_id": obj_id}, {"$set": update_data}
    )
    return result.modified_count > 0


async def delete_document(collection: str, document_id: str) -> bool:
    """
    Delete a document by ID
    """
    try:
        obj_id = ObjectId(document_id)
    except:
        obj_id = document_id
        
    result = await db[collection].delete_one({"_id": obj_id})
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
    # Process filter_query to convert string IDs to ObjectId
    if filter_query:
        for key, value in filter_query.items():
            if key.endswith('_id') and isinstance(value, str) and value:
                try:
                    filter_query[key] = ObjectId(value)
                except:
                    pass
            # Handle $in operator with list of IDs
            elif isinstance(value, dict) and '$in' in value and key.endswith('_id'):
                id_list = value['$in']
                if isinstance(id_list, list):
                    try:
                        filter_query[key]['$in'] = [ObjectId(id) if isinstance(id, str) else id for id in id_list]
                    except:
                        pass
    
    cursor = db[collection].find(filter_query or {})
    
    if sort_by:
        cursor = cursor.sort(list(sort_by.items()))
    
    cursor = cursor.skip(skip).limit(limit)
    
    documents = await cursor.to_list(length=limit)
    
    # Convert _id to string id for each document
    for document in documents:
        document["id"] = str(document["_id"])
        # Convert all ObjectIds to strings for JSON serialization
        for key, value in document.items():
            if isinstance(value, ObjectId):
                document[key] = str(value)
    
    return documents
