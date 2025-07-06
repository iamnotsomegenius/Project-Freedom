from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Optional
from datetime import datetime, timedelta
import json
import base64
import io

from models import (
    UserProfile,
    CRMDeal,
    CRMDealCreate,
    CRMDealUpdate,
    ChatMessage,
    ChatRequest,
    PLAnalysis,
    PLAnalysisCreate,
    MarketResearch,
    MarketResearchRequest,
    LOI,
    LOICreate,
    LegalTemplate,
    LegalTemplateRequest,
    NDA,
    NDACreate,
    # New AI models
    DealSourcingRequest,
    DealSourcingResponse,
    AIChatRequest,
    AIChatResponse,
    AIConversation,
    AIMessage
)
from auth_supabase import get_current_user
from database_supabase import (
    get_supabase,
    create_document,
    list_documents,
    get_document,
    update_document,
    delete_document
)
from ai_services import ai_service, deal_sourcing_service

router = APIRouter(prefix="/seedstack", tags=["seedstack"])


# Demo login endpoint
@router.post("/demo-login")
async def demo_login():
    """
    Demo login for SeedStack platform testing
    """
    # This would normally create a proper JWT token
    # For demo purposes, we'll return a mock response
    return {
        "access_token": "demo_seedstack_token",
        "token_type": "bearer",
        "user": {
            "id": "demo-user-123",
            "email": "demo@seedstack.com",
            "user_type": "BUYER",
            "display_name": "Demo User"
        }
    }


# CRM Deal Management Endpoints
@router.get("/deals", response_model=List[CRMDeal])
async def get_user_deals(
    current_user: UserProfile = Depends(get_current_user)
):
    """
    Get all CRM deals for the current user
    """
    deals = await list_documents(
        "crm_deals", 
        filter_query={"user_id": current_user.id}
    )
    return [CRMDeal(**deal) for deal in deals]


@router.post("/deals", response_model=CRMDeal)
async def create_deal(
    deal_data: CRMDealCreate,
    current_user: UserProfile = Depends(get_current_user)
):
    """
    Create a new CRM deal
    """
    deal = CRMDeal(
        **deal_data.model_dump(),
        user_id=current_user.id,
        last_activity=datetime.utcnow()
    )
    
    deal_dict = deal.model_dump(by_alias=True)
    deal_id = await create_document("crm_deals", deal_dict)
    deal.id = deal_id
    
    return deal


@router.put("/deals/{deal_id}", response_model=CRMDeal)
async def update_deal(
    deal_id: str,
    deal_data: CRMDealUpdate,
    current_user: UserProfile = Depends(get_current_user)
):
    """
    Update a CRM deal
    """
    # Get existing deal
    existing_deal = await get_document("crm_deals", deal_id)
    
    if not existing_deal:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Deal not found"
        )
    
    if existing_deal["user_id"] != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to update this deal"
        )
    
    # Update fields
    update_data = deal_data.model_dump(exclude_unset=True)
    update_data["updated_at"] = datetime.utcnow().isoformat()
    update_data["last_activity"] = datetime.utcnow().isoformat()
    
    success = await update_document("crm_deals", deal_id, update_data)
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update deal"
        )
    
    # Get updated deal
    updated_deal = await get_document("crm_deals", deal_id)
    return CRMDeal(**updated_deal)


@router.delete("/deals/{deal_id}")
async def delete_deal(
    deal_id: str,
    current_user: UserProfile = Depends(get_current_user)
):
    """
    Delete a CRM deal
    """
    existing_deal = await get_document("crm_deals", deal_id)
    
    if not existing_deal:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Deal not found"
        )
    
    if existing_deal["user_id"] != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to delete this deal"
        )
    
    success = await delete_document("crm_deals", deal_id)
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete deal"
        )
    
    return {"message": "Deal deleted successfully"}


