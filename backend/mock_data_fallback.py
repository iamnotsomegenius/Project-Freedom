"""
Mock data fallback for when Supabase is not available.
This module provides fallback data for testing and development.
"""

from datetime import datetime, timedelta
import uuid
from models import UserType, BusinessStatus, DealStatus, FinancingType

# Import MOCK_USERS from auth_supabase to avoid duplication
from auth_supabase import MOCK_USERS

# Mock business listings
MOCK_LISTINGS = [
    {
        "id": "1",
        "title": "Premium Auto Detailing Business",
        "industry": "Automotive",
        "location": "Austin, TX",
        "description": "Established auto detailing business with loyal customer base and prime location.",
        "annual_revenue": 250000,
        "annual_profit": 85000,
        "asking_price": 350000,
        "employees_count": 5,
        "years_in_business": 8,
        "reason_for_selling": "Retirement",
        "funding_target": 150000,
        "funding_raised": 75000,
        "investor_count": 3,
        "seller_id": "2",  # seller@example.com
        "status": BusinessStatus.ACTIVE.value,
        "under_loi": False,
        "cover_image_url": "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
        "created_at": "2023-04-15T00:00:00Z",
        "updated_at": "2023-04-15T00:00:00Z"
    },
    {
        "id": "2",
        "title": "Downtown Coffee Shop",
        "industry": "Food & Beverage",
        "location": "Portland, OR",
        "description": "Popular coffee shop in downtown with strong brand and growing sales.",
        "annual_revenue": 320000,
        "annual_profit": 95000,
        "asking_price": 425000,
        "employees_count": 8,
        "years_in_business": 5,
        "reason_for_selling": "Relocating",
        "funding_target": 200000,
        "funding_raised": 120000,
        "investor_count": 4,
        "seller_id": "2",  # seller@example.com
        "status": BusinessStatus.ACTIVE.value,
        "under_loi": False,
        "cover_image_url": "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
        "created_at": "2023-05-10T00:00:00Z",
        "updated_at": "2023-05-10T00:00:00Z"
    },
    {
        "id": "3",
        "title": "E-commerce Furniture Store",
        "industry": "Retail",
        "location": "Chicago, IL",
        "description": "Profitable online furniture store with established supply chain and growing customer base.",
        "annual_revenue": 750000,
        "annual_profit": 180000,
        "asking_price": 650000,
        "employees_count": 4,
        "years_in_business": 3,
        "reason_for_selling": "New venture",
        "funding_target": 300000,
        "funding_raised": 150000,
        "investor_count": 5,
        "seller_id": "2",  # seller@example.com
        "status": BusinessStatus.ACTIVE.value,
        "under_loi": False,
        "cover_image_url": "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
        "created_at": "2023-05-20T00:00:00Z",
        "updated_at": "2023-05-20T00:00:00Z"
    },
    {
        "id": "4",
        "title": "High-Growth SaaS Platform",
        "industry": "Technology",
        "location": "San Francisco, CA",
        "description": "B2B SaaS platform with recurring revenue and strong growth potential.",
        "annual_revenue": 1200000,
        "annual_profit": 350000,
        "asking_price": 3500000,
        "employees_count": 12,
        "years_in_business": 4,
        "reason_for_selling": "Strategic exit",
        "funding_target": 1000000,
        "funding_raised": 600000,
        "investor_count": 8,
        "seller_id": "2",  # seller@example.com
        "status": BusinessStatus.ACTIVE.value,
        "under_loi": False,
        "cover_image_url": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
        "created_at": "2023-06-01T00:00:00Z",
        "updated_at": "2023-06-01T00:00:00Z"
    },
    {
        "id": "5",
        "title": "Manufacturing Workshop",
        "industry": "Manufacturing",
        "location": "Denver, CO",
        "description": "Well-established manufacturing business with modern equipment and skilled workforce.",
        "annual_revenue": 850000,
        "annual_profit": 220000,
        "asking_price": 975000,
        "employees_count": 15,
        "years_in_business": 12,
        "reason_for_selling": "Retirement",
        "funding_target": 400000,
        "funding_raised": 180000,
        "investor_count": 6,
        "seller_id": "2",  # seller@example.com
        "status": BusinessStatus.ACTIVE.value,
        "under_loi": False,
        "cover_image_url": "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
        "created_at": "2023-06-15T00:00:00Z",
        "updated_at": "2023-06-15T00:00:00Z"
    },
    {
        "id": "6",
        "title": "Healthcare Services Clinic",
        "industry": "Healthcare",
        "location": "Boston, MA",
        "description": "Turnkey healthcare facility with excellent reputation and steady client base.",
        "annual_revenue": 480000,
        "annual_profit": 145000,
        "asking_price": 620000,
        "employees_count": 8,
        "years_in_business": 7,
        "reason_for_selling": "Relocation",
        "funding_target": 250000,
        "funding_raised": 95000,
        "investor_count": 4,
        "seller_id": "2",  # seller@example.com
        "status": BusinessStatus.ACTIVE.value,
        "under_loi": False,
        "cover_image_url": "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
        "created_at": "2023-07-01T00:00:00Z",
        "updated_at": "2023-07-01T00:00:00Z"
    }
]

