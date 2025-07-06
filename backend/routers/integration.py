from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Optional, Dict, Any
from datetime import datetime
from pydantic import BaseModel

from models import (
    BusinessListing,
    BusinessListingCreate,
    UserProfile,
    UserType,
    BusinessStatus
)
from auth_supabase import get_current_user
from database_supabase import create_document, get_document, update_document

router = APIRouter(prefix="/integration", tags=["integration"])


class SeedStackDeal(BaseModel):
    """Model for SeedStack deal data"""
    id: str
    company_name: str
    industry: str
    location: str
    annual_revenue: float
    annual_profit: float
    asking_price: float
    employees_count: Optional[int] = None
    years_in_business: Optional[int] = None
    reason_for_selling: Optional[str] = None
    description: Optional[str] = None
    funding_needed: Optional[float] = None
    stage: str
    
    # SeedStack specific fields
    contact_person: Optional[str] = None
    contact_email: Optional[str] = None
    loi_amount: Optional[float] = None
    nda_signed: Optional[bool] = False
    broker_name: Optional[str] = None


class MarketplaceListingRequest(BaseModel):
    """Request model for creating marketplace listing from SeedStack deal"""
    deal_id: str
    funding_target: float
    auto_generate_description: bool = True
    include_financials: bool = True


class AIAnalysisRequest(BaseModel):
    """Request model for AI analysis of a deal"""
    deal_id: str
    analysis_type: str = "funding_decision"  # funding_decision, market_analysis, risk_assessment


class AIAnalysisResponse(BaseModel):
    """Response model for AI analysis"""
    deal_id: str
    analysis_type: str
    recommendation: str  # "self_fund", "seek_investors", "pass"
    confidence_score: float
    key_insights: List[str]
    financial_summary: Dict[str, Any]
    risk_factors: List[str]
    funding_recommendation: Optional[Dict[str, Any]] = None


@router.post("/analyze-deal", response_model=AIAnalysisResponse)
async def analyze_deal_with_ai(
    request: AIAnalysisRequest,
    current_user: UserProfile = Depends(get_current_user)
):
    """
    Analyze a SeedStack deal with AI to determine funding strategy
    """
    # For demo purposes, we'll simulate AI analysis
    # In production, this would integrate with actual AI models
    
    mock_analysis = {
        "deal_id": request.deal_id,
        "analysis_type": request.analysis_type,
        "recommendation": "seek_investors",  # Could be "self_fund", "seek_investors", "pass"
        "confidence_score": 0.85,
        "key_insights": [
            "Strong revenue growth trajectory (+35% YoY)",
            "Market-leading position in niche industry",
            "Experienced management team staying on",
            "Opportunity for operational improvements"
        ],
        "financial_summary": {
            "revenue_multiple": 2.1,
            "ebitda_multiple": 4.2,
            "projected_roi": 0.28,
            "payback_period": "3.2 years"
        },
        "risk_factors": [
            "Customer concentration (top 3 = 45% revenue)",
            "Regulatory changes in industry",
            "Key person dependency"
        ],
        "funding_recommendation": {
            "recommended_amount": 850000,
            "suggested_structure": "70% debt, 30% equity",
            "investor_profile": "Strategic industry investors preferred"
        }
    }
    
    return AIAnalysisResponse(**mock_analysis)


