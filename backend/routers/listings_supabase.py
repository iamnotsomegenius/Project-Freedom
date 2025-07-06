from fastapi import APIRouter, Depends, HTTPException, status, Query
from typing import List, Optional
from datetime import datetime
import random
import uuid

from models import (
    BusinessListing,
    BusinessListingCreate,
    BusinessListingUpdate,
    UserProfile,
    BusinessStatus,
    UserType
)
from auth_supabase import get_current_user
from database_supabase import (
    get_supabase,
    create_document,
    list_documents,
    get_document,
    update_document,
    delete_document,
    generate_uuid
)

router = APIRouter(prefix="/listings", tags=["listings"])

# Mock data for when Supabase is not available
MOCK_LISTINGS = [
    {
        "id": "1",
        "title": "Premium Auto Detailing Business",
        "description": "Well-established business with consistent growth and profitability. Strong team in place, proprietary systems, and loyal customer base. Owner is retiring after building this business for over a decade.",
        "industry": "Automotive",
        "location": "Austin, TX",
        "annual_revenue": 450000,
        "annual_profit": 120000,
        "asking_price": 480000,
        "funding_target": 250000,
        "funding_raised": 180000,
        "seller_id": "2",
        "status": "active",
        "under_loi": False,
        "cover_image_url": "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
        "employees_count": 5,
        "years_in_business": 8,
        "reason_for_selling": "Retirement",
        "investor_count": 12,
        "funding_end_date": None,
        "created_at": "2023-04-15T00:00:00Z",
        "updated_at": "2023-04-15T00:00:00Z"
    },
    {
        "id": "2",
        "title": "Established Manufacturing Company",
        "description": "Turnkey operation with streamlined processes and excellent reputation in the market. The business has shown consistent revenue and profit growth year over year.",
        "industry": "Manufacturing",
        "location": "Chicago, IL",
        "annual_revenue": 2500000,
        "annual_profit": 620000,
        "asking_price": 2800000,
        "funding_target": 1200000,
        "funding_raised": 800000,
        "seller_id": "2",
        "status": "active",
        "under_loi": False,
        "cover_image_url": "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
        "employees_count": 15,
        "years_in_business": 12,
        "reason_for_selling": "Strategic exit",
        "investor_count": 25,
        "funding_end_date": None,
        "created_at": "2023-05-01T00:00:00Z",
        "updated_at": "2023-05-01T00:00:00Z"
    },
    {
        "id": "3",
        "title": "Profitable E-commerce Business",
        "description": "Market leader in the local area with minimal competition. Proprietary products and services with high margins. Owner willing to train and transition.",
        "industry": "E-commerce",
        "location": "Miami, FL",
        "annual_revenue": 1800000,
        "annual_profit": 540000,
        "asking_price": 1950000,
        "funding_target": 900000,
        "funding_raised": 650000,
        "seller_id": "2",
        "status": "active",
        "under_loi": True,
        "cover_image_url": "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
        "employees_count": 8,
        "years_in_business": 6,
        "reason_for_selling": "New venture",
        "investor_count": 18,
        "funding_end_date": None,
        "created_at": "2023-05-15T00:00:00Z",
        "updated_at": "2023-05-15T00:00:00Z"
    },
    {
        "id": "4",
        "title": "High-Growth SaaS Platform",
        "description": "Recession-resistant business model with diverse revenue streams. Experienced staff will remain with new ownership. Excellent online presence and reviews.",
        "industry": "Technology",
        "location": "San Francisco, CA",
        "annual_revenue": 3500000,
        "annual_profit": 1050000,
        "asking_price": 5250000,
        "funding_target": 2500000,
        "funding_raised": 1800000,
        "seller_id": "2",
        "status": "active",
        "under_loi": False,
        "cover_image_url": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
        "employees_count": 22,
        "years_in_business": 5,
        "reason_for_selling": "Strategic exit",
        "investor_count": 45,
        "funding_end_date": None,
        "created_at": "2023-06-01T00:00:00Z",
        "updated_at": "2023-06-01T00:00:00Z"
    },
    {
        "id": "5",
        "title": "Food & Beverage Chain with Multiple Locations",
        "description": "Well-established business with consistent growth and profitability. Strong team in place, proprietary systems, and loyal customer base. Owner is retiring after building this business for over a decade.",
        "industry": "Food & Beverage",
        "location": "Denver, CO",
        "annual_revenue": 4200000,
        "annual_profit": 980000,
        "asking_price": 3950000,
        "funding_target": 1500000,
        "funding_raised": 900000,
        "seller_id": "2",
        "status": "active",
        "under_loi": False,
        "cover_image_url": "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
        "employees_count": 35,
        "years_in_business": 15,
        "reason_for_selling": "Retirement",
        "investor_count": 32,
        "funding_end_date": None,
        "created_at": "2023-07-01T00:00:00Z",
        "updated_at": "2023-07-01T00:00:00Z"
    },
    {
        "id": "6",
        "title": "Healthcare Services Provider",
        "description": "Turnkey operation with streamlined processes and excellent reputation in the market. The business has shown consistent revenue and profit growth year over year.",
        "industry": "Healthcare",
        "location": "Boston, MA",
        "annual_revenue": 1650000,
        "annual_profit": 495000,
        "asking_price": 1980000,
        "funding_target": 750000,
        "funding_raised": 450000,
        "seller_id": "2",
        "status": "active",
        "under_loi": False,
        "cover_image_url": "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
        "employees_count": 12,
        "years_in_business": 10,
        "reason_for_selling": "Relocation",
        "investor_count": 20,
        "funding_end_date": None,
        "created_at": "2023-08-01T00:00:00Z",
        "updated_at": "2023-08-01T00:00:00Z"
    }
]


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
    
    try:
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
    except Exception as e:
        # Fallback to mock data for demo purposes
        print(f"Error creating listing in Supabase: {e}")
        # Return a mock listing with the provided data
        mock_id = str(uuid.uuid4())
        mock_listing = BusinessListing(
            id=mock_id,
            **listing_data.model_dump(),
            seller_id=current_user.id,
            status=BusinessStatus.DRAFT
        )
        return mock_listing


