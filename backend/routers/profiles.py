from fastapi import APIRouter, Depends, HTTPException, status
from typing import List

from models import UserProfile, UserProfileUpdate, UserType
from auth import get_current_user
from database import get_database, update_document, get_document, list_documents

router = APIRouter(prefix="/profiles", tags=["profiles"])


@router.get("/me", response_model=UserProfile)
async def get_current_user_profile(
    current_user: UserProfile = Depends(get_current_user),
    db=Depends(get_database)
):
    """
    Get the current user's profile
    """
    # Get fresh user data from database
    user = await get_document("profiles", current_user.id)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    return UserProfile(**user)


@router.put("/me", response_model=UserProfile)
async def update_current_user_profile(
    profile_data: UserProfileUpdate,
    current_user: UserProfile = Depends(get_current_user),
    db=Depends(get_database)
):
    """
    Update the current user's profile
    """
    # Get current user from database
    user = await get_document("profiles", current_user.id)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Update the profile
    update_data = profile_data.model_dump(exclude_unset=True)
    
    # Don't allow changing user type once set
    if "user_type" in update_data and user.get("user_type") and user.get("completed_onboarding"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot change user type after onboarding completion"
        )
    
    # Update document
    success = await update_document("profiles", current_user.id, update_data)
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update profile"
        )
    
    # Get the updated profile
    updated_user = await get_document("profiles", current_user.id)
    
    return UserProfile(**updated_user)


@router.put("/me/complete-onboarding", response_model=UserProfile)
async def complete_onboarding(
    current_user: UserProfile = Depends(get_current_user),
    db=Depends(get_database)
):
    """
    Mark a user's onboarding as completed
    """
    # Get current user from database
    user = await get_document("profiles", current_user.id)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Check if user has a user_type set
    if not user.get("user_type"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User type must be set before completing onboarding"
        )
    
    # Update document
    update_data = {"completed_onboarding": True}
    success = await update_document("profiles", current_user.id, update_data)
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to complete onboarding"
        )
    
    # Get the updated profile
    updated_user = await get_document("profiles", current_user.id)
    
    return UserProfile(**updated_user)


@router.get("/{user_id}", response_model=UserProfile)
async def get_user_profile(
    user_id: str,
    current_user: UserProfile = Depends(get_current_user),
    db=Depends(get_database)
):
    """
    Get a user's profile by ID
    """
    # Get user from database
    user = await get_document("profiles", user_id)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    return UserProfile(**user)


@router.get("/type/{user_type}", response_model=List[UserProfile])
async def get_users_by_type(
    user_type: UserType,
    current_user: UserProfile = Depends(get_current_user),
    db=Depends(get_database)
):
    """
    Get users by type (admin only)
    """
    # Only admin can access this endpoint
    if current_user.user_type != UserType.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins can access this endpoint"
        )
    
    # Get users by type
    users = await list_documents("profiles", filter_query={"user_type": user_type.value})
    
    return [UserProfile(**user) for user in users]
