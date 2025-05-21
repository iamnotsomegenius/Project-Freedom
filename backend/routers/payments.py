from fastapi import APIRouter, Depends, HTTPException, status, Request, Header
from typing import Dict, Any, Optional
from pydantic import BaseModel

from models import UserProfile
from auth_supabase import get_current_user
from payment import create_payment_intent, handle_webhook_event

router = APIRouter(prefix="/payments", tags=["payments"])


class PaymentIntentRequest(BaseModel):
    amount: int  # Amount in cents
    currency: str = "usd"
    metadata: Optional[Dict[str, Any]] = None


@router.post("/create-intent", response_model=Dict[str, Any])
async def create_intent(
    request: PaymentIntentRequest,
    current_user: UserProfile = Depends(get_current_user)
):
    """
    Create a payment intent for the current user
    """
    # Add user information to the metadata
    metadata = request.metadata or {}
    metadata.update({
        "user_id": current_user.id,
        "user_email": current_user.email
    })
    
    # Create the payment intent
    intent = await create_payment_intent(
        amount=request.amount,
        currency=request.currency,
        customer_email=current_user.email,
        metadata=metadata
    )
    
    # Return the client secret and other details
    return {
        "client_secret": intent.client_secret,
        "amount": intent.amount,
        "currency": intent.currency,
        "id": intent.id,
        "status": intent.status
    }


@router.post("/webhook", status_code=status.HTTP_200_OK)
async def webhook(
    request: Request,
    stripe_signature: str = Header(None)
):
    """
    Handle Stripe webhook events
    """
    if not stripe_signature:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Stripe signature header missing"
        )
    
    # Get the raw request body
    payload = await request.body()
    
    # Process the webhook event
    event = await handle_webhook_event(payload, stripe_signature)
    
    # Return a success response
    return {"status": "success", "event_id": event.id}
