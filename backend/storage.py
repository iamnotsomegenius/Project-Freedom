from typing import Dict, Any, Optional, List
import os
import uuid
from datetime import timedelta
import mimetypes

from database_supabase import get_supabase


async def upload_file(
    file_data: bytes,
    file_name: str,
    folder: str,
    user_id: str,
    content_type: Optional[str] = None,
    public: bool = False
) -> Dict[str, Any]:
    """
    Upload a file to Supabase Storage
    
    Args:
        file_data: File data as bytes
        file_name: Original file name
        folder: Storage folder path
        user_id: ID of the user uploading the file
        content_type: MIME type of the file
        public: Whether the file should be publicly accessible
        
    Returns:
        Information about the uploaded file including the URL
    """
    supabase = get_supabase()
    
    # Generate a UUID for the file to prevent collisions
    file_uuid = str(uuid.uuid4())
    ext = os.path.splitext(file_name)[1].lower()
    unique_name = f"{file_uuid}{ext}"
    
    # Determine content type if not provided
    if not content_type:
        content_type, _ = mimetypes.guess_type(file_name)
        content_type = content_type or "application/octet-stream"
    
    # Folder to store the file in - include user ID for access control
    folder_path = f"{folder}/{user_id}"
    file_path = f"{folder_path}/{unique_name}"
    
    # Upload the file
    bucket_name = "marketplace-files"
    
    try:
        # Make sure the bucket exists, create if not
        buckets = supabase.storage.list_buckets()
        if not any(bucket.name == bucket_name for bucket in buckets):
            supabase.storage.create_bucket(bucket_name, {"public": public})
        
        # Upload the file to the bucket
        response = supabase.storage.from_(bucket_name).upload(
            file_path,
            file_data,
            {"content-type": content_type}
        )
        
        # Generate URL to the file
        url = None
        if public:
            url = supabase.storage.from_(bucket_name).get_public_url(file_path)
        else:
            # Generate a signed URL that expires after some time
            url = supabase.storage.from_(bucket_name).create_signed_url(
                file_path, 
                timedelta(hours=1).total_seconds()
            )
        
        # Return file information
        return {
            "id": unique_name,
            "name": file_name,
            "path": file_path,
            "url": url,
            "content_type": content_type,
            "size": len(file_data),
            "bucket": bucket_name
        }
    
    except Exception as e:
        # Log the error and reraise
        print(f"Error uploading file: {str(e)}")
        raise


async def get_file_url(
    file_path: str,
    bucket_name: str = "marketplace-files",
    public: bool = False,
    expires_in: int = 3600  # 1 hour in seconds
) -> str:
    """
    Get a URL to a file stored in Supabase Storage
    
    Args:
        file_path: Path to the file within the bucket
        bucket_name: Name of the bucket
        public: Whether the file is publicly accessible
        expires_in: How long the URL should be valid for (in seconds)
        
    Returns:
        URL to the file
    """
    supabase = get_supabase()
    
    try:
        if public:
            url = supabase.storage.from_(bucket_name).get_public_url(file_path)
        else:
            url = supabase.storage.from_(bucket_name).create_signed_url(
                file_path, 
                expires_in
            )
        
        return url
    
    except Exception as e:
        print(f"Error getting file URL: {str(e)}")
        raise


async def delete_file(
    file_path: str,
    bucket_name: str = "marketplace-files"
) -> bool:
    """
    Delete a file from Supabase Storage
    
    Args:
        file_path: Path to the file within the bucket
        bucket_name: Name of the bucket
        
    Returns:
        True if the file was deleted successfully
    """
    supabase = get_supabase()
    
    try:
        response = supabase.storage.from_(bucket_name).remove([file_path])
        return True
    
    except Exception as e:
        print(f"Error deleting file: {str(e)}")
        raise


async def list_files(
    folder_path: str,
    bucket_name: str = "marketplace-files"
) -> List[Dict[str, Any]]:
    """
    List files in a folder in Supabase Storage
    
    Args:
        folder_path: Path to the folder within the bucket
        bucket_name: Name of the bucket
        
    Returns:
        List of file objects
    """
    supabase = get_supabase()
    
    try:
        response = supabase.storage.from_(bucket_name).list(folder_path)
        return response
    
    except Exception as e:
        print(f"Error listing files: {str(e)}")
        raise
