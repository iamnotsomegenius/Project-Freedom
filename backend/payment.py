import os
import stripe
from fastapi import HTTPException, status
from typing import Dict, Any, Optional

# Initialize Stripe with API key
stripe.api_key = os.environ.get("STRIPE_API_KEY", "")

async def create_payment_intent(
    amount: int,  # Amount in cents
    currency: str = "usd",
    payment_method_types: list = None,
    customer_email: Optional[str] = None,
    metadata: Dict[str, Any] = None
) -> Dict[str, Any]:
    """
    Create a payment intent with Stripe
    
    Args:
        amount: Amount in cents (integer)
        currency: 3-letter currency code
        payment_method_types: List of payment method types
        customer_email: Customer's email address
        metadata: Additional metadata for the payment
        
    Returns:
        Stripe PaymentIntent object
    """
    if not stripe.api_key:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Stripe API key not configured"
        )
    
    payment_method_types = payment_method_types or ["card"]
    metadata = metadata or {}
    
    try:
        # Create the payment intent
        intent = stripe.PaymentIntent.create(
            amount=amount,
            currency=currency,
            payment_method_types=payment_method_types,
            receipt_email=customer_email,
            metadata=metadata
        )
        
        return intent
    except stripe.error.StripeError as e:
        # Handle Stripe errors
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Stripe error: {str(e)}"
        )


async def create_customer(
    email: str,
    name: Optional[str] = None,
    metadata: Dict[str, str] = None
) -> Dict[str, Any]:
    """
    Create a new Stripe customer
    
    Args:
        email: Customer's email address
        name: Customer's name
        metadata: Additional metadata
        
    Returns:
        Stripe Customer object
    """
    if not stripe.api_key:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Stripe API key not configured"
        )
    
    metadata = metadata or {}
    
    try:
        customer = stripe.Customer.create(
            email=email,
            name=name,
            metadata=metadata
        )
        
        return customer
    except stripe.error.StripeError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Stripe error: {str(e)}"
        )


async def handle_webhook_event(payload: bytes, signature_header: str) -> Dict[str, Any]:
    """
    Handle a Stripe webhook event
    
    Args:
        payload: Raw request body
        signature_header: Stripe signature header
        
    Returns:
        Processed event
    """
    # This would need to be set in the environment variables
    webhook_secret = os.environ.get("STRIPE_WEBHOOK_SECRET", "")
    
    if not stripe.api_key:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Stripe API key not configured"
        )
    
    try:
        event = stripe.Webhook.construct_event(
            payload=payload,
            sig_header=signature_header,
            secret=webhook_secret
        )
        
        # Handle specific events
        event_type = event['type']
        
        # Process different event types
        if event_type == 'payment_intent.succeeded':
            payment_intent = event['data']['object']
            # Handle successful payment
            # Update your database, etc.
            pass
            
        elif event_type == 'payment_intent.payment_failed':
            payment_intent = event['data']['object']
            # Handle failed payment
            pass
            
        # Return the processed event
        return event
        
    except stripe.error.SignatureVerificationError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid signature"
        )
    except stripe.error.StripeError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Stripe error: {str(e)}"
        )