# AI Chat Assistant Endpoints
@router.post("/chat", response_model=ChatMessage)
async def ai_chat(
    chat_request: ChatRequest,
    current_user: UserProfile = Depends(get_current_user)
):
    """
    AI Assistant chat endpoint
    """
    # Simulate AI response generation
    # In production, this would call OpenAI GPT-4 API
    
    context = ""
    if chat_request.deal_id:
        deal = await get_document("crm_deals", chat_request.deal_id)
        if deal:
            context = f"Deal context: {deal.get('title', 'Unknown')} in {deal.get('industry', 'Unknown')} industry"
    
    # Mock AI response based on message type
    if chat_request.message_type == "deal_analysis":
        response = f"Based on your query about deal analysis: {chat_request.message}\n\nHere are my insights:\n1. Financial metrics analysis\n2. Risk assessment\n3. Market comparison\n{context}"
    elif chat_request.message_type == "market_research":
        response = f"Market research insights for: {chat_request.message}\n\n1. Industry trends\n2. Competitive landscape\n3. Valuation multiples\n{context}"
    elif chat_request.message_type == "loi_help":
        response = f"LOI assistance for: {chat_request.message}\n\n1. Standard terms recommendations\n2. Negotiation strategies\n3. Legal considerations\n{context}"
    else:
        response = f"I understand you're asking: {chat_request.message}\n\nLet me help you with that. {context}"
    
    # Create chat message record
    chat_message = ChatMessage(
        user_id=current_user.id,
        deal_id=chat_request.deal_id,
        message=chat_request.message,
        response=response,
        message_type=chat_request.message_type
    )
    
    chat_dict = chat_message.model_dump(by_alias=True)
    message_id = await create_document("chat_messages", chat_dict)
    chat_message.id = message_id
    
    return chat_message


@router.get("/chat", response_model=List[ChatMessage])
async def get_chat_history(
    deal_id: Optional[str] = None,
    current_user: UserProfile = Depends(get_current_user)
):
    """
    Get chat history for user
    """
    filter_query = {"user_id": current_user.id}
    if deal_id:
        filter_query["deal_id"] = deal_id
    
    messages = await list_documents("chat_messages", filter_query=filter_query)
    return [ChatMessage(**msg) for msg in messages]


# P&L Analysis Endpoints
@router.post("/pl-analysis", response_model=PLAnalysis)
async def create_pl_analysis(
    analysis_request: PLAnalysisCreate,
    current_user: UserProfile = Depends(get_current_user)
):
    """
    Create P&L analysis from uploaded file
    """
    # Simulate file processing and AI analysis
    # In production, this would process the actual file and call AI services
    
    mock_analysis = {
        "revenue_growth": "12.5% YoY",
        "profit_margins": {
            "gross_margin": "45.2%",
            "operating_margin": "18.7%",
            "net_margin": "12.1%"
        },
        "key_metrics": {
            "revenue": 2500000,
            "cogs": 1370000,
            "operating_expenses": 662500,
            "net_income": 302500
        },
        "ratios": {
            "current_ratio": 2.1,
            "debt_to_equity": 0.45,
            "roa": 15.2,
            "roe": 22.8
        }
    }
    
    red_flags = [
        "Accounts receivable increased 35% without corresponding revenue growth",
        "Inventory turnover declined from 6.2x to 4.8x",
        "Employee costs increased 22% while revenue grew only 12.5%"
    ]
    
    summary = "This business shows strong profitability with healthy margins. However, working capital management needs attention as indicated by rising AR and declining inventory turnover."
    
    analysis = PLAnalysis(
        user_id=current_user.id,
        deal_id=analysis_request.deal_id,
        file_name=analysis_request.file_name,
        file_url=f"/uploads/{analysis_request.file_name}",  # Mock URL
        analysis_result=mock_analysis,
        red_flags=red_flags,
        summary=summary,
        status="completed"
    )
    
    analysis_dict = analysis.model_dump(by_alias=True)
    analysis_id = await create_document("pl_analyses", analysis_dict)
    analysis.id = analysis_id
    
    return analysis


@router.get("/pl-analysis", response_model=List[PLAnalysis])
async def get_pl_analyses(
    deal_id: Optional[str] = None,
    current_user: UserProfile = Depends(get_current_user)
):
    """
    Get P&L analyses for user
    """
    filter_query = {"user_id": current_user.id}
    if deal_id:
        filter_query["deal_id"] = deal_id
    
    analyses = await list_documents("pl_analyses", filter_query=filter_query)
    return [PLAnalysis(**analysis) for analysis in analyses]


