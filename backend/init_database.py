#!/usr/bin/env python3
"""
Database initialization script for SeedSMB
Creates tables and populates with sample data using the existing database connection
"""

import asyncio
import os
import sys
from datetime import datetime, timedelta
import random
import uuid
import json
from typing import List, Dict, Any

# Add the backend directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from database_supabase import connect_to_supabase, get_supabase, create_document
from models import UserType, BusinessStatus, FinancingType, DealStatus
from passlib.context import CryptContext

# Setup password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

async def init_tables():
    """Initialize database tables by inserting sample data (this will create tables if they don't exist)"""
    print("🔄 Initializing database tables...")
    
    # Connect to Supabase
    await connect_to_supabase()
    supabase = get_supabase()
    
    if not supabase:
        raise Exception("Failed to connect to Supabase")
    
    print("✅ Connected to Supabase successfully")
    
    # Create sample users first
    await create_sample_users()
    
    # Get the seller ID for creating listings
    seller_response = supabase.table("profiles").select("id").eq("user_type", "SELLER").limit(1).execute()
    seller_id = seller_response.data[0]["id"] if seller_response.data else None
    
    if seller_id:
        await create_sample_listings(seller_id)
        await create_sample_investments_and_offers()
    
    print("✅ Database initialization completed successfully!")

async def create_sample_users():
    """Create sample user profiles"""
    print("👤 Creating sample users...")
    
    supabase = get_supabase()
    
    # Check if users already exist
    existing_users = supabase.table("profiles").select("id").execute()
    if existing_users.data and len(existing_users.data) > 0:
        print(f"✅ Found {len(existing_users.data)} existing users, skipping user creation")
        return
    
    # Create sample users
    sample_users = [
        {
            "id": str(uuid.uuid4()),
            "email": "admin@seedsmb.com",
            "hashed_password": pwd_context.hash("admin123"),
            "user_type": UserType.ADMIN.value,
            "display_name": "SeedSMB Admin",
            "completed_onboarding": True,
            "created_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "email": "seller@demo.com",
            "hashed_password": pwd_context.hash("demo123"),
            "user_type": UserType.SELLER.value,
            "display_name": "Demo Business Seller",
            "completed_onboarding": True,
            "created_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "email": "buyer@demo.com",
            "hashed_password": pwd_context.hash("demo123"),
            "user_type": UserType.BUYER.value,
            "display_name": "Demo Business Buyer",
            "completed_onboarding": True,
            "created_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "email": "investor@demo.com",
            "hashed_password": pwd_context.hash("demo123"),
            "user_type": UserType.INVESTOR.value,
            "display_name": "Demo Business Investor",
            "completed_onboarding": True,
            "created_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat()
        }
    ]
    
    try:
        # Insert users one by one to handle any existing conflicts
        for user in sample_users:
            try:
                response = supabase.table("profiles").insert(user).execute()
                print(f"✅ Created user: {user['display_name']} ({user['email']})")
            except Exception as e:
                print(f"⚠️  User {user['email']} might already exist: {str(e)}")
    
    except Exception as e:
        print(f"❌ Error creating users: {str(e)}")
        raise

async def create_sample_listings(seller_id: str):
    """Create sample business listings"""
    print("🏢 Creating sample business listings...")
    
    supabase = get_supabase()
    
    # Check if listings already exist
    existing_listings = supabase.table("business_listings").select("id").execute()
    if existing_listings.data and len(existing_listings.data) > 0:
        print(f"✅ Found {len(existing_listings.data)} existing listings, skipping listing creation")
        return
    
    # Sample data for generating realistic listings
    industries = [
        "Technology", "Food & Beverage", "Retail", "Healthcare", 
        "Manufacturing", "Professional Services", "E-commerce", "Real Estate",
        "Construction", "Consulting"
    ]
    
    locations = [
        "San Francisco, CA", "Austin, TX", "New York, NY", "Seattle, WA",
        "Chicago, IL", "Boston, MA", "Miami, FL", "Denver, CO",
        "Atlanta, GA", "Portland, OR"
    ]
    
    business_templates = [
        {
            "title": "Profitable {industry} Business - Established Brand",
            "description": "Well-established {industry} business with consistent growth and profitability. Strong customer base, proven systems, and experienced team. Owner is retiring after building this successful enterprise over the past decade."
        },
        {
            "title": "Growing {industry} Company - Prime Location",
            "description": "High-growth {industry} business in prime location with excellent foot traffic. Modern equipment, loyal customer base, and strong online presence. Perfect for expansion-minded entrepreneur."
        },
        {
            "title": "Turnkey {industry} Operation - Cash Flow Positive",
            "description": "Turnkey {industry} operation with streamlined processes and excellent margins. Recession-resistant business model with multiple revenue streams. Seller will provide full training and transition support."
        },
        {
            "title": "Premium {industry} Service Provider",
            "description": "Premium {industry} service provider serving high-end clientele. Excellent reputation, recurring revenue model, and minimal competition. Ideal for qualified buyer looking for immediate cash flow."
        }
    ]
    
    # Create 8-10 sample listings
    num_listings = random.randint(8, 10)
    sample_listings = []
    
    for i in range(num_listings):
        template = random.choice(business_templates)
        industry = random.choice(industries)
        
        # Generate realistic financial data
        annual_revenue = random.randint(300000, 8000000)
        annual_profit = int(annual_revenue * random.uniform(0.12, 0.35))
        asking_price = int(annual_profit * random.uniform(2.8, 5.2))
        
        # Funding data (some businesses have crowdfunding)
        has_funding = random.random() < 0.4  # 40% chance
        funding_target = int(asking_price * random.uniform(0.25, 0.60)) if has_funding else 0
        funding_raised = int(funding_target * random.uniform(0.05, 0.85)) if funding_target > 0 else 0
        investor_count = random.randint(3, 25) if funding_raised > 0 else 0
        
        # Business details
        employees_count = random.randint(2, 45)
        years_in_business = random.randint(3, 25)
        
        # Status distribution (most active)
        status_choices = [BusinessStatus.ACTIVE, BusinessStatus.DRAFT, BusinessStatus.UNDER_LOI]
        status_weights = [0.75, 0.15, 0.10]
        status = random.choices(status_choices, status_weights)[0].value
        
        listing = {
            "id": str(uuid.uuid4()),
            "seller_id": seller_id,
            "title": template["title"].format(industry=industry),
            "description": template["description"].format(industry=industry),
            "industry": industry,
            "location": random.choice(locations),
            "annual_revenue": annual_revenue,
            "annual_profit": annual_profit,
            "asking_price": asking_price,
            "employees_count": employees_count,
            "years_in_business": years_in_business,
            "reason_for_selling": random.choice([
                "Retirement after successful career",
                "Relocating to another state",
                "Pursuing new business opportunities",
                "Health considerations",
                "Ready for next chapter"
            ]),
            "funding_target": funding_target,
            "funding_raised": funding_raised,
            "status": status,
            "under_loi": status == BusinessStatus.UNDER_LOI.value,
            "investor_count": investor_count,
            "funding_end_date": (datetime.utcnow() + timedelta(days=random.randint(15, 120))).isoformat() if funding_target > 0 else None,
            "cover_image_url": f"https://images.unsplash.com/photo-{random.randint(1540000000, 1580000000)}-{random.randint(100000000, 999999999)}?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
            "created_at": (datetime.utcnow() - timedelta(days=random.randint(1, 90))).isoformat(),
            "updated_at": datetime.utcnow().isoformat()
        }
        
        sample_listings.append(listing)
    
    try:
        # Insert listings
        for listing in sample_listings:
            try:
                response = supabase.table("business_listings").insert(listing).execute()
                print(f"✅ Created listing: {listing['title']}")
            except Exception as e:
                print(f"⚠️  Error creating listing '{listing['title']}': {str(e)}")
        
        print(f"✅ Created {len(sample_listings)} business listings")
    
    except Exception as e:
        print(f"❌ Error creating listings: {str(e)}")
        raise