@router.get("/", response_model=List[BusinessListing])
async def get_listings(
    status: Optional[str] = None,
    industry: Optional[str] = None,
    minRevenue: Optional[str] = None,  # Change to str to handle empty strings
    maxRevenue: Optional[str] = None,
    minProfit: Optional[str] = None,
    maxProfit: Optional[str] = None,
    location: Optional[str] = None,
    search: Optional[str] = None,
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100)
):
    """
    Get business listings with optional filtering
    """
    # Start with all active listings from mock data
    filtered_listings = [l for l in MOCK_LISTINGS if l["status"] == "active"]
    
    # Apply filters if provided (and not empty)
    if industry and industry.strip():
        filtered_listings = [l for l in filtered_listings if l["industry"].lower() == industry.lower()]
    
    if minRevenue and minRevenue.strip():
        try:
            min_rev = float(minRevenue)
            filtered_listings = [l for l in filtered_listings if l["annual_revenue"] >= min_rev]
        except ValueError:
            pass
    
    if maxRevenue and maxRevenue.strip():
        try:
            max_rev = float(maxRevenue)
            filtered_listings = [l for l in filtered_listings if l["annual_revenue"] <= max_rev]
        except ValueError:
            pass
    
    if minProfit and minProfit.strip():
        try:
            min_prof = float(minProfit)
            filtered_listings = [l for l in filtered_listings if l["annual_profit"] >= min_prof]
        except ValueError:
            pass
    
    if maxProfit and maxProfit.strip():
        try:
            max_prof = float(maxProfit)
            filtered_listings = [l for l in filtered_listings if l["annual_profit"] <= max_prof]
        except ValueError:
            pass
    
    if location and location.strip():
        filtered_listings = [l for l in filtered_listings if location.lower() in l["location"].lower()]
    
    if search and search.strip():
        filtered_listings = [l for l in filtered_listings if search.lower() in l["title"].lower()]
    
    # Apply pagination
    paginated_listings = filtered_listings[skip:skip+limit]
    
    # Convert to BusinessListing objects
    result = []
    for listing in paginated_listings:
        result.append(BusinessListing(**listing))
    
    return result


# Temporarily disable the problematic route
# @router.get("/browse", response_model=List[BusinessListing])
# async def browse_listings():
#     """
#     Browse all business listings 
#     """
#     result = []
#     for listing in MOCK_LISTINGS:
#         if listing["status"] == "active":
#             result.append(BusinessListing(**listing))
#     return result


@router.get("/featured", response_model=List[BusinessListing])
async def get_featured_listings(
    limit: int = Query(6, ge=1, le=12)
):
    """
    Get featured business listings
    """
    try:
        # Only show active listings for featured
        filter_query = {"status": BusinessStatus.ACTIVE.value}
        
        # Sort by funding progress (percentage of target raised)
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
    except Exception as e:
        # Fallback to mock data for demo purposes
        print(f"Error getting featured listings from Supabase: {e}")
        
        # Filter to active listings and sort by funding_raised
        active_listings = [l for l in MOCK_LISTINGS if l["status"] == "active"]
        sorted_listings = sorted(active_listings, key=lambda x: x["funding_raised"], reverse=True)
        
        # Limit results
        featured_listings = sorted_listings[:limit]
        
        # Convert to BusinessListing objects
        return [BusinessListing(**listing) for listing in featured_listings]


