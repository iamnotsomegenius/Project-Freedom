from fastapi import APIRouter, Depends, HTTPException, status, Body
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from typing import Dict
from bson import ObjectId

from models import UserCreate, UserLogin, UserProfile, Token, UserType
from auth import (
    get_password_hash,
    verify_password,
    create_access_token,
    get_current_user,
)
from database import get_database

router = APIRouter(prefix="/auth", tags=["authentication"])


@router.post("/register", response_model=UserProfile, status_code=status.HTTP_201_CREATED)
async def register_user(user_data: UserCreate, db=Depends(get_database)):
    """
    Register a new user
    """
    # Check if user already exists
    existing_user = await db.profiles.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists",
        )

    # Create user in database
    hashed_password = get_password_hash(user_data.password)
    
    # Create user profile document
    user_dict = {
        "email": user_data.email,
        "user_type": user_data.user_type.value if user_data.user_type else UserType.BUYER.value,
        "display_name": user_data.email.split("@")[0],  # Default display name from email
        "hashed_password": hashed_password,
        "completed_onboarding": False,
        "created_at": user_data.model_dump().get("created_at"),
        "updated_at": user_data.model_dump().get("updated_at")
    }
    
    # Insert document
    result = await db.profiles.insert_one(user_dict)
    user_id = str(result.inserted_id)
    
    # Return user profile object
    return UserProfile(
        id=user_id,
        email=user_data.email,
        user_type=user_data.user_type or UserType.BUYER,
        display_name=user_dict["display_name"],
        completed_onboarding=False
    )


@router.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db=Depends(get_database)):
    """
    Get access token using username and password
    """
    # Find user by email
    user = await db.profiles.find_one({"email": form_data.username})
    
    if not user or not verify_password(form_data.password, user.get("hashed_password", "")):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Create access token
    token_data = {
        "sub": str(user["_id"]),
        "email": user["email"],
        "user_type": user["user_type"]
    }
    
    access_token = create_access_token(token_data)
    
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/login", response_model=Token)
async def login(login_data: UserLogin, db=Depends(get_database)):
    """
    User login endpoint that returns a token
    """
    # Find user by email
    user = await db.profiles.find_one({"email": login_data.email})
    
    if not user or not verify_password(login_data.password, user.get("hashed_password", "")):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )

    # Create access token
    token_data = {
        "sub": str(user["_id"]),
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
async def check_email_exists(email: str = Body(..., embed=True), db=Depends(get_database)):
    """
    Check if an email address is already registered
    """
    user = await db.profiles.find_one({"email": email})
    return {"exists": user is not None}
