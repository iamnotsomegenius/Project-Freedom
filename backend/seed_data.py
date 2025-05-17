import asyncio
import os
import json
from datetime import datetime, timedelta
from motor.motor_asyncio import AsyncIOMotorClient
from passlib.context import CryptContext
import random
import logging

# Setup password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Industry options
industries = [
    "Technology", "Food & Beverage", "Retail", "Healthcare", 
    "Manufacturing", "Services", "E-commerce", "Real Estate",
    "Construction", "Finance"
]

# Locations
locations = [
    "San Francisco, CA", "Austin, TX", "New York, NY", "Seattle, WA",
    "Chicago, IL", "Boston, MA", "Miami, FL", "Denver, CO",
    "Atlanta, GA", "Portland, OR"
]

# Business names
business_name_prefixes = [
    "Alpine", "Blue Ocean", "Cascade", "Digital", "Eagle", 
    "Frontier", "Green Valley", "Horizon", "Innovative", "Junction"
]

business_name_suffixes = [
    "Technologies", "Solutions", "Enterprises", "Industries", "Ventures",
    "Systems", "Dynamics", "Partners", "Group", "Services"
]

# Sample business descriptions
business_descriptions = [
    "A leading provider of software solutions for small businesses, focusing on automation and efficiency.",
    "Family-owned restaurant with loyal customer base and proprietary recipes passed down through generations.",
    "Established retail store with premium location and growing e-commerce presence.",
    "Healthcare services provider specializing in home care for elderly patients.",
    "Manufacturing company producing custom components for the automotive industry.",
    "Professional services firm offering accounting and tax preparation for SMBs.",
    "E-commerce platform specializing in handcrafted home decor with global shipping capabilities.",
    "Real estate management company with a portfolio of residential and commercial properties.",
    "Construction firm specializing in commercial renovations and tenant improvements.",
    "Financial advisory practice serving high-net-worth individuals and small business owners."
]

# Reasons for selling
reasons_for_selling = [
    "Retirement after 15+ years of successful operation.",
    "Owner relocating to another state for family reasons.",
    "Pursuing new business ventures and opportunities.",
    "Health issues requiring reduced work commitment.",
    "Partnership dissolution with amicable agreement to sell.",
    "Ready for next chapter after building the business from the ground up.",
    "Looking to capitalize on current market conditions favorable to sellers.",
    "Desire to consolidate multiple business interests.",
    "Transitioning to a consulting role in the industry.",
    "Family succession plan not viable as next generation has other interests."
]

async def connect_to_mongo():
    """Connect to MongoDB"""
    mongo_url = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
    db_name = os.environ.get("DB_NAME", "seedsmb")
    
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    return db

async def create_users():
    """Create sample users"""
    db = await connect_to_mongo()
    
    # Create a test user for each role
    users = [
        {
            "email": "seller@test.com",
            "hashed_password": pwd_context.hash("password123"),
            "user_type": "SELLER",
            "display_name": "Sample Seller",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "completed_onboarding": True
        },
        {
            "email": "buyer@test.com",
            "hashed_password": pwd_context.hash("password123"),
            "user_type": "BUYER",
            "display_name": "Sample Buyer",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "completed_onboarding": True
        },
        {
            "email": "investor@test.com",
            "hashed_password": pwd_context.hash("password123"),
            "user_type": "INVESTOR",
            "display_name": "Sample Investor",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "completed_onboarding": True
        }
    ]
    
    # Check if users already exist
    existing_count = await db.profiles.count_documents({})
    if existing_count > 0:
        logger.info(f"Found {existing_count} existing users, skipping user creation")
        
        # Get the seller ID for listing creation
        seller = await db.profiles.find_one({"user_type": "SELLER"})
        return seller['_id'] if seller else None
    
    # Insert users
    user_ids = []
    for user in users:
        result = await db.profiles.insert_one(user)
        user_ids.append(result.inserted_id)
        logger.info(f"Created user: {user['email']} with ID: {result.inserted_id}")
    
    # Return the seller ID for listing creation
    return user_ids[0]