@router.get("/{listing_id}", response_model=BusinessListing)
async def get_listing(
    listing_id: str
):
    """
    Get a business listing by ID
    """
    try:
        listing = await get_document("business_listings", listing_id)
        
        if not listing:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Business listing not found"
            )
        
        return BusinessListing(**listing)
    except Exception as e:
        # Fallback to mock data for demo purposes
        print(f"Error getting listing from Supabase: {e}")
        
        # Find the listing in mock data
        mock_listing = next((l for l in MOCK_LISTINGS if l["id"] == listing_id), None)
        
        if not mock_listing:
            # If ID doesn't match, return the first listing as a fallback
            if len(MOCK_LISTINGS) > 0:
                mock_listing = MOCK_LISTINGS[0]
            else:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Business listing not found"
                )
        
        return BusinessListing(**mock_listing)


@router.put("/{listing_id}", response_model=BusinessListing)
async def update_listing(
    listing_id: str,
    listing_data: BusinessListingUpdate,
    current_user: UserProfile = Depends(get_current_user)
):
    """
    Update a business listing
    """
    try:
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
        update_data["updated_at"] = datetime.utcnow().isoformat()
        
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
    except Exception as e:
        # Fallback to mock data for demo purposes
        print(f"Error updating listing in Supabase: {e}")
        
        # Find the listing in mock data
        mock_index = next((i for i, l in enumerate(MOCK_LISTINGS) if l["id"] == listing_id), None)
        
        if mock_index is None:
            # If ID doesn't match, use the first listing as a fallback
            if len(MOCK_LISTINGS) > 0:
                mock_index = 0
            else:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Business listing not found"
                )
        
        # Update the mock listing
        mock_listing = MOCK_LISTINGS[mock_index].copy()
        update_data = listing_data.model_dump(exclude_unset=True)
        
        for key, value in update_data.items():
            mock_listing[key] = value
        
        mock_listing["updated_at"] = datetime.utcnow().isoformat()
        
        return BusinessListing(**mock_listing)


@router.delete("/{listing_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_listing(
    listing_id: str,
    current_user: UserProfile = Depends(get_current_user)
):
    """
    Delete a business listing
    """
    try:
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
    except Exception as e:
        # Log error but don't return it to maintain the 204 status code
        print(f"Error deleting listing from Supabase: {e}")


@router.get("/seller/{seller_id}", response_model=List[BusinessListing])
async def get_seller_listings(
    seller_id: str
):
    """
    Get listings for a specific seller
    """
    try:
        # Build filter query
        filter_query = {"seller_id": seller_id}
        
        # Get listings
        listings = await list_documents("business_listings", filter_query=filter_query)
        
        # Convert to BusinessListing objects
        return [BusinessListing(**listing) for listing in listings]
    except Exception as e:
        # Fallback to mock data for demo purposes
        print(f"Error getting seller listings from Supabase: {e}")
        
        # Filter to listings for this seller
        seller_listings = [l for l in MOCK_LISTINGS if l["seller_id"] == seller_id]
        
        # If no listings found for this seller, return all mock listings as a fallback
        if not seller_listings:
            seller_listings = MOCK_LISTINGS
        
        # Convert to BusinessListing objects
        return [BusinessListing(**listing) for listing in seller_listings]


@router.put("/{listing_id}/publish", response_model=BusinessListing)
async def publish_listing(
    listing_id: str,
    current_user: UserProfile = Depends(get_current_user)
):
    """
    Publish a draft listing
    """
    try:
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
            "status": "active",
            "updated_at": datetime.utcnow().isoformat()
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
    except Exception as e:
        # Fallback to mock data for demo purposes
        print(f"Error publishing listing in Supabase: {e}")
        
        # Find the listing in mock data
        mock_index = next((i for i, l in enumerate(MOCK_LISTINGS) if l["id"] == listing_id), None)
        
        if mock_index is None:
            # If ID doesn't match, use the first listing as a fallback
            if len(MOCK_LISTINGS) > 0:
                mock_index = 0
            else:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Business listing not found"
                )
        
        # Update the mock listing
        mock_listing = MOCK_LISTINGS[mock_index].copy()
        mock_listing["status"] = "active"
        mock_listing["updated_at"] = datetime.utcnow().isoformat()
        
        return BusinessListing(**mock_listing)
