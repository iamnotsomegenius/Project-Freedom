from datetime import datetime, timedelta
from typing import Optional

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel
import os

from models import UserProfile, Token, UserType

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


async def get_current_user(token: str = Depends(oauth2_scheme), db=None):
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
        
    # In a real implementation, you would look up the user from the database here
    # For now, we'll just construct a UserProfile from the token data
    user = UserProfile(
        id=token_data.user_id,
        email=token_data.email,
        user_type=token_data.user_type,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    
    if user is None:
        raise credentials_exception
        
    return user
