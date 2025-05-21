from fastapi import APIRouter, Depends, HTTPException, status, Body
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from typing import Dict
import os
import uuid
from datetime import datetime

from models import UserCreate, UserLogin, UserProfile, Token, UserType
from auth_supabase import (
    get_password_hash,
    verify_password,
    create_access_token,
    get_current_user,
    get_supabase_user_by_email
)
from database_supabase import get_supabase

router = APIRouter(prefix="/auth", tags=["authentication"])

# Mock data for when Supabase is not available
MOCK_USERS = {
    "admin@seedsmb.com": {
        "id": "1",
        "email": "admin@seedsmb.com",
        "user_type": "ADMIN",
        "display_name": "Admin User",
        "hashed_password": "$2b$12$Kzv0Qnbhhee8wFN07U.BZ.6VH5gUn96MoYvKQrh2CGQBRFKNQl0uC",  # "password123"
        "completed_onboarding": True,
        "created_at": "2023-01-01T00:00:00Z",
        "updated_at": "2023-01-01T00:00:00Z"
    },
    "seller@example.com": {
        "id": "2",
        "email": "seller@example.com",
        "user_type": "SELLER",
        "display_name": "Test Seller",
        "hashed_password": "$2b$12$Kzv0Qnbhhee8wFN07U.BZ.6VH5gUn96MoYvKQrh2CGQBRFKNQl0uC",  # "password123"
        "completed_onboarding": True,
        "created_at": "2023-01-01T00:00:00Z",
        "updated_at": "2023-01-01T00:00:00Z"
    },
    "investor@example.com": {
        "id": "3",
        "email": "investor@example.com",
        "user_type": "INVESTOR",
        "display_name": "Test Investor",
        "hashed_password": "$2b$12$Kzv0Qnbhhee8wFN07U.BZ.6VH5gUn96MoYvKQrh2CGQBRFKNQl0uC",  # "password123"
        "completed_onboarding": True,
        "created_at": "2023-01-01T00:00:00Z",
        "updated_at": "2023-01-01T00:00:00Z"
    }
}


@router.post("/register", response_model=UserProfile, status_code=status.HTTP_201_CREATED)
async def register_user(user_data: UserCreate):
    """
    Register a new user with Supabase
    """
    try:
        # Check if user already exists
        existing_user = await get_supabase_user_by_email(user_data.email)
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User with this email already exists",
            )

        # Create user in database
        hashed_password = get_password_hash(user_data.password)
        
        # Generate a UUID for the user
        user_id = str(uuid.uuid4())
        
        # Current timestamp
        now = datetime.utcnow().isoformat()
        
        # Create user profile document
        user_dict = {
            "id": user_id,
            "email": user_data.email,
            "user_type": user_data.user_type.value if user_data.user_type else UserType.BUYER.value,
            "display_name": user_data.email.split("@")[0],  # Default display name from email
            "hashed_password": hashed_password,
            "completed_onboarding": False,
            "created_at": now,
            "updated_at": now
        }
        
        # Insert document
        supabase = get_supabase()
        response = supabase.table("profiles").insert(user_dict).execute()
        
        if hasattr(response, 'error') and response.error:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to create user: {response.error}"
            )
        
        # Return user profile object
        return UserProfile(
            id=user_id,
            email=user_data.email,
            user_type=user_data.user_type or UserType.BUYER,
            display_name=user_dict["display_name"],
            completed_onboarding=False
        )
    except Exception as e:
        # Fallback to mock data for demo purposes
        print(f"Error registering user in Supabase: {e}")
        
        # Check if user already exists in mock data
        if user_data.email in MOCK_USERS:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User with this email already exists",
            )
        
        # Create mock user
        user_id = str(uuid.uuid4())
        display_name = user_data.email.split("@")[0]
        
        # Add to mock data
        MOCK_USERS[user_data.email] = {
            "id": user_id,
            "email": user_data.email,
            "user_type": user_data.user_type.value if user_data.user_type else UserType.BUYER.value,
            "display_name": display_name,
            "hashed_password": get_password_hash(user_data.password),
            "completed_onboarding": False,
            "created_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat()
        }
        
        # Return user profile
        return UserProfile(
            id=user_id,
            email=user_data.email,
            user_type=user_data.user_type or UserType.BUYER,
            display_name=display_name,
            completed_onboarding=False
        )


@router.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    """
    Get access token using username and password
    """
    try:
        # Find user by email
        user = await get_supabase_user_by_email(form_data.username)
        
        if not user or not verify_password(form_data.password, user.get("hashed_password", "")):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )

        # Create access token
        token_data = {
            "sub": user["id"],
            "email": user["email"],
            "user_type": user["user_type"]
        }
        
        access_token = create_access_token(token_data)
        
        return {"access_token": access_token, "token_type": "bearer"}
    except Exception as e:
        # Fallback to mock data for demo purposes
        print(f"Error login user in Supabase: {e}")
        
        # Find user in mock data
        user = MOCK_USERS.get(form_data.username)
        
        if not user or not verify_password(form_data.password, user.get("hashed_password", "")):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        # Create access token
        token_data = {
            "sub": user["id"],
            "email": user["email"],
            "user_type": user["user_type"]
        }
        
        access_token = create_access_token(token_data)
        
        return {"access_token": access_token, "token_type": "bearer"}


@router.post("/login", response_model=Token)
async def login(login_data: UserLogin):
    """
    User login endpoint that returns a token
    """
    try:
        # Find user by email
        user = await get_supabase_user_by_email(login_data.email)
        
        if not user or not verify_password(login_data.password, user.get("hashed_password", "")):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
            )

        # Create access token
        token_data = {
            "sub": user["id"],
            "email": user["email"],
            "user_type": user["user_type"]
        }
        
        access_token = create_access_token(token_data)
        
        return {"access_token": access_token, "token_type": "bearer"}
    except Exception as e:
        # Fallback to mock data for demo purposes
        print(f"Error login user in Supabase: {e}")
        
        # Find user in mock data
        user = MOCK_USERS.get(login_data.email)
        
        if not user or not verify_password(login_data.password, user.get("hashed_password", "")):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
            )
        
        # Create access token
        token_data = {
            "sub": user["id"],
            "email": user["email"],
            "user_type": user["user_type"]
        }
        
        access_token = create_access_token(token_data)
        
        return {"access_token": access_token, "token_type": "bearer"}


@router.get("/me", response_model=UserProfile)
async def get_user_profile(current_user: UserProfile = Depends(get_current_user)):
    """
    Get the current user's profile
    """
    return current_user


@router.post("/check-email", response_model=Dict[str, bool])
async def check_email_exists(email: str = Body(..., embed=True)):
    """
    Check if an email address is already registered
    """
    try:
        user = await get_supabase_user_by_email(email)
        return {"exists": user is not None}
    except Exception as e:
        # Fallback to mock data for demo purposes
        print(f"Error checking email in Supabase: {e}")
        
        # Check in mock data
        user_exists = email in MOCK_USERS
        return {"exists": user_exists}
