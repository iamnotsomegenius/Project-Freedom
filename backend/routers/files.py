from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form, Query
from typing import List, Dict, Any, Optional
import os

from models import UserProfile
from auth_supabase import get_current_user
from storage import upload_file, get_file_url, delete_file, list_files

router = APIRouter(prefix="/files", tags=["files"])


@router.post("/upload", response_model=Dict[str, Any])
async def upload_document(
    file: UploadFile = File(...),
    folder: str = Form(...),
    public: bool = Form(False),
    current_user: UserProfile = Depends(get_current_user)
):
    """
    Upload a file to the marketplace
    
    Args:
        file: File to upload
        folder: Folder to store the file in (e.g., "listings", "deals", "profile")
        public: Whether the file should be publicly accessible
        current_user: Current authenticated user
    """
    # Read the file data
    file_data = await file.read()
    
    if not file_data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Empty file"
        )
    
    # Upload the file
    result = await upload_file(
        file_data=file_data,
        file_name=file.filename,
        folder=folder,
        user_id=current_user.id,
        content_type=file.content_type,
        public=public
    )
    
    return result


@router.get("/url", response_model=Dict[str, str])
async def get_document_url(
    path: str,
    bucket: str = Query("marketplace-files"),
    public: bool = Query(False),
    current_user: UserProfile = Depends(get_current_user)
):
    """
    Get a URL to access a document
    
    Args:
        path: Path to the file within the bucket
        bucket: Storage bucket name
        public: Whether the file is publicly accessible
        current_user: Current authenticated user
    """
    # Check if the user has access to this file
    # This is a simplified check - you might want to implement more sophisticated
    # access control in a production environment
    user_folder = f"{path.split('/')[0]}/{current_user.id}"
    if not path.startswith(user_folder) and not current_user.user_type == "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You don't have access to this file"
        )
    
    # Get the URL
    url = await get_file_url(
        file_path=path,
        bucket_name=bucket,
        public=public
    )
    
    return {"url": url}


@router.delete("/delete", response_model=Dict[str, bool])
async def delete_document(
    path: str,
    bucket: str = Query("marketplace-files"),
    current_user: UserProfile = Depends(get_current_user)
):
    """
    Delete a document
    
    Args:
        path: Path to the file within the bucket
        bucket: Storage bucket name
        current_user: Current authenticated user
    """
    # Check if the user has access to this file
    user_folder = f"{path.split('/')[0]}/{current_user.id}"
    if not path.startswith(user_folder) and not current_user.user_type == "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You don't have permission to delete this file"
        )
    
    # Delete the file
    success = await delete_file(
        file_path=path,
        bucket_name=bucket
    )
    
    return {"success": success}


@router.get("/list", response_model=List[Dict[str, Any]])
async def list_documents(
    folder: str,
    bucket: str = Query("marketplace-files"),
    current_user: UserProfile = Depends(get_current_user)
):
    """
    List documents in a folder
    
    Args:
        folder: Folder path within the bucket
        bucket: Storage bucket name
        current_user: Current authenticated user
    """
    # Make sure we're only listing the user's own files
    # or all files if the user is an admin
    if current_user.user_type != "admin":
        folder = f"{folder}/{current_user.id}"
    
    # List files
    files = await list_files(
        folder_path=folder,
        bucket_name=bucket
    )
    
    return files
