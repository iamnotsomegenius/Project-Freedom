from fastapi import APIRouter, Depends, HTTPException, status, Query
from typing import List, Optional
from datetime import datetime

from models import (
    BusinessListing,
    BusinessListingCreate,
    BusinessListingUpdate,
    UserProfile,
    BusinessStatus,
    UserType
)
from auth_supabase import get_current_user
from database_supabase import get_supabase, create_document, list_documents, get_document, update_document, delete_document

router = APIRouter(prefix="/listings", tags=["listings"])


@router.post("/", response_model=BusinessListing)
async def create_listing(
    listing_data: BusinessListingCreate,
    current_user: UserProfile = Depends(get_current_user)
):
    """
    Create a new business listing
    """
    # Only sellers can create listings
    if current_user.user_type != UserType.SELLER and current_user.user_type != UserType.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only sellers can create business listings"
        )
    
    # Create the listing
    listing = BusinessListing(
        **listing_data.model_dump(),
        seller_id=current_user.id,
        status=BusinessStatus.DRAFT
    )
    
    # Insert document
    listing_dict = listing.model_dump(by_alias=True)
    listing_id = await create_document("business_listings", listing_dict)
    
    # Update the ID
    listing.id = listing_id
    
    return listing


@router.get("/", response_model=List[BusinessListing])
async def get_listings(
    status: Optional[BusinessStatus] = None,
    industry: Optional[str] = None,
    min_revenue: Optional[float] = None,
    max_revenue: Optional[float] = None,
    min_profit: Optional[float] = None,
    max_profit: Optional[float] = None,
    location: Optional[str] = None,
    search: Optional[str] = None,
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100)
):
    """
    Get business listings with optional filtering
    """
    # Build filter query
    filter_query = {}
    
    # Filter by status (if not provided, only show active listings)
    filter_query["status"] = status.value if status else BusinessStatus.ACTIVE.value
    
    # Add industry filter if provided
    if industry:
        filter_query["industry"] = {"$regex": industry, "$options": "i"}
    
    # Add revenue range filter if provided
    if min_revenue is not None or max_revenue is not None:
        filter_query["annual_revenue"] = {}
        if min_revenue is not None:
            filter_query["annual_revenue"]["$gte"] = min_revenue
        if max_revenue is not None:
            filter_query["annual_revenue"]["$lte"] = max_revenue
    
    # Add profit range filter if provided
    if min_profit is not None or max_profit is not None:
        filter_query["annual_profit"] = {}
        if min_profit is not None:
            filter_query["annual_profit"]["$gte"] = min_profit
        if max_profit is not None:
            filter_query["annual_profit"]["$lte"] = max_profit
    
    # Add location filter if provided
    if location:
        filter_query["location"] = {"$regex": location, "$options": "i"}
    
    # Add text search if provided
    if search:
        filter_query["$or"] = [
            {"title": {"$regex": search, "$options": "i"}},
            {"description": {"$regex": search, "$options": "i"}},
            {"industry": {"$regex": search, "$options": "i"}},
        ]
    
    # Sort by most recently created
    sort_by = {"created_at": -1}
    
    # Get listings
    listings = await list_documents(
        "business_listings", 
        filter_query=filter_query, 
        skip=skip, 
        limit=limit,
        sort_by=sort_by
    )
    
    # Convert to BusinessListing objects
    return [BusinessListing(**listing) for listing in listings]


@router.get("/featured", response_model=List[BusinessListing])
async def get_featured_listings(
    limit: int = Query(6, ge=1, le=12)
):
    """
    Get featured business listings
    """
    # Only show active listings for featured
    filter_query = {"status": BusinessStatus.ACTIVE.value}
    
    # Sort by funding progress (percentage of target raised)
    # In a real implementation, you might want to use aggregation to sort by funding_raised/funding_target
    # For now, just sort by funding_raised
    sort_by = {"funding_raised": -1}
    
    # Get listings
    listings = await list_documents(
        "business_listings", 
        filter_query=filter_query, 
        limit=limit,
        sort_by=sort_by
    )
    
    # Convert to BusinessListing objects
    return [BusinessListing(**listing) for listing in listings]


@router.get("/{listing_id}", response_model=BusinessListing)
async def get_listing(
    listing_id: str
):
    """
    Get a business listing by ID
    """
    listing = await get_document("business_listings", listing_id)
    
    if not listing:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Business listing not found"
        )
    
    return BusinessListing(**listing)


@router.put("/{listing_id}", response_model=BusinessListing)
async def update_listing(
    listing_id: str,
    listing_data: BusinessListingUpdate,
    current_user: UserProfile = Depends(get_current_user)
):
    """
    Update a business listing
    """
    # Get existing listing
    listing = await get_document("business_listings", listing_id)
    
    if not listing:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Business listing not found"
        )
    
    # Check if user is the seller
    if listing["seller_id"] != current_user.id and current_user.user_type != UserType.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only the seller can update this listing"
        )
    
    # Update the listing
    update_data = listing_data.model_dump(exclude_unset=True)
    
    # Add updated_at timestamp
    update_data["updated_at"] = datetime.utcnow()
    
    # Update the document
    success = await update_document("business_listings", listing_id, update_data)
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update listing"
        )
    
    # Get the updated listing
    updated_listing = await get_document("business_listings", listing_id)
    
    return BusinessListing(**updated_listing)


@router.delete("/{listing_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_listing(
    listing_id: str,
    current_user: UserProfile = Depends(get_current_user)
):
    """
    Delete a business listing
    """
    # Get existing listing
    listing = await get_document("business_listings", listing_id)
    
    if not listing:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Business listing not found"
        )
    
    # Check if user is the seller
    if listing["seller_id"] != current_user.id and current_user.user_type != UserType.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only the seller can delete this listing"
        )
    
    # Delete the document
    success = await delete_document("business_listings", listing_id)
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete listing"
        )


@router.get("/seller/{seller_id}", response_model=List[BusinessListing])
async def get_seller_listings(
    seller_id: str
):
    """
    Get listings for a specific seller
    """
    # Build filter query
    filter_query = {"seller_id": seller_id}
    
    # Get listings
    listings = await list_documents("business_listings", filter_query=filter_query)
    
    # Convert to BusinessListing objects
    return [BusinessListing(**listing) for listing in listings]


@router.put("/{listing_id}/publish", response_model=BusinessListing)
async def publish_listing(
    listing_id: str,
    current_user: UserProfile = Depends(get_current_user)
):
    """
    Publish a draft listing
    """
    # Get existing listing
    listing = await get_document("business_listings", listing_id)
    
    if not listing:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Business listing not found"
        )
    
    # Check if user is the seller
    if listing["seller_id"] != current_user.id and current_user.user_type != UserType.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only the seller can publish this listing"
        )
    
    # Check if listing is in draft status
    if listing["status"] != BusinessStatus.DRAFT.value:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Listing is already published"
        )
    
    # Update the listing
    update_data = {
        "status": BusinessStatus.ACTIVE.value,
        "updated_at": datetime.utcnow()
    }
    
    # Update the document
    success = await update_document("business_listings", listing_id, update_data)
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to publish listing"
        )
    
    # Get the updated listing
    updated_listing = await get_document("business_listings", listing_id)
    
    return BusinessListing(**updated_listing)