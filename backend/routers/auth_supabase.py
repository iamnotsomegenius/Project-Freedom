from fastapi import APIRouter, Depends, HTTPException, status, Body
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from typing import Dict, Optional
import os
import uuid
from datetime import datetime
import random

from models import UserCreate, UserLogin, UserProfile, Token, UserType, PhoneVerifyRequest, PhoneSendCodeRequest, SocialLoginRequest
from auth_supabase import (
    get_password_hash,
    verify_password,
    create_access_token,
    get_current_user,
    get_supabase_user_by_email,
    get_supabase_user_by_phone
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
        "updated_at": "2023-01-01T00:00:00Z",
        "verification_level": 4
    },
    "seller@example.com": {
        "id": "2",
        "email": "seller@example.com",
        "user_type": "SELLER",
        "display_name": "Test Seller",
        "hashed_password": "$2b$12$Kzv0Qnbhhee8wFN07U.BZ.6VH5gUn96MoYvKQrh2CGQBRFKNQl0uC",  # "password123"
        "completed_onboarding": True,
        "created_at": "2023-01-01T00:00:00Z",
        "updated_at": "2023-01-01T00:00:00Z",
        "verification_level": 3
    },
    "investor@example.com": {
        "id": "3",
        "email": "investor@example.com",
        "user_type": "INVESTOR",
        "display_name": "Test Investor",
        "hashed_password": "$2b$12$Kzv0Qnbhhee8wFN07U.BZ.6VH5gUn96MoYvKQrh2CGQBRFKNQl0uC",  # "password123"
        "completed_onboarding": True,
        "created_at": "2023-01-01T00:00:00Z",
        "updated_at": "2023-01-01T00:00:00Z",
        "verification_level": 4
    }
}

# Mock phone verification codes (in a real app, these would be stored securely and expire)
MOCK_PHONE_CODES = {}


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
            "updated_at": now,
            "verification_level": 1  # Email verified at registration
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
            completed_onboarding=False,
            verification_level=1
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
            "updated_at": datetime.utcnow().isoformat(),
            "verification_level": 1  # Email verified at registration
        }
        
        # Return user profile
        return UserProfile(
            id=user_id,
            email=user_data.email,
            user_type=user_data.user_type or UserType.BUYER,
            display_name=display_name,
            completed_onboarding=False,
            verification_level=1
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


@router.post("/social-login/{provider}", response_model=Token)
async def social_login(provider: str, data: Optional[SocialLoginRequest] = None):
    """
    Handle social login from various providers
    """
    # In a real implementation, this would validate the token/code from the provider
    # and fetch user information from the provider's API
    
    # For demo purposes, we'll create a mock user for the social login
    try:
        user_id = str(uuid.uuid4())
        now = datetime.utcnow().isoformat()
        
        # Generate mock email and user data
        email = f"social_user_{user_id[:8]}@example.com"
        display_name = f"Social User {user_id[:8]}"
        
        # Create mock user if it doesn't already exist
        if email not in MOCK_USERS:
            MOCK_USERS[email] = {
                "id": user_id,
                "email": email,
                "user_type": UserType.BUYER.value,
                "display_name": display_name,
                "created_at": now,
                "updated_at": now,
                "completed_onboarding": False,
                "social_provider": provider,
                "verification_level": 1  # Email verified through social login
            }
        
        # Get existing user
        user = MOCK_USERS[email]
        
        # Create access token
        token_data = {
            "sub": user["id"],
            "email": user["email"],
            "user_type": user["user_type"]
        }
        
        access_token = create_access_token(token_data)
        
        return {"access_token": access_token, "token_type": "bearer"}
    except Exception as e:
        print(f"Error in social login: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to authenticate with {provider}"
        )


@router.post("/phone/send-code")
async def send_phone_verification_code(data: PhoneSendCodeRequest):
    """
    Send a verification code to a phone number
    """
    try:
        # In a real implementation, this would send an SMS via Twilio, etc.
        # For demo purposes, we'll generate a 6-digit code and store it
        
        phone_number = data.phone_number
        
        # Generate 6-digit code
        verification_code = str(random.randint(100000, 999999))
        
        # Store the code with timestamp (would be in secure storage in real app)
        # In a real implementation, this would have an expiration timestamp
        MOCK_PHONE_CODES[phone_number] = verification_code
        
        print(f"Phone verification code for {phone_number}: {verification_code}")
        
        # In real app, send SMS here
        
        return {"success": True, "message": "Verification code sent"}
    except Exception as e:
        print(f"Error sending phone verification code: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to send verification code"
        )


@router.post("/phone/verify-code", response_model=Token)
async def verify_phone_code(data: PhoneVerifyRequest):
    """
    Verify a phone number with the provided code and create a user account
    """
    try:
        phone_number = data.phone_number
        code = data.code
        
        # Check if the code is valid
        stored_code = MOCK_PHONE_CODES.get(phone_number)
        
        if not stored_code or stored_code != code:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, 
                detail="Invalid verification code"
            )
        
        # Check if the phone number is already registered
        existing_user = await get_supabase_user_by_phone(phone_number)
        
        if not existing_user:
            # Create a new user with the phone number
            user_id = str(uuid.uuid4())
            now = datetime.utcnow().isoformat()
            display_name = f"User {user_id[:8]}"
            
            # In real app, store in database
            # For demo purposes, store in mock data
            mock_email = f"phone_user_{user_id[:8]}@example.com"
            
            MOCK_USERS[mock_email] = {
                "id": user_id,
                "email": mock_email,  # Generate a placeholder email
                "phone_number": phone_number,
                "user_type": UserType.BUYER.value,
                "display_name": display_name,
                "created_at": now,
                "updated_at": now,
                "completed_onboarding": False,
                "verification_level": 1  # Phone verified at registration
            }
            
            user = MOCK_USERS[mock_email]
        else:
            # Use existing user
            user = existing_user
        
        # Create access token
        token_data = {
            "sub": user["id"],
            "email": user.get("email", ""),
            "phone": phone_number,
            "user_type": user["user_type"]
        }
        
        access_token = create_access_token(token_data)
        
        # Remove the code to prevent reuse
        MOCK_PHONE_CODES.pop(phone_number, None)
        
        return {"access_token": access_token, "token_type": "bearer"}
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error verifying phone code: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to verify phone number"
        )


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