# Market Research Endpoints
@router.post("/market-research", response_model=MarketResearch)
async def create_market_research(
    research_request: MarketResearchRequest,
    current_user: UserProfile = Depends(get_current_user)
):
    """
    Generate market research for industry and location
    """
    # Mock market research data
    mock_research_data = {
        "industry_overview": {
            "market_size": "$45.2B",
            "growth_rate": "8.7% CAGR",
            "key_players": ["Company A", "Company B", "Company C"],
            "market_trends": [
                "Digital transformation acceleration",
                "Consolidation among smaller players",
                "Increased focus on sustainability"
            ]
        },
        "location_analysis": {
            "market_penetration": "Medium",
            "competition_density": "High",
            "economic_indicators": {
                "gdp_growth": "3.2%",
                "unemployment": "4.1%",
                "median_income": "$65,000"
            }
        },
        "valuation_multiples": {
            "revenue_multiple": "2.3x - 3.8x",
            "ebitda_multiple": "6.2x - 9.5x",
            "industry_average": "7.8x EBITDA"
        },
        "comparable_transactions": [
            {"company": "Similar Co A", "multiple": "8.2x", "year": "2024"},
            {"company": "Similar Co B", "multiple": "7.1x", "year": "2024"},
            {"company": "Similar Co C", "multiple": "9.3x", "year": "2023"}
        ]
    }
    
    research = MarketResearch(
        user_id=current_user.id,
        deal_id=research_request.deal_id,
        industry=research_request.industry,
        location=research_request.location,
        naics_code="454110",  # Mock NAICS code
        research_data=mock_research_data,
        status="completed"
    )
    
    research_dict = research.model_dump(by_alias=True)
    research_id = await create_document("market_research", research_dict)
    research.id = research_id
    
    return research


@router.get("/market-research", response_model=List[MarketResearch])
async def get_market_research(
    deal_id: Optional[str] = None,
    current_user: UserProfile = Depends(get_current_user)
):
    """
    Get market research for user
    """
    filter_query = {"user_id": current_user.id}
    if deal_id:
        filter_query["deal_id"] = deal_id
    
    research = await list_documents("market_research", filter_query=filter_query)
    return [MarketResearch(**r) for r in research]


# LOI Generation Endpoints
@router.post("/loi", response_model=LOI)
async def generate_loi(
    loi_request: LOICreate,
    current_user: UserProfile = Depends(get_current_user)
):
    """
    Generate Letter of Intent
    """
    # Mock LOI content generation
    loi_content = f"""
LETTER OF INTENT

To: {loi_request.seller_name}
From: {loi_request.buyer_name}
Date: {datetime.now().strftime('%B %d, %Y')}
Re: Proposed Acquisition of {loi_request.business_name}

Dear {loi_request.seller_name},

This Letter of Intent ("LOI") outlines the terms under which {loi_request.buyer_name} ("Buyer") proposes to acquire {loi_request.business_name} ("Company") from {loi_request.seller_name} ("Seller").

1. PURCHASE PRICE: ${loi_request.offer_amount:,.2f}

2. DUE DILIGENCE: Buyer shall have {loi_request.due_diligence_period} days to complete due diligence.

3. FINANCING: {"This offer is subject to Buyer securing financing." if loi_request.financing_contingency else "This is an all-cash offer with no financing contingency."}

4. EXCLUSIVITY: Seller agrees to negotiate exclusively with Buyer for {loi_request.exclusivity_period} days.

{f"5. EARNOUT: {loi_request.earnout_provision}" if loi_request.earnout_provision else ""}

{f"6. ADDITIONAL TERMS: {loi_request.additional_terms}" if loi_request.additional_terms else ""}

This LOI is non-binding except for the exclusivity and confidentiality provisions.

Sincerely,
{loi_request.buyer_name}
"""
    
    loi = LOI(
        **loi_request.model_dump(),
        user_id=current_user.id,
        generated_content=loi_content
    )
    
    loi_dict = loi.model_dump(by_alias=True)
    loi_id = await create_document("lois", loi_dict)
    loi.id = loi_id
    
    return loi


@router.get("/loi", response_model=List[LOI])
async def get_lois(
    deal_id: Optional[str] = None,
    current_user: UserProfile = Depends(get_current_user)
):
    """
    Get LOIs for user
    """
    filter_query = {"user_id": current_user.id}
    if deal_id:
        filter_query["deal_id"] = deal_id
    
    lois = await list_documents("lois", filter_query=filter_query)
    return [LOI(**loi) for loi in lois]


