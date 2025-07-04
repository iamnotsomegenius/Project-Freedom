from datetime import datetime, timedelta
from typing import Optional, Dict, Any
import os
import uuid
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel
import json

from models import UserProfile, Token, TokenData, UserType
from database_supabase import get_supabase

# Setup password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Setup OAuth2 with Bearer token
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/token")

# JWT settings (using the same settings as before for compatibility)
SECRET_KEY = os.environ.get("SECRET_KEY", "temporary_secret_key_change_in_production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 1 week


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    
    expire = datetime.utcnow() + (
        expires_delta if expires_delta else timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    
    return encoded_jwt


async def get_supabase_user(user_id: str) -> Optional[Dict[str, Any]]:
    """
    Get user from Supabase by ID
    """
    try:
        supabase = get_supabase()
        response = supabase.table("profiles").select("*").eq("id", user_id).execute()
        
        if response.data and len(response.data) > 0:
            return response.data[0]
    except Exception as e:
        print(f"Error getting user from Supabase: {e}")
        
        # Fallback to mock data for demo purposes
        # Import here to avoid circular imports
        from routers.auth_supabase import MOCK_USERS
        
        # Find user in mock data by ID
        for email, user in MOCK_USERS.items():
            if user["id"] == user_id:
                return user
    
    return None


async def get_supabase_user_by_email(email: str) -> Optional[Dict[str, Any]]:
    """
    Get user from Supabase by email
    """
    try:
        supabase = get_supabase()
        response = supabase.table("profiles").select("*").eq("email", email).execute()
        
        if response.data and len(response.data) > 0:
            return response.data[0]
    except Exception as e:
        print(f"Error getting user by email from Supabase: {e}")
        
        # Fallback to mock data for demo purposes
        # Import here to avoid circular imports
        from routers.auth_supabase import MOCK_USERS
        
        # Find user in mock data by email
        if email in MOCK_USERS:
            return MOCK_USERS[email]
    
    return None


async def get_current_user(token: str = Depends(oauth2_scheme)):
    """
    Get the current user from the JWT token
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        email: str = payload.get("email")
        user_type: str = payload.get("user_type")
        
        if user_id is None or email is None:
            raise credentials_exception
            
        token_data = TokenData(
            user_id=user_id,
            email=email,
            user_type=UserType(user_type)
        )
    except JWTError as e:
        print(f"JWT Error: {e}")
        raise credentials_exception
    
    # Look up the user from Supabase
    try:
        user_data = await get_supabase_user(token_data.user_id)
        if user_data:
            user = UserProfile(
                id=user_data["id"],
                email=user_data["email"],
                user_type=UserType(user_data["user_type"]),
                display_name=user_data.get("display_name"),
                avatar_url=user_data.get("avatar_url"),
                completed_onboarding=user_data.get("completed_onboarding", False),
                created_at=user_data.get("created_at", datetime.utcnow()),
                updated_at=user_data.get("updated_at", datetime.utcnow())
            )
            return user
    except Exception as e:
        print(f"Error fetching user from Supabase: {e}")
        
        # If we can't get the user from Supabase, use a mock user for testing
        # Import here to avoid circular imports
        from routers.auth_supabase import MOCK_USERS
        
        # Try to find the user in mock data by ID or email
        mock_user = None
        for email, user in MOCK_USERS.items():
            if user["id"] == token_data.user_id or user["email"] == token_data.email:
                mock_user = user
                break
        
        if mock_user:
            return UserProfile(
                id=mock_user["id"],
                email=mock_user["email"],
                user_type=UserType(mock_user["user_type"]),
                display_name=mock_user.get("display_name"),
                avatar_url=mock_user.get("avatar_url"),
                completed_onboarding=mock_user.get("completed_onboarding", False),
                created_at=mock_user.get("created_at", datetime.utcnow()),
                updated_at=mock_user.get("updated_at", datetime.utcnow())
            )
    
    # If Supabase lookup failed and no mock user found, construct user from token
    user = UserProfile(
        id=token_data.user_id,
        email=token_data.email,
        user_type=token_data.user_type,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    
    return user
