from datetime import datetime, timedelta
from typing import Optional, Callable

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel
import os
from bson import ObjectId

from models import UserProfile, Token, UserType
from database import get_database

# Setup password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Setup OAuth2 with Bearer token
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/token")

# JWT settings
SECRET_KEY = os.environ.get("SECRET_KEY", "temporary_secret_key_change_in_production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 1 week


class TokenData(BaseModel):
    user_id: str
    email: str
    user_type: UserType


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


async def get_current_user(token: str = Depends(oauth2_scheme), db=Depends(get_database)):
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
    except JWTError:
        raise credentials_exception
    
    # Look up the user from the database if db is provided
    if db:
        try:
            user_doc = await db.profiles.find_one({"_id": ObjectId(token_data.user_id)})
            if user_doc:
                user = UserProfile(
                    id=str(user_doc["_id"]),
                    email=user_doc["email"],
                    user_type=UserType(user_doc["user_type"]),
                    display_name=user_doc.get("display_name"),
                    avatar_url=user_doc.get("avatar_url"),
                    completed_onboarding=user_doc.get("completed_onboarding", False),
                    created_at=user_doc.get("created_at", datetime.utcnow()),
                    updated_at=user_doc.get("updated_at", datetime.utcnow())
                )
                return user
        except Exception as e:
            print(f"Error fetching user from database: {e}")
    
    # If db lookup failed or wasn't attempted, construct user from token
    user = UserProfile(
        id=token_data.user_id,
        email=token_data.email,
        user_type=token_data.user_type,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    
    return user