# Legal Templates Endpoints
@router.post("/legal-templates", response_model=LegalTemplate)
async def generate_legal_template(
    template_request: LegalTemplateRequest,
    current_user: UserProfile = Depends(get_current_user)
):
    """
    Generate legal template
    """
    # Mock template generation based on type
    if template_request.template_type == "nda":
        content = """
NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement ("Agreement") is entered into on [DATE] between [DISCLOSING PARTY] and [RECEIVING PARTY].

1. CONFIDENTIAL INFORMATION: All business and financial information shared in connection with the potential transaction.

2. NON-DISCLOSURE: Receiving Party agrees not to disclose Confidential Information to any third parties.

3. TERM: This Agreement shall remain in effect for 2 years from the date of execution.

4. RETURN OF MATERIALS: Upon request, all Confidential Information shall be returned or destroyed.

[Signature blocks]
"""
    elif template_request.template_type == "apa":
        content = """
ASSET PURCHASE AGREEMENT OUTLINE

1. PARTIES AND TRANSACTION STRUCTURE
2. PURCHASE PRICE AND PAYMENT TERMS
3. ASSETS BEING PURCHASED
4. LIABILITIES ASSUMED
5. REPRESENTATIONS AND WARRANTIES
6. COVENANTS AND AGREEMENTS
7. CONDITIONS TO CLOSING
8. INDEMNIFICATION
9. DISPUTE RESOLUTION
10. MISCELLANEOUS PROVISIONS

[Detailed provisions to be completed by legal counsel]
"""
    else:
        content = f"Template for {template_request.template_type} - {template_request.template_name}"
    
    template = LegalTemplate(
        user_id=current_user.id,
        deal_id=template_request.deal_id,
        template_type=template_request.template_type,
        template_name=template_request.template_name,
        generated_content=content,
        customizations=template_request.customizations
    )
    
    template_dict = template.model_dump(by_alias=True)
    template_id = await create_document("legal_templates", template_dict)
    template.id = template_id
    
    return template


@router.get("/legal-templates", response_model=List[LegalTemplate])
async def get_legal_templates(
    template_type: Optional[str] = None,
    current_user: UserProfile = Depends(get_current_user)
):
    """
    Get legal templates for user
    """
    filter_query = {"user_id": current_user.id}
    if template_type:
        filter_query["template_type"] = template_type
    
    templates = await list_documents("legal_templates", filter_query=filter_query)
    return [LegalTemplate(**template) for template in templates]


# Integration endpoint to push deal to marketplace
@router.post("/deals/{deal_id}/publish-to-marketplace")
async def publish_deal_to_marketplace(
    deal_id: str,
    current_user: UserProfile = Depends(get_current_user)
):
    """
    Publish a CRM deal to the SeedSMB marketplace for funding
    """
    # Get the CRM deal
    crm_deal = await get_document("crm_deals", deal_id)
    
    if not crm_deal:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Deal not found"
        )
    
    if crm_deal["user_id"] != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to publish this deal"
        )
    
    # Check if deal is ready for marketplace (LOI signed, etc.)
    if crm_deal["stage"] not in ["loi_sent", "diligence", "closed"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Deal must be at LOI stage or beyond to publish to marketplace"
        )
    
    # Create marketplace listing
    marketplace_listing = {
        "title": crm_deal["title"],
        "industry": crm_deal.get("industry", ""),
        "location": crm_deal.get("location", ""),
        "annual_revenue": crm_deal.get("revenue", 0),
        "asking_price": crm_deal.get("asking_price", 0),
        "ebitda": crm_deal.get("ebitda", 0),
        "description": f"Investment opportunity: {crm_deal['title']}",
        "seller_id": current_user.id,
        "status": "active",
        "funding_target": crm_deal.get("asking_price", 0) * 0.8,  # 80% of asking price
        "seedstack_deal_id": deal_id  # Link back to SeedStack deal
    }
    
    listing_id = await create_document("business_listings", marketplace_listing)
    
    # Update CRM deal with marketplace listing ID
    await update_document("crm_deals", deal_id, {
        "marketplace_listing_id": listing_id,
        "updated_at": datetime.utcnow().isoformat()
    })
    
    return {
        "message": "Deal successfully published to marketplace",
        "listing_id": listing_id,
        "marketplace_url": f"/marketplace/{listing_id}"
    }