# Mock investments
MOCK_INVESTMENTS = [
    {
        "id": "1",
        "business_id": "1",
        "investor_id": "3",  # investor@example.com
        "amount": 25000,
        "created_at": "2023-04-20T00:00:00Z",
        "updated_at": "2023-04-20T00:00:00Z"
    },
    {
        "id": "2",
        "business_id": "1",
        "investor_id": "3",  # investor@example.com
        "amount": 50000,
        "created_at": "2023-04-25T00:00:00Z",
        "updated_at": "2023-04-25T00:00:00Z"
    },
    {
        "id": "3",
        "business_id": "2",
        "investor_id": "3",  # investor@example.com
        "amount": 40000,
        "created_at": "2023-05-15T00:00:00Z",
        "updated_at": "2023-05-15T00:00:00Z"
    },
    {
        "id": "4",
        "business_id": "3",
        "investor_id": "3",  # investor@example.com
        "amount": 75000,
        "created_at": "2023-05-25T00:00:00Z",
        "updated_at": "2023-05-25T00:00:00Z"
    }
]

# Mock offers
MOCK_OFFERS = [
    {
        "id": "1",
        "business_id": "1",
        "buyer_id": "4",  # buyer@example.com
        "offer_amount": 325000,
        "down_payment": 100000,
        "financing_terms": FinancingType.BANK_FINANCING.value,
        "contingencies": ["Due diligence", "Financing approval"],
        "closing_timeline": 60,
        "additional_notes": "Interested in retaining current staff",
        "status": DealStatus.PENDING.value,
        "created_at": "2023-04-22T00:00:00Z",
        "updated_at": "2023-04-22T00:00:00Z"
    },
    {
        "id": "2",
        "business_id": "2",
        "buyer_id": "4",  # buyer@example.com
        "offer_amount": 400000,
        "down_payment": 150000,
        "financing_terms": FinancingType.SBA_LOAN.value,
        "contingencies": ["Due diligence", "Lease transfer"],
        "closing_timeline": 90,
        "additional_notes": "Would like seller training period of 30 days",
        "status": DealStatus.PENDING.value,
        "created_at": "2023-05-18T00:00:00Z",
        "updated_at": "2023-05-18T00:00:00Z"
    }
]

# Mock deals
MOCK_DEALS = [
    {
        "id": "1",
        "business_id": "3",
        "seller_id": "2",  # seller@example.com
        "buyer_id": "4",  # buyer@example.com
        "offer_id": "3",
        "status": DealStatus.IN_PROGRESS.value,
        "created_at": "2023-05-28T00:00:00Z",
        "updated_at": "2023-05-28T00:00:00Z"
    }
]

# Mock timeline events
MOCK_TIMELINE_EVENTS = [
    {
        "id": "1",
        "deal_id": "1",
        "title": "Offer Accepted",
        "description": "Offer of $625,000 was accepted by the seller",
        "event_type": "offer_accepted",
        "timestamp": "2023-05-28T00:00:00Z"
    },
    {
        "id": "2",
        "deal_id": "1",
        "title": "Due Diligence Started",
        "description": "Buyer has started the due diligence process",
        "event_type": "due_diligence_started",
        "timestamp": "2023-06-01T00:00:00Z"
    }
]

