import os
import sys
from dotenv import load_dotenv
from supabase import create_client
import random
import uuid
from datetime import datetime
import time

# Load environment variables
load_dotenv()

# Supabase credentials
supabase_url = os.environ.get("SUPABASE_URL")
supabase_key = os.environ.get("SUPABASE_KEY")

if not supabase_url or not supabase_key:
    print("Supabase URL and key must be set in environment variables")
    sys.exit(1)

# Connect to Supabase
supabase = create_client(supabase_url, supabase_key)

# Sample data for business listings
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

image_urls = [
    "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
    "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
    "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
]

# Create sample admin user
admin_user_id = str(uuid.uuid4())
admin_user = {
    "id": admin_user_id,
    "email": "admin@seedsmb.com",
    "hashed_password": "$2b$12$Kzv0Qnbhhee8wFN07U.BZ.6VH5gUn96MoYvKQrh2CGQBRFKNQl0uC",  # "password123"
    "user_type": "ADMIN",
    "display_name": "Admin User",
    "completed_onboarding": True,
    "created_at": datetime.utcnow().isoformat(),
    "updated_at": datetime.utcnow().isoformat()
}

# Generate business listings
def generate_listings(num=6):
    listings = []
    for _ in range(num):
        industry = random.choice(industries)
        revenue = random.randint(500000, 10000000)
        profit = int(revenue * random.uniform(0.15, 0.3))
        asking_price = int(profit * random.uniform(3.0, 5.0))
        
        title_template = random.choice(titles)
        title = title_template.replace("{industry}", industry)
        
        funding_target = int(asking_price * random.uniform(0.3, 0.7))
        funding_raised = int(funding_target * random.uniform(0, 0.9))
        
        listings.append({
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
            "seller_id": admin_user_id,
            "status": "ACTIVE",
            "under_loi": random.random() < 0.2,  # 20% chance of being under LOI
            "cover_image_url": random.choice(image_urls),
            "created_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat()
        })
    
    return listings

# Main function to add mock data
def add_mock_data():
    try:
        print("Creating admin user...")
        response = supabase.table("profiles").upsert([admin_user]).execute()
        print("Admin user created or updated")
        
        # Wait a moment to ensure the user is created before adding listings
        time.sleep(1)
        
        print("Creating business listings...")
        listings = generate_listings(random.randint(6, 8))
        
        # Insert listings in batches to avoid rate limiting
        batch_size = 2
        for i in range(0, len(listings), batch_size):
            batch = listings[i:i+batch_size]
            response = supabase.table("business_listings").upsert(batch).execute()
            print(f"Added batch of {len(batch)} listings")
            time.sleep(0.5)
        
        print(f"Successfully added {len(listings)} business listings")
        
    except Exception as e:
        print(f"Error adding mock data: {e}")

if __name__ == "__main__":
    add_mock_data()
