import os
from typing import Optional, List, Dict, Any, Union
import uuid
from datetime import datetime
from supabase import create_client, Client
from dotenv import load_dotenv

# Load .env file
load_dotenv()

# Initialize Supabase connection variables
supabase_url = os.environ.get("SUPABASE_URL")
supabase_key = os.environ.get("SUPABASE_KEY")

print(f"Supabase URL: {supabase_url}")  # For debugging
print(f"Supabase Key Length: {len(supabase_key) if supabase_key else 0}")  # For debugging

supabase: Optional[Client] = None


def get_supabase() -> Client:
    """
    Get the Supabase client instance for dependency injection
    """
    return supabase


async def connect_to_supabase():
    """
    Connect to Supabase
    """
    global supabase
    if supabase is None:
        if not supabase_url or not supabase_key:
            print("WARNING: Supabase URL and Key not found, using mock data fallback")
            return
        
        try:
            supabase = create_client(supabase_url, supabase_key)
            # Test the connection with a simple query
            test_response = supabase.table("business_listings").select("count", count="exact").limit(1).execute()
            print("Successfully connected to Supabase")
        except Exception as e:
            print(f"Error connecting to Supabase: {str(e)} - Using mock data fallback")
            # Set supabase to None so functions know to use fallback
            supabase = None


async def close_supabase_connection():
    """
    Close Supabase connection (placeholder for compatibility)
    """
    global supabase
    # Supabase client doesn't require explicit closing
    pass


# Helper to generate UUIDs
def generate_uuid() -> str:
    """Generate a UUID for primary keys"""
    return str(uuid.uuid4())


# Supabase Collection helpers
async def create_document(table: str, document: Dict[str, Any]) -> str:
    """
    Create a document in Supabase and return its ID
    """
    try:
        # Ensure document has an ID
        if 'id' not in document:
            document['id'] = generate_uuid()
        
        # Insert into Supabase
        response = supabase.table(table).insert(document).execute()
        
        # Check for errors
        if hasattr(response, 'error') and response.error:
            raise Exception(f"Error creating document: {response.error}")
        
        # Get the ID of the created record
        created_data = response.data
        if created_data and len(created_data) > 0:
            return created_data[0]['id']
        
        return document['id']
    except Exception as e:
        print(f"Error creating document in Supabase: {e}")
        
        # Fallback to mock data
        from mock_data_fallback import create_mock_document
        return create_mock_document(table, document)


async def get_document(table: str, document_id: str) -> Optional[Dict[str, Any]]:
    """
    Get a document by ID
    """
    try:
        response = supabase.table(table).select("*").eq("id", document_id).execute()
        
        # Check for errors
        if hasattr(response, 'error') and response.error:
            raise Exception(f"Error getting document: {response.error}")
        
        # Return the document if found
        if response.data and len(response.data) > 0:
            return response.data[0]
        
        return None
    except Exception as e:
        print(f"Error getting document from Supabase: {e}")
        
        # Fallback to mock data
        from mock_data_fallback import get_mock_document
        return get_mock_document(table, document_id)


async def update_document(
    table: str, document_id: str, update_data: Dict[str, Any]
) -> bool:
    """
    Update a document by ID
    """
    try:
        response = supabase.table(table).update(update_data).eq("id", document_id).execute()
        
        # Check for errors
        if hasattr(response, 'error') and response.error:
            raise Exception(f"Error updating document: {response.error}")
        
        # Return success
        return True
    except Exception as e:
        print(f"Error updating document in Supabase: {e}")
        
        # Fallback to mock data
        from mock_data_fallback import update_mock_document
        return update_mock_document(table, document_id, update_data)


async def delete_document(table: str, document_id: str) -> bool:
    """
    Delete a document by ID
    """
    response = supabase.table(table).delete().eq("id", document_id).execute()
    
    # Check for errors
    if hasattr(response, 'error') and response.error:
        raise Exception(f"Error deleting document: {response.error}")
    
    # Return success
    return True


async def list_documents(
    table: str, 
    filter_query: Dict[str, Any] = None, 
    skip: int = 0, 
    limit: int = 100,
    sort_by: Dict[str, int] = None
) -> List[Dict[str, Any]]:
    """
    List documents with optional filtering, pagination, and sorting
    """
    try:
        supabase = get_supabase()
        
        # Check if supabase is None (not connected)
        if supabase is None:
            raise Exception("Supabase client is not initialized")
        
        # Basic query
        query = supabase.table(table).select("*")
        
        # Apply filtering
        if filter_query:
            for key, value in filter_query.items():
                # Handle different filter types
                if isinstance(value, dict):
                    # Handle operators like $in, $gte, etc.
                    for op, op_value in value.items():
                        if op == '$in':
                            # Handle $in operator
                            query = query.in_(key, op_value)
                        elif op == '$gte':
                            query = query.gte(key, op_value)
                        elif op == '$lte':
                            query = query.lte(key, op_value)
                        elif op == '$gt':
                            query = query.gt(key, op_value)
                        elif op == '$lt':
                            query = query.lt(key, op_value)
                        # Add more operators as needed
                else:
                    # Simple equality filter
                    query = query.eq(key, value)
        
        # Apply pagination
        if skip > 0:
            query = query.range(skip, skip + limit - 1)
        else:
            query = query.limit(limit)
        
        # Execute query
        response = query.execute()
        
        # Check for errors
        if hasattr(response, 'error') and response.error:
            raise Exception(f"Error listing documents: {response.error}")
        
        # Return the documents
        return response.data
    except Exception as e:
        print(f"Error listing documents from Supabase: {e}")
        
        # Fallback to mock data
        from mock_data_fallback import list_mock_documents
        return list_mock_documents(table, filter_query)
