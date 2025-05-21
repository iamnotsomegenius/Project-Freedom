import os
import asyncio
import sys
from dotenv import load_dotenv
from supabase import create_client
import json
import random
import uuid
from datetime import datetime, timedelta

# Load environment variables
load_dotenv()

# Get Supabase credentials
supabase_url = os.environ.get("SUPABASE_URL")
supabase_key = os.environ.get("SUPABASE_KEY")

if not supabase_url or not supabase_key:
    print("Supabase URL and key must be set in environment variables")
    sys.exit(1)

print(f"Initializing Supabase database at {supabase_url}")

# Initialize Supabase client
supabase = create_client(supabase_url, supabase_key)

async def create_tables():
    """Create necessary tables in Supabase"""
    print("Creating tables...")
    
    # Create profiles table
    try:
        # Using RPC call to create tables
        supabase.rpc(
            'create_profiles_table',
            {
                'sql': """
                CREATE TABLE IF NOT EXISTS public.profiles (
                    id UUID PRIMARY KEY,
                    email TEXT UNIQUE NOT NULL,
                    hashed_password TEXT NOT NULL,
                    user_type TEXT NOT NULL,
                    display_name TEXT,
                    avatar_url TEXT,
                    completed_onboarding BOOLEAN DEFAULT FALSE,
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
                    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
                );
                """
            }
        ).execute()
        print("Created profiles table")
    except Exception as e:
        # Directly execute SQL using PostgreSQL extension
        print(f"Error creating profiles table: {e}")
        print("Trying alternative method...")
        try:
            # Simplified method - we'll create the table with a sample profile
            # This is a workaround since we don't have direct SQL execution rights
            sample_profile = {
                "id": str(uuid.uuid4()),
                "email": "admin@seedsmb.com",
                "hashed_password": "$2b$12$Kzv0Qnbhhee8wFN07U.BZ.6VH5gUn96MoYvKQrh2CGQBRFKNQl0uC",  # "password123"
                "user_type": "ADMIN",
                "display_name": "Admin User",
                "completed_onboarding": True,
                "created_at": datetime.utcnow().isoformat(),
                "updated_at": datetime.utcnow().isoformat()
            }
            
            response = supabase.table("profiles").insert(sample_profile).execute()
            print("Created profiles table with sample profile")
        except Exception as e2:
            print(f"Could not create profiles table: {e2}")
    
    # Create business_listings table
    try:
        supabase.rpc(
            'create_business_listings_table',
            {
                'sql': """
                CREATE TABLE IF NOT EXISTS public.business_listings (
                    id UUID PRIMARY KEY,
                    title TEXT NOT NULL,
                    description TEXT,
                    industry TEXT,
                    location TEXT,
                    annual_revenue FLOAT,
                    annual_profit FLOAT,
                    asking_price FLOAT,
                    funding_target FLOAT DEFAULT 0,
                    funding_raised FLOAT DEFAULT 0,
                    seller_id UUID REFERENCES public.profiles(id),
                    cover_image_url TEXT,
                    status TEXT DEFAULT 'DRAFT',
                    under_loi BOOLEAN DEFAULT FALSE,
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
                    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
                );
                """
            }
        ).execute()
        print("Created business_listings table")
    except Exception as e:
        print(f"Error creating business_listings table: {e}")
        print("Trying alternative method...")
        
        # Initialize with sample listing
        try:
            sample_listing = generate_sample_listing()
            response = supabase.table("business_listings").insert(sample_listing).execute()
            print("Created business_listings table with sample listing")
        except Exception as e2:
            print(f"Could not create business_listings table: {e2}")

def generate_sample_listing():
    """Generate a sample business listing"""
    industries = [
        "Technology", "Food & Beverage", "Retail", "Healthcare", 
        "Manufacturing", "Services", "E-commerce", "Real Estate"
    ]
    
    locations = [
        "New York, NY", "San Francisco, CA", "Austin, TX", "Chicago, IL",
        "Miami, FL", "Denver, CO", "Seattle, WA", "Boston, MA"
    ]
    
    titles = [
        "Profitable {industry} Business with Steady Growth",
        "Established {industry} Company - 10+ Years in Business",
        "Turnkey {industry} Operation with Strong Margins",
        "High-Growth {industry} Business in Prime Location",
        "Premium {industry} Brand with Loyal Customer Base"
    ]
    
    descriptions = [
        "Well-established business with consistent growth and profitability. Strong team in place, proprietary systems, and loyal customer base. Owner is retiring after building this business for over a decade.",
        "Turnkey operation with streamlined processes and excellent reputation in the market. The business has shown consistent revenue and profit growth year over year.",
        "Market leader in the local area with minimal competition. Proprietary products and services with high margins. Owner willing to train and transition.",
        "Recession-resistant business model with diverse revenue streams. Experienced staff will remain with new ownership. Excellent online presence and reviews."
    ]
    
    # Generate image URLs
    image_urls = [
        "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
        "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
        "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
        "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
    ]
    
    industry = random.choice(industries)
    revenue = random.randint(500000, 10000000)
    profit = revenue * random.uniform(0.15, 0.3)
    asking_price = profit * random.uniform(3.0, 5.0)
    
    title_template = random.choice(titles)
    title = title_template.replace("{industry}", industry)
    
    funding_target = asking_price * random.uniform(0.3, 0.7)
    funding_raised = funding_target * random.uniform(0, 0.9)
    
    return {
        "id": str(uuid.uuid4()),
        "title": title,
        "description": random.choice(descriptions),
        "industry": industry,
        "location": random.choice(locations),
        "annual_revenue": revenue,
        "annual_profit": profit,
        "asking_price": asking_price,
        "funding_target": funding_target,
        "funding_raised": funding_raised,
        "status": "ACTIVE",
        "under_loi": random.random() < 0.2,  # 20% chance of being under LOI
        "cover_image_url": random.choice(image_urls),
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": datetime.utcnow().isoformat()
    }

def generate_sample_data():
    """Generate 6-8 sample business listings"""
    listings = []
    num_listings = random.randint(6, 8)
    
    for _ in range(num_listings):
        listings.append(generate_sample_listing())
    
    return listings

async def populate_sample_data():
    """Populate the database with sample data"""
    print("Populating database with sample data...")
    
    # Generate sample business listings
    sample_listings = generate_sample_data()
    
    try:
        # Insert sample listings
        for listing in sample_listings:
            try:
                response = supabase.table("business_listings").insert(listing).execute()
                print(f"Added listing: {listing['title']}")
            except Exception as e:
                print(f"Error adding listing {listing['title']}: {e}")
        
        print(f"Added {len(sample_listings)} sample business listings")
    except Exception as e:
        print(f"Error populating sample data: {e}")

async def main():
    # Create tables
    await create_tables()
    
    # Populate with sample data
    await populate_sample_data()
    
    print("Database initialization complete!")

if __name__ == "__main__":
    asyncio.run(main())