# Mock documents
MOCK_DOCUMENTS = [
    {
        "id": "1",
        "deal_id": "1",
        "uploaded_by": "2",  # seller@example.com
        "file_name": "Financial_Statements_2022.pdf",
        "file_url": "https://example.com/files/financial_statements_2022.pdf",
        "file_type": "application/pdf",
        "description": "Financial statements for the year 2022",
        "created_at": "2023-06-02T00:00:00Z",
        "updated_at": "2023-06-02T00:00:00Z"
    }
]

# Helper functions to work with mock data
def get_mock_document(collection, doc_id):
    """Get a document from mock data by ID"""
    collections = {
        "profiles": MOCK_USERS.values(),
        "business_listings": MOCK_LISTINGS,
        "investments": MOCK_INVESTMENTS,
        "offers": MOCK_OFFERS,
        "deals": MOCK_DEALS,
        "timeline_events": MOCK_TIMELINE_EVENTS,
        "documents": MOCK_DOCUMENTS
    }
    
    if collection not in collections:
        return None
    
    for doc in collections[collection]:
        if doc.get("id") == doc_id:
            return doc
    
    return None

def list_mock_documents(collection, filter_query=None):
    """List documents from mock data with optional filtering"""
    collections = {
        "profiles": list(MOCK_USERS.values()),
        "business_listings": MOCK_LISTINGS,
        "investments": MOCK_INVESTMENTS,
        "offers": MOCK_OFFERS,
        "deals": MOCK_DEALS,
        "timeline_events": MOCK_TIMELINE_EVENTS,
        "documents": MOCK_DOCUMENTS
    }
    
    if collection not in collections:
        return []
    
    results = collections[collection]
    
    # Apply filtering if provided
    if filter_query:
        filtered_results = []
        for doc in results:
            match = True
            for key, value in filter_query.items():
                # Handle special case for $in operator
                if isinstance(value, dict) and "$in" in value:
                    if doc.get(key) not in value["$in"]:
                        match = False
                        break
                # Simple equality check
                elif doc.get(key) != value:
                    match = False
                    break
            if match:
                filtered_results.append(doc)
        results = filtered_results
    
    return results

def create_mock_document(collection, document):
    """Create a document in mock data"""
    collections = {
        "profiles": MOCK_USERS,
        "business_listings": MOCK_LISTINGS,
        "investments": MOCK_INVESTMENTS,
        "offers": MOCK_OFFERS,
        "deals": MOCK_DEALS,
        "timeline_events": MOCK_TIMELINE_EVENTS,
        "documents": MOCK_DOCUMENTS
    }
    
    if collection not in collections:
        return None
    
    # Ensure document has an ID
    if "id" not in document:
        document["id"] = str(uuid.uuid4())
    
    # Add timestamps if not present
    now = datetime.utcnow().isoformat()
    if "created_at" not in document:
        document["created_at"] = now
    if "updated_at" not in document:
        document["updated_at"] = now
    
    # Add to collection
    if collection == "profiles":
        # Special case for profiles which is a dict keyed by email
        if "email" in document:
            MOCK_USERS[document["email"]] = document
    else:
        collections[collection].append(document)
    
    return document["id"]

def update_mock_document(collection, doc_id, update_data):
    """Update a document in mock data"""
    collections = {
        "profiles": MOCK_USERS.values(),
        "business_listings": MOCK_LISTINGS,
        "investments": MOCK_INVESTMENTS,
        "offers": MOCK_OFFERS,
        "deals": MOCK_DEALS,
        "timeline_events": MOCK_TIMELINE_EVENTS,
        "documents": MOCK_DOCUMENTS
    }
    
    if collection not in collections:
        return False
    
    # Find the document
    for doc in collections[collection]:
        if doc.get("id") == doc_id:
            # Update fields
            for key, value in update_data.items():
                doc[key] = value
            
            # Update timestamp
            doc["updated_at"] = datetime.utcnow().isoformat()
            
            return True
    
    return False