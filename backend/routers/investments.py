from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from datetime import datetime

from models import (
    Investment,
    InvestmentCreate,
    UserProfile,
    UserType,
    BusinessListing,
    BusinessStatus
)
from auth_supabase import get_current_user
from database_supabase import get_supabase, create_document, list_documents, get_document, update_document

router = APIRouter(prefix="/investments", tags=["investments"])


@router.post("/", response_model=Investment)
async def create_investment(
    investment_data: InvestmentCreate,
    current_user: UserProfile = Depends(get_current_user)
):
    """
    Create a new investment
    """
    # Only investors can create investments
    if current_user.user_type != UserType.INVESTOR and current_user.user_type != UserType.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only investors can make investments"
        )
    
    # Get the business listing
    listing = await get_document("business_listings", investment_data.business_id)
    
    if not listing:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Business listing not found"
        )
    
    # Check if listing is active
    if listing["status"] != BusinessStatus.ACTIVE.value:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot invest in a non-active business"
        )
    
    # Check if funding target is set
    if not listing.get("funding_target"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This business is not open for investments"
        )
    
    # Create the investment
    investment = Investment(
        business_id=investment_data.business_id,
        investor_id=current_user.id,
        amount=investment_data.amount
    )
    
    # Insert document
    investment_dict = investment.model_dump(by_alias=True)
    investment_id = await create_document("investments", investment_dict)
    
    # Update the ID
    investment.id = investment_id
    
    # Update the business listing with new funding_raised amount
    new_funding_raised = listing.get("funding_raised", 0) + investment_data.amount
    new_investor_count = listing.get("investor_count", 0) + 1
    
    update_data = {
        "funding_raised": new_funding_raised,
        "investor_count": new_investor_count,
        "updated_at": datetime.utcnow().isoformat()
    }
    
    await update_document("business_listings", investment_data.business_id, update_data)
    
    return investment


@router.get("/", response_model=List[Investment])
async def get_user_investments(
    current_user: UserProfile = Depends(get_current_user)
):
    """
    Get investments for the current user
    """
    try:
        # Build filter query
        filter_query = {"investor_id": current_user.id}
        
        # Get investments
        investments = await list_documents("investments", filter_query=filter_query)
        
        # For each investment, get the associated business listing
        for investment in investments:
            business = await get_document("business_listings", investment["business_id"])
            if business:
                investment["business"] = business
        
        # Convert to Investment objects
        return [Investment(**investment) for investment in investments]
    except Exception as e:
        print(f"Error in get_user_investments: {e}")
        
        # Fallback to mock data
        from mock_data_fallback import list_mock_documents
        
        # Get mock investments
        investments = list_mock_documents("investments", filter_query={"investor_id": current_user.id})
        
        # For each investment, get the associated business listing
        for investment in investments:
            business = list_mock_documents("business_listings", filter_query={"id": investment["business_id"]})
            if business and len(business) > 0:
                investment["business"] = business[0]
        
        # Convert to Investment objects
        return [Investment(**investment) for investment in investments]


@router.get("/business/{business_id}", response_model=List[Investment])
async def get_business_investments(
    business_id: str,
    current_user: UserProfile = Depends(get_current_user)
):
    """
    Get investments for a specific business
    """
    # Get the business listing
    listing = await get_document("business_listings", business_id)
    
    if not listing:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Business listing not found"
        )
    
    # Check if user is the seller or an admin
    if listing["seller_id"] != current_user.id and current_user.user_type != UserType.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only the seller can view investments for this business"
        )
    
    # Build filter query
    filter_query = {"business_id": business_id}
    
    # Get investments
    investments = await list_documents("investments", filter_query=filter_query)
    
    # Convert to Investment objects
    return [Investment(**investment) for investment in investments]


@router.get("/{investment_id}", response_model=Investment)
async def get_investment(
    investment_id: str,
    current_user: UserProfile = Depends(get_current_user)
):
    """
    Get a specific investment
    """
    # Get the investment
    investment = await get_document("investments", investment_id)
    
    if not investment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Investment not found"
        )
    
    # Check if user is the investor, the seller of the business, or an admin
    business = await get_document("business_listings", investment["business_id"])
    
    if (investment["investor_id"] != current_user.id and 
        (not business or business["seller_id"] != current_user.id) and
        current_user.user_type != UserType.ADMIN):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to view this investment"
        )
    
    # Add the business to the investment
    if business:
        investment["business"] = business
    
    return Investment(**investment)