from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Optional
from datetime import datetime

from models import (
    Deal,
    TimelineEvent,
    UserProfile,
    UserType,
    DealStatus,
    Document,
    BusinessListing
)
from auth import get_current_user
from database import get_database, create_document, list_documents, get_document, update_document

router = APIRouter(prefix="/deals", tags=["deals"])


@router.get("/", response_model=List[Deal])
async def get_user_deals(
    current_user: UserProfile = Depends(get_current_user),
    db=Depends(get_database)
):
    """
    Get deals for the current user (as buyer or seller)
    """
    # Build filter query for deals where user is either buyer or seller
    filter_query = {
        "$or": [
            {"buyer_id": current_user.id},
            {"seller_id": current_user.id}
        ]
    }
    
    # Get deals
    deals = await list_documents("deals", filter_query=filter_query)
    
    # For each deal, get the associated business listing and timeline events
    for deal in deals:
        # Get business
        business = await get_document("business_listings", deal["business_id"])
        if business:
            deal["business"] = business
        
        # Get timeline events
        timeline_events = await list_documents(
            "timeline_events", 
            filter_query={"deal_id": deal["id"]}
        )
        if timeline_events:
            deal["timeline_events"] = timeline_events
    
    # Convert to Deal objects
    return [Deal(**deal) for deal in deals]


@router.get("/{deal_id}", response_model=Deal)
async def get_deal(
    deal_id: str,
    current_user: UserProfile = Depends(get_current_user),
    db=Depends(get_database)
):
    """
    Get a specific deal
    """
    # Get the deal
    deal = await get_document("deals", deal_id)
    
    if not deal:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Deal not found"
        )
    
    # Check if user is the buyer, the seller, or an admin
    if (deal["buyer_id"] != current_user.id and 
        deal["seller_id"] != current_user.id and
        current_user.user_type != UserType.ADMIN):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to view this deal"
        )
    
    # Get the business listing
    business = await get_document("business_listings", deal["business_id"])
    
    if business:
        deal["business"] = business
    
    # Get timeline events
    timeline_events = await list_documents(
        "timeline_events", 
        filter_query={"deal_id": deal_id}
    )
    
    if timeline_events:
        deal["timeline_events"] = timeline_events
    
    return Deal(**deal)


@router.post("/{deal_id}/timeline", response_model=TimelineEvent)
async def add_timeline_event(
    deal_id: str,
    event_data: dict,
    current_user: UserProfile = Depends(get_current_user),
    db=Depends(get_database)
):
    """
    Add a timeline event to a deal
    """
    # Get the deal
    deal = await get_document("deals", deal_id)
    
    if not deal:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Deal not found"
        )
    
    # Check if user is the buyer, the seller, or an admin
    if (deal["buyer_id"] != current_user.id and 
        deal["seller_id"] != current_user.id and
        current_user.user_type != UserType.ADMIN):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to add a timeline event"
        )
    
    # Create the timeline event
    timeline_event = TimelineEvent(
        deal_id=deal_id,
        title=event_data.get("title"),
        description=event_data.get("description"),
        event_type=event_data.get("event_type")
    )
    
    # Insert document
    timeline_event_dict = timeline_event.model_dump(by_alias=True)
    event_id = await create_document("timeline_events", timeline_event_dict)
    
    # Update the ID
    timeline_event.id = event_id
    
    return timeline_event


@router.post("/{deal_id}/complete", response_model=Deal)
async def complete_deal(
    deal_id: str,
    current_user: UserProfile = Depends(get_current_user),
    db=Depends(get_database)
):
    """
    Mark a deal as completed
    """
    # Get the deal
    deal = await get_document("deals", deal_id)
    
    if not deal:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Deal not found"
        )
    
    # Check if user is the seller or an admin
    if deal["seller_id"] != current_user.id and current_user.user_type != UserType.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only the seller can mark a deal as completed"
        )
    
    # Check if deal is in progress
    if deal["status"] != DealStatus.IN_PROGRESS.value:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This deal cannot be marked as completed"
        )
    
    # Update the deal status
    await update_document("deals", deal_id, {
        "status": DealStatus.COMPLETED.value,
        "updated_at": datetime.utcnow()
    })
    
    # Update the business listing status to CLOSED
    await update_document("business_listings", deal["business_id"], {
        "status": "closed",
        "updated_at": datetime.utcnow()
    })
    
    # Create timeline event
    timeline_event = TimelineEvent(
        deal_id=deal_id,
        title="Deal Completed",
        description="The transaction has been completed successfully",
        event_type="deal_completed"
    )
    
    timeline_event_dict = timeline_event.model_dump(by_alias=True)
    await create_document("timeline_events", timeline_event_dict)
    
    # Get the updated deal
    updated_deal = await get_document("deals", deal_id)
    
    # Get the business
    business = await get_document("business_listings", updated_deal["business_id"])
    
    if business:
        updated_deal["business"] = business
    
    # Get timeline events
    timeline_events = await list_documents(
        "timeline_events", 
        filter_query={"deal_id": deal_id}
    )
    
    if timeline_events:
        updated_deal["timeline_events"] = timeline_events
    
    return Deal(**updated_deal)


@router.post("/{deal_id}/documents", response_model=Document)
async def add_document(
    deal_id: str,
    document_data: dict,
    current_user: UserProfile = Depends(get_current_user),
    db=Depends(get_database)
):
    """
    Add a document to a deal
    """
    # Get the deal
    deal = await get_document("deals", deal_id)
    
    if not deal:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Deal not found"
        )
    
    # Check if user is the buyer, the seller, or an admin
    if (deal["buyer_id"] != current_user.id and 
        deal["seller_id"] != current_user.id and
        current_user.user_type != UserType.ADMIN):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to add documents"
        )
    
    # Create the document
    document = Document(
        deal_id=deal_id,
        uploaded_by=current_user.id,
        file_name=document_data.get("file_name"),
        file_url=document_data.get("file_url"),
        file_type=document_data.get("file_type"),
        description=document_data.get("description")
    )
    
    # Insert document
    document_dict = document.model_dump(by_alias=True)
    document_id = await create_document("documents", document_dict)
    
    # Update the ID
    document.id = document_id
    
    # Create timeline event
    timeline_event = TimelineEvent(
        deal_id=deal_id,
        title="Document Added",
        description=f"{document.file_name} was added to the deal",
        event_type="document_added"
    )
    
    timeline_event_dict = timeline_event.model_dump(by_alias=True)
    await create_document("timeline_events", timeline_event_dict)
    
    return document


@router.get("/{deal_id}/documents", response_model=List[Document])
async def get_deal_documents(
    deal_id: str,
    current_user: UserProfile = Depends(get_current_user),
    db=Depends(get_database)
):
    """
    Get all documents for a deal
    """
    # Get the deal
    deal = await get_document("deals", deal_id)
    
    if not deal:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Deal not found"
        )
    
    # Check if user is the buyer, the seller, or an admin
    if (deal["buyer_id"] != current_user.id and 
        deal["seller_id"] != current_user.id and
        current_user.user_type != UserType.ADMIN):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to view documents"
        )
    
    # Get documents
    documents = await list_documents("documents", filter_query={"deal_id": deal_id})
    
    # Convert to Document objects
    return [Document(**document) for document in documents]