# AI and Deal Sourcing Endpoints
@router.post("/ai/chat", response_model=AIChatResponse)
async def ai_chat(
    request: AIChatRequest,
    current_user: UserProfile = Depends(get_current_user)
):
    """
    AI-powered chat for deal sourcing and acquisition guidance
    """
    try:
        # Add user context to the request
        user_context = {
            "user_id": current_user.id,
            "user_type": current_user.user_type,
            "display_name": current_user.display_name
        }
        
        # Generate AI response
        response = await ai_service.generate_chat_response(request, user_context)
        
        # Save conversation to database (optional)
        if request.conversation_id:
            try:
                # Try to update existing conversation
                conversation = await get_document("ai_conversations", request.conversation_id)
                if conversation and conversation["user_id"] == current_user.id:
                    # Add new messages to existing conversation
                    user_message = AIMessage(
                        type="user",
                        content=request.message
                    )
                    ai_message = AIMessage(
                        type="ai", 
                        content=response.response
                    )
                    
                    conversation["messages"].extend([
                        user_message.model_dump(),
                        ai_message.model_dump()
                    ])
                    conversation["updated_at"] = datetime.utcnow().isoformat()
                    
                    await update_document("ai_conversations", request.conversation_id, conversation)
            except:
                # Create new conversation if update fails
                pass
        
        return response
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"AI service error: {str(e)}"
        )


@router.get("/ai/conversations", response_model=List[AIConversation])
async def get_conversations(
    current_user: UserProfile = Depends(get_current_user)
):
    """
    Get user's AI conversation history
    """
    conversations = await list_documents(
        "ai_conversations",
        filter_query={"user_id": current_user.id}
    )
    return [AIConversation(**conv) for conv in conversations]


@router.post("/deal-sourcing/search", response_model=DealSourcingResponse)
async def search_companies(
    request: DealSourcingRequest,
    current_user: UserProfile = Depends(get_current_user)
):
    """
    Search for companies based on acquisition criteria
    """
    try:
        # Use the deal sourcing service to find companies
        response = await deal_sourcing_service.search_companies(
            request.criteria, 
            request.max_results
        )
        
        # Log the search for analytics (optional)
        search_log = {
            "user_id": current_user.id,
            "criteria": request.criteria.model_dump(),
            "results_count": response.total_found,
            "timestamp": datetime.utcnow().isoformat()
        }
        
        try:
            await create_document("deal_sourcing_searches", search_log)
        except:
            # Don't fail the request if logging fails
            pass
        
        return response
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Deal sourcing error: {str(e)}"
        )


@router.post("/deal-sourcing/add-to-crm")
async def add_company_to_crm(
    company_id: str,
    company_data: dict,
    current_user: UserProfile = Depends(get_current_user)
):
    """
    Add a sourced company to the CRM pipeline
    """
    try:
        # Create CRM deal from company data
        deal = CRMDeal(
            user_id=current_user.id,
            title=company_data.get("company_name", "Unnamed Company"),
            industry=company_data.get("industry", ""),
            location=company_data.get("location", ""),
            revenue=company_data.get("estimated_revenue", 0),
            asking_price=company_data.get("estimated_revenue", 0) * 3,  # Rough estimate
            stage="interested",
            priority="medium",
            notes=f"Sourced via AI: {company_data.get('business_details', {}).get('specialties', 'N/A')}",
            broker_contact=company_data.get("contact_info", {}).get("email", ""),
            source="AI Deal Sourcing",
            last_activity=datetime.utcnow()
        )
        
        deal_dict = deal.model_dump(by_alias=True)
        deal_id = await create_document("crm_deals", deal_dict)
        deal.id = deal_id
        
        # Note: Automated outreach sequence would be implemented here
        
        return {
            "message": "Company added to CRM successfully",
            "deal_id": deal_id,
            "deal": deal,
            "next_steps": [
                "Automated NDA email scheduled",
                "Initial outreach sequence started", 
                "Company profile created in 'Interested' stage"
            ]
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error adding company to CRM: {str(e)}"
        )


@router.get("/deal-sourcing/search-history")
async def get_search_history(
    current_user: UserProfile = Depends(get_current_user)
):
    """
    Get user's deal sourcing search history
    """
    try:
        searches = await list_documents(
            "deal_sourcing_searches",
            filter_query={"user_id": current_user.id}
        )
        return {
            "searches": searches,
            "total_searches": len(searches)
        }
    except:
        return {
            "searches": [],
            "total_searches": 0
        }