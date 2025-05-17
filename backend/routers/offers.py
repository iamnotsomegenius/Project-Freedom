from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from datetime import datetime

from models import (
    Offer,
    OfferCreate,
    UserProfile,
    UserType,
    DealStatus,
    Deal,
    TimelineEvent,
    BusinessStatus,
    BusinessListing
)
from auth import get_current_user
from database import get_database, create_document, list_documents, get_document, update_document

router = APIRouter(prefix="/offers", tags=["offers"])


@router.post("/", response_model=Offer)
async def create_offer(
    offer_data: OfferCreate,
    current_user: UserProfile = Depends(get_current_user),
    db=Depends(get_database)
):
    """
    Create a new offer
    """
    # Only buyers can create offers
    if current_user.user_type != UserType.BUYER and current_user.user_type != UserType.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only buyers can make offers"
        )
    
    # Get the business listing
    listing = await get_document("business_listings", offer_data.business_id)
    
    if not listing:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Business listing not found"
        )
    
    # Check if business is already under LOI
    if listing.get("under_loi", False):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This business is already under a letter of intent"
        )
    
    # Create the offer
    offer = Offer(
        **offer_data.model_dump(),
        buyer_id=current_user.id,
        status=DealStatus.PENDING
    )
    
    # Insert document
    offer_dict = offer.model_dump(by_alias=True)
    offer_id = await create_document("offers", offer_dict)
    
    # Update the ID
    offer.id = offer_id
    
    return offer


@router.get("/", response_model=List[Offer])
async def get_user_offers(
    current_user: UserProfile = Depends(get_current_user),
    db=Depends(get_database)
):
    """
    Get offers for the current user (as buyer)
    """
    # Build filter query
    filter_query = {"buyer_id": current_user.id}
    
    # Get offers
    offers = await list_documents("offers", filter_query=filter_query)
    
    # For each offer, get the associated business listing
    for offer in offers:
        business = await get_document("business_listings", offer["business_id"])
        if business:
            offer["business"] = business
    
    # Convert to Offer objects
    return [Offer(**offer) for offer in offers]


@router.get("/seller", response_model=List[Offer])
async def get_seller_offers(
    current_user: UserProfile = Depends(get_current_user),
    db=Depends(get_database)
):
    """
    Get offers for businesses owned by the current user (as seller)
    """
    # First, get all business listings owned by the seller
    seller_listings = await list_documents("business_listings", filter_query={"seller_id": current_user.id})
    
    if not seller_listings:
        return []
    
    # Get business IDs
    business_ids = [listing["_id"] for listing in seller_listings]
    
    # Build filter query to find offers for these businesses
    filter_query = {"business_id": {"$in": business_ids}}
    
    # Get offers
    offers = await list_documents("offers", filter_query=filter_query)
    
    # For each offer, get the associated business listing
    for offer in offers:
        for listing in seller_listings:
            if listing["_id"] == offer["business_id"]:
                offer["business"] = listing
                break
    
    # Convert to Offer objects
    return [Offer(**offer) for offer in offers]


@router.get("/{offer_id}", response_model=Offer)
async def get_offer(
    offer_id: str,
    current_user: UserProfile = Depends(get_current_user),
    db=Depends(get_database)
):
    """
    Get a specific offer
    """
    # Get the offer
    offer = await get_document("offers", offer_id)
    
    if not offer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Offer not found"
        )
    
    # Get the business listing
    business = await get_document("business_listings", offer["business_id"])
    
    if not business:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Business listing not found"
        )
    
    # Check if user is the buyer, the seller of the business, or an admin
    if (offer["buyer_id"] != current_user.id and 
        business["seller_id"] != current_user.id and
        current_user.user_type != UserType.ADMIN):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to view this offer"
        )
    
    # Add the business to the offer
    offer["business"] = business
    
    return Offer(**offer)


@router.post("/{offer_id}/accept", response_model=Deal)
async def accept_offer(
    offer_id: str,
    current_user: UserProfile = Depends(get_current_user),
    db=Depends(get_database)
):
    """
    Accept an offer and create a deal
    """
    # Get the offer
    offer = await get_document("offers", offer_id)
    
    if not offer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Offer not found"
        )
    
    # Get the business listing
    business = await get_document("business_listings", offer["business_id"])
    
    if not business:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Business listing not found"
        )
    
    # Check if user is the seller of the business
    if business["seller_id"] != current_user.id and current_user.user_type != UserType.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only the seller can accept offers"
        )
    
    # Check if offer is pending
    if offer["status"] != DealStatus.PENDING.value:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This offer cannot be accepted"
        )
    
    # Update the offer status
    await update_document("offers", offer_id, {
        "status": DealStatus.ACCEPTED.value,
        "updated_at": datetime.utcnow()
    })
    
    # Update the business listing
    await update_document("business_listings", business["_id"], {
        "under_loi": True,
        "status": BusinessStatus.UNDER_LOI.value,
        "updated_at": datetime.utcnow()
    })
    
    # Create a deal
    deal = Deal(
        business_id=business["_id"],
        seller_id=business["seller_id"],
        buyer_id=offer["buyer_id"],
        offer_id=offer_id,
        status=DealStatus.IN_PROGRESS
    )
    
    # Insert document
    deal_dict = deal.model_dump(by_alias=True)
    deal_id = await create_document("deals", deal_dict)
    
    # Update the ID
    deal.id = deal_id
    
    # Create timeline event
    timeline_event = TimelineEvent(
        deal_id=deal_id,
        title="Offer Accepted",
        description=f"Offer of ${offer['offer_amount']:,.2f} was accepted by the seller",
        event_type="offer_accepted"
    )
    
    timeline_event_dict = timeline_event.model_dump(by_alias=True)
    await create_document("timeline_events", timeline_event_dict)
    
    # Get all timeline events
    timeline_events = await list_documents(
        "timeline_events", 
        filter_query={"deal_id": deal_id}
    )
    
    # Add the timeline events to the deal
    deal.timeline_events = [TimelineEvent(**event) for event in timeline_events]
    
    # Add the business to the deal
    deal.business = BusinessListing(**business)
    
    return deal


@router.post("/{offer_id}/reject", response_model=Offer)
async def reject_offer(
    offer_id: str,
    current_user: UserProfile = Depends(get_current_user),
    db=Depends(get_database)
):
    """
    Reject an offer
    """
    # Get the offer
    offer = await get_document("offers", offer_id)
    
    if not offer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Offer not found"
        )
    
    # Get the business listing
    business = await get_document("business_listings", offer["business_id"])
    
    if not business:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Business listing not found"
        )
    
    # Check if user is the seller of the business
    if business["seller_id"] != current_user.id and current_user.user_type != UserType.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only the seller can reject offers"
        )
    
    # Check if offer is pending
    if offer["status"] != DealStatus.PENDING.value:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This offer cannot be rejected"
        )
    
    # Update the offer status
    await update_document("offers", offer_id, {
        "status": DealStatus.REJECTED.value,
        "updated_at": datetime.utcnow()
    })
    
    # Get the updated offer
    updated_offer = await get_document("offers", offer_id)
    
    # Add the business to the offer
    updated_offer["business"] = business
    
    return Offer(**updated_offer)
