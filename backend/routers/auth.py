from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from typing import Dict

from models import UserCreate, UserLogin, UserProfile, Token, UserType
from auth import (
    get_password_hash,
    verify_password,
    create_access_token,
    get_current_user,
)
from database import get_database, create_document

router = APIRouter(prefix="/auth", tags=["authentication"])


@router.post("/register", response_model=UserProfile)
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
    
    # Create user profile
    user_profile = UserProfile(
        email=user_data.email,
        user_type=user_data.user_type or UserType.BUYER,  # Default to BUYER if not specified
        display_name=user_data.email.split("@")[0],  # Default display name from email
        completed_onboarding=False
    )
    
    # Insert the user in the database
    user_dict = user_profile.model_dump()
    user_dict["hashed_password"] = hashed_password
    
    # Insert document and get ID
    user_id = await create_document("profiles", user_dict)
    
    # Update the profile with the ID
    user_profile.id = user_id
    
    return user_profile


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
async def check_email_exists(email: str, db=Depends(get_database)):
    """
    Check if an email address is already registered
    """
    user = await db.profiles.find_one({"email": email})
    return {"exists": user is not None}