async def create_listings(seller_id):
    """Create sample business listings"""
    db = await connect_to_mongo()
    
    # Check if listings already exist
    existing_count = await db.business_listings.count_documents({})
    if existing_count > 0:
        logger.info(f"Found {existing_count} existing listings, skipping listing creation")
        return
    
    # Create sample listings
    listings = []
    for i in range(10):
        # Generate random business data
        annual_revenue = random.randint(200000, 5000000)
        annual_profit = int(annual_revenue * random.uniform(0.1, 0.3))
        asking_price = int(annual_profit * random.uniform(2.5, 4.5))
        employees = random.randint(2, 50)
        years_in_business = random.randint(3, 20)
        
        # Decide if listing has crowdfunding
        has_funding = random.choice([True, False])
        funding_target = int(asking_price * 0.6) if has_funding else None
        funding_raised = int(funding_target * random.uniform(0.1, 0.9)) if funding_target else 0
        
        # Determine status
        status_choices = ["active", "draft", "under_loi"]
        status_weights = [0.7, 0.2, 0.1]
        status = random.choices(status_choices, status_weights)[0]
        
        business_name = f"{random.choice(business_name_prefixes)} {random.choice(business_name_suffixes)}"
        
        listing = {
            "seller_id": seller_id,
            "title": business_name,
            "industry": random.choice(industries),
            "location": random.choice(locations),
            "description": random.choice(business_descriptions),
            "annual_revenue": annual_revenue,
            "annual_profit": annual_profit,
            "asking_price": asking_price,
            "employees_count": employees,
            "years_in_business": years_in_business,
            "reason_for_selling": random.choice(reasons_for_selling),
            "status": status,
            "created_at": datetime.utcnow() - timedelta(days=random.randint(1, 60)),
            "updated_at": datetime.utcnow(),
            "funding_target": funding_target,
            "funding_raised": funding_raised,
            "under_loi": status == "under_loi",
            "investor_count": random.randint(3, 20) if funding_raised > 0 else 0,
            "funding_end_date": datetime.utcnow() + timedelta(days=random.randint(10, 90)) if funding_target else None,
            "cover_image_url": f"https://images.unsplash.com/photo-{random.randint(1550000000, 1580000000)}-{random.randint(1000000000, 9999999999)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80"
        }
        
        listings.append(listing)
    
    # Insert listings
    result = await db.business_listings.insert_many(listings)
    logger.info(f"Created {len(result.inserted_ids)} business listings")
    
    # Return first listing ID for investment and offer creation
    return result.inserted_ids[0] if result.inserted_ids else None

async def create_investments_and_offers(listing_id):
    """Create sample investments and offers"""
    if not listing_id:
        logger.warning("No listing ID provided, skipping investment and offer creation")
        return
    
    db = await connect_to_mongo()
    
    # Get investor and buyer IDs
    investor = await db.profiles.find_one({"user_type": "INVESTOR"})
    buyer = await db.profiles.find_one({"user_type": "BUYER"})
    
    if not investor or not buyer:
        logger.warning("Could not find investor or buyer profiles")
        return
    
    # Check if investments already exist
    existing_investments = await db.investments.count_documents({})
    if existing_investments == 0 and investor:
        # Create a sample investment
        investment = {
            "business_id": listing_id,
            "investor_id": investor['_id'],
            "amount": 25000,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
        
        result = await db.investments.insert_one(investment)
        logger.info(f"Created investment with ID: {result.inserted_id}")
    else:
        logger.info(f"Found {existing_investments} existing investments, skipping creation")
    
    # Check if offers already exist
    existing_offers = await db.offers.count_documents({})
    if existing_offers == 0 and buyer:
        # Create a sample offer
        offer = {
            "business_id": listing_id,
            "buyer_id": buyer['_id'],
            "offer_amount": 950000,
            "down_payment": 250000,
            "financing_terms": "bank_financing",
            "contingencies": ["due_diligence", "financing", "inventory_review"],
            "closing_timeline": 60,
            "additional_notes": "Interested in discussing seller financing options as well.",
            "status": "pending",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
        
        result = await db.offers.insert_one(offer)
        logger.info(f"Created offer with ID: {result.inserted_id}")
    else:
        logger.info(f"Found {existing_offers} existing offers, skipping creation")

async def main():
    """Main function to create sample data"""
    try:
        logger.info("Starting data seeding process")
        
        # Create users
        seller_id = await create_users()
        
        # Create listings
        listing_id = await create_listings(seller_id)
        
        # Create investments and offers
        await create_investments_and_offers(listing_id)
        
        logger.info("Data seeding completed successfully")
    
    except Exception as e:
        logger.error(f"Error seeding data: {str(e)}")
    
if __name__ == "__main__":
    asyncio.run(main())