@router.post("/push-to-marketplace", response_model=BusinessListing)
async def push_deal_to_marketplace(
    request: MarketplaceListingRequest,
    current_user: UserProfile = Depends(get_current_user)
):
    """
    Push a SeedStack deal to the SeedSMB marketplace with one click
    """
    # Only sellers can create marketplace listings
    if current_user.user_type not in [UserType.SELLER, UserType.ADMIN]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only sellers can create marketplace listings"
        )
    
    # In a real implementation, we'd fetch the deal from SeedStack
    # For demo, we'll create a sample deal
    mock_deal = {
        "id": request.deal_id,
        "company_name": "Tech Solutions Inc",
        "industry": "Technology",
        "location": "Austin, TX",
        "annual_revenue": 1200000,
        "annual_profit": 350000,
        "asking_price": 3500000,
        "employees_count": 12,
        "years_in_business": 5,
        "reason_for_selling": "Strategic exit",
        "description": "B2B SaaS platform with recurring revenue and strong growth potential."
    }
    
    # Auto-generate description if requested
    if request.auto_generate_description:
        description = f"""
        {mock_deal['company_name']} is a {mock_deal['industry'].lower()} business located in {mock_deal['location']} 
        with {mock_deal['years_in_business']} years of operation. The company generates ${mock_deal['annual_revenue']:,} 
        in annual revenue with ${mock_deal['annual_profit']:,} in annual profit. The asking price is 
        ${mock_deal['asking_price']:,}.
        
        Reason for sale: {mock_deal['reason_for_selling']}
        
        This opportunity comes from our SeedStack deal analysis platform with full due diligence completed.
        """
    else:
        description = mock_deal.get('description', '')
    
    # Create marketplace listing
    listing_data = BusinessListingCreate(
        title=mock_deal['company_name'],
        industry=mock_deal['industry'],
        location=mock_deal['location'],
        description=description.strip(),
        annual_revenue=mock_deal['annual_revenue'],
        annual_profit=mock_deal['annual_profit'],
        asking_price=mock_deal['asking_price'],
        employees_count=mock_deal['employees_count'],
        years_in_business=mock_deal['years_in_business'],
        reason_for_selling=mock_deal['reason_for_selling'],
        funding_target=request.funding_target,
        cover_image_url="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
    )
    
    # Create the marketplace listing
    listing = BusinessListing(
        **listing_data.model_dump(),
        seller_id=current_user.id,
        status=BusinessStatus.ACTIVE,
        funding_raised=0.0,
        under_loi=False,
        investor_count=0
    )
    
    # In production, this would save to database
    # For demo, we'll return the created listing
    listing.id = f"ml_{request.deal_id}"
    
    return listing


@router.get("/marketplace-status/{deal_id}")
async def get_marketplace_status(
    deal_id: str,
    current_user: UserProfile = Depends(get_current_user)
):
    """
    Get the marketplace status of a pushed deal
    """
    # Mock response for demo
    return {
        "deal_id": deal_id,
        "marketplace_id": f"ml_{deal_id}",
        "status": "active",
        "funding_progress": {
            "target": 850000,
            "raised": 425000,
            "percentage": 50.0,
            "investor_count": 3,
            "days_remaining": 45
        },
        "marketplace_url": f"/marketplace/ml_{deal_id}",
        "analytics": {
            "views": 1247,
            "interested_investors": 15,
            "due_diligence_requests": 8
        }
    }


@router.post("/return-to-seedstack")
async def return_deal_to_seedstack(
    deal_id: str,
    funding_secured: bool,
    funding_details: Optional[Dict[str, Any]] = None,
    current_user: UserProfile = Depends(get_current_user)
):
    """
    Return a deal to SeedStack after securing funding on marketplace
    """
    if funding_secured and funding_details:
        # Update deal status in SeedStack
        update_data = {
            "funding_status": "secured",
            "funding_amount": funding_details.get("amount", 0),
            "investor_count": funding_details.get("investor_count", 0),
            "next_stage": "closing",
            "updated_at": datetime.utcnow().isoformat()
        }
    else:
        update_data = {
            "funding_status": "marketplace_failed",
            "next_stage": "reassess",
            "updated_at": datetime.utcnow().isoformat()
        }
    
    return {
        "deal_id": deal_id,
        "status": "updated",
        "next_actions": [
            "Review funding terms",
            "Prepare closing documents",
            "Schedule investor meetings",
            "Update due diligence room"
        ],
        "seedstack_url": f"/seedstack-app/deal-pipeline"
    }


@router.get("/workflow-status/{deal_id}")
async def get_workflow_status(
    deal_id: str,
    current_user: UserProfile = Depends(get_current_user)
):
    """
    Get the complete workflow status for a deal across both platforms
    """
    return {
        "deal_id": deal_id,
        "current_stage": "marketplace_funding",
        "seedstack_status": {
            "stage": "loi_sent",
            "last_updated": "2023-12-01T10:30:00Z",
            "completion": 75
        },
        "marketplace_status": {
            "listing_id": f"ml_{deal_id}",
            "status": "active",
            "funding_progress": 50.0,
            "investor_count": 3
        },
        "workflow_actions": [
            {
                "action": "view_seedstack",
                "label": "View in SeedStack",
                "url": f"/seedstack-app/deal-pipeline",
                "type": "primary"
            },
            {
                "action": "view_marketplace", 
                "label": "View on Marketplace",
                "url": f"/marketplace/ml_{deal_id}",
                "type": "secondary"
            },
            {
                "action": "update_funding",
                "label": "Update Funding Status",
                "url": f"/integration/marketplace-status/{deal_id}",
                "type": "info"
            }
        ]
    }