async def create_sample_investments_and_offers():
    """Create sample investments and offers"""
    print("💰 Creating sample investments and offers...")
    
    supabase = get_supabase()
    
    # Get some business listings
    listings_response = supabase.table("business_listings").select("id").limit(5).execute()
    if not listings_response.data:
        print("⚠️  No business listings found, skipping investments and offers")
        return
    
    # Get investor and buyer profiles
    investor_response = supabase.table("profiles").select("id").eq("user_type", "INVESTOR").limit(1).execute()
    buyer_response = supabase.table("profiles").select("id").eq("user_type", "BUYER").limit(1).execute()
    
    if not investor_response.data or not buyer_response.data:
        print("⚠️  Missing investor or buyer profiles, skipping investments and offers")
        return
    
    investor_id = investor_response.data[0]["id"]
    buyer_id = buyer_response.data[0]["id"]
    
    # Create 2-3 sample investments
    try:
        for i, listing in enumerate(listings_response.data[:3]):
            investment = {
                "id": str(uuid.uuid4()),
                "business_id": listing["id"],
                "investor_id": investor_id,
                "amount": random.randint(10000, 75000),
                "created_at": datetime.utcnow().isoformat(),
                "updated_at": datetime.utcnow().isoformat()
            }
            
            response = supabase.table("investments").insert(investment).execute()
            print(f"✅ Created investment of ${investment['amount']:,}")
    
    except Exception as e:
        print(f"⚠️  Error creating investments: {str(e)}")
    
    # Create 1-2 sample offers
    try:
        for i, listing in enumerate(listings_response.data[:2]):
            offer_amount = random.randint(800000, 2500000)
            offer = {
                "id": str(uuid.uuid4()),
                "business_id": listing["id"],
                "buyer_id": buyer_id,
                "offer_amount": offer_amount,
                "down_payment": int(offer_amount * random.uniform(0.15, 0.35)),
                "financing_terms": random.choice(list(FinancingType)).value,
                "contingencies": ["due_diligence", "financing", "lease_review"],
                "closing_timeline": random.randint(45, 90),
                "additional_notes": "Serious buyer with proven track record. Ready to move quickly with the right opportunity.",
                "status": random.choice(list(DealStatus)).value,
                "created_at": datetime.utcnow().isoformat(),
                "updated_at": datetime.utcnow().isoformat()
            }
            
            response = supabase.table("offers").insert(offer).execute()
            print(f"✅ Created offer of ${offer['offer_amount']:,}")
    
    except Exception as e:
        print(f"⚠️  Error creating offers: {str(e)}")

async def main():
    """Main initialization function"""
    print("🚀 Starting SeedSMB database initialization...")
    print("=" * 50)
    
    try:
        await init_tables()
        print("=" * 50)
        print("🎉 Database initialization completed successfully!")
        print("\n📋 Demo Accounts Created:")
        print("   • Admin: admin@seedsmb.com / admin123")
        print("   • Seller: seller@demo.com / demo123")  
        print("   • Buyer: buyer@demo.com / demo123")
        print("   • Investor: investor@demo.com / demo123")
        print("\nYou can now test the application with these accounts.")
        
    except Exception as e:
        print(f"❌ Database initialization failed: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    asyncio.run(main())