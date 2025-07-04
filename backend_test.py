
import requests
import sys
from datetime import datetime
import json
import uuid
import os

class SeedSMBAPITester:
    def __init__(self, base_url=None):
        # Use the environment variable from frontend/.env
        if not base_url:
            with open('/app/frontend/.env', 'r') as f:
                for line in f:
                    if line.startswith('REACT_APP_BACKEND_URL='):
                        base_url = line.strip().split('=')[1]
                        break
        
        self.base_url = base_url
        self.token = None
        self.tests_run = 0
        self.tests_passed = 0
        self.user_id = None
        self.listing_id = None
        
        print(f"Using backend URL: {self.base_url}")

    def run_test(self, name, method, endpoint, expected_status, data=None, params=None):
        """Run a single API test"""
        url = f"{self.base_url}{endpoint}"
        headers = {'Content-Type': 'application/json'}
        if self.token:
            headers['Authorization'] = f'Bearer {self.token}'
            print(f"Using token: {self.token[:20]}...")
            print(f"Full token length: {len(self.token)}")

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, params=params)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers)

            success = response.status_code == expected_status
            
            try:
                response_data = response.json() if response.text else {}
            except json.JSONDecodeError:
                response_data = {"text": response.text}
            
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                if response_data:
                    print(f"Response preview: {str(response_data)[:200]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"Response: {response_data}")
                print(f"Headers sent: {headers}")
                
                # Try to get more detailed error information
                if response.status_code == 500:
                    print("Internal Server Error - This could be due to a database connection issue or code error")
                    print("Check the server logs for more details")
                elif response.status_code == 401:
                    print("Unauthorized - This could be due to an invalid or expired token")
                    print("Token validation details:", self.token[:30] + "..." if self.token else "No token")

            return success, response_data

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_health_check(self):
        """Test API health check endpoint"""
        return self.run_test(
            "API Health Check",
            "GET",
            "/api/",
            200
        )

    def test_register_user(self):
        """Test user registration"""
        test_email = f"test_user_{uuid.uuid4()}@example.com"
        return self.run_test(
            "User Registration",
            "POST",
            "/api/auth/register",
            201,
            data={
                "email": test_email,
                "password": "TestPass123!",
                "user_type": "SELLER"
            }
        )

    def test_login(self, email=None, password=None):
        """Test login and get token"""
        # If no credentials provided, use mock credentials
        if not email or not password:
            # Use one of the mock users from auth_supabase.py
            email = "admin@seedsmb.com"
            password = "password123"
        
        success, response = self.run_test(
            "User Login",
            "POST",
            "/api/auth/login",
            200,
            data={"email": email, "password": password}
        )
        if success and 'access_token' in response:
            self.token = response['access_token']
            
            # Try to extract user_id from token
            import jwt
            try:
                # Decode token without verification
                decoded = jwt.decode(self.token, options={"verify_signature": False})
                if 'sub' in decoded:
                    self.user_id = decoded['sub']
                    print(f"Extracted user_id from token: {self.user_id}")
            except Exception as e:
                print(f"Could not decode token: {e}")
                
            return True
        return False

    def test_get_profile(self):
        """Test getting user profile"""
        if not self.user_id:
            print("❌ No user ID available for testing")
            return False
            
        return self.run_test(
            "Get User Profile",
            "GET",
            f"/api/profiles/{self.user_id}",
            200
        )

    def test_get_current_user(self):
        """Test getting current user profile"""
        if not self.token:
            print("❌ No token available for testing")
            return False
            
        return self.run_test(
            "Get Current User",
            "GET",
            "/api/auth/me",
            200
        )
    def test_get_listings(self):
        """Test getting business listings"""
        return self.run_test(
            "Get Business Listings",
            "GET",
            "/api/listings",
            200
        )

    def test_get_featured_listings(self):
        """Test getting featured business listings"""
        return self.run_test(
            "Get Featured Listings",
            "GET",
            "/api/listings/featured",
            200
        )

    def test_create_listing(self):
        """Test creating a business listing"""
        success, response = self.run_test(
            "Create Business Listing",
            "POST",
            "/api/listings",
            201,
            data={
                "title": f"Test Business {uuid.uuid4()}",
                "industry": "Technology",
                "location": "San Francisco, CA",
                "description": "A test business listing",
                "annual_revenue": 500000,
                "annual_profit": 100000,
                "asking_price": 1000000,
                "employees_count": 10,
                "years_in_business": 5,
                "reason_for_selling": "Retirement",
                "funding_target": 500000
            }
        )
        if success and 'id' in response:
            self.listing_id = response['id']
        return success, response

    def test_get_listing_detail(self, listing_id=None):
        """Test getting a specific business listing"""
        if not listing_id and not self.listing_id:
            # Try to get a listing ID from the listings endpoint
            success, response = self.test_get_listings()
            if success and response and 'listings' in response and len(response['listings']) > 0:
                listing_id = response['listings'][0]['id']
            else:
                print("❌ No listing ID available for testing")
                return False, {}
        
        listing_id = listing_id or self.listing_id
        return self.run_test(
            "Get Listing Detail",
            "GET",
            f"/api/listings/{listing_id}",
            200
        )

    def test_create_investment(self):
        """Test creating an investment"""
        if not self.listing_id:
            print("❌ No listing ID available for testing")
            return False, {}
            
        return self.run_test(
            "Create Investment",
            "POST",
            "/api/investments",
            201,
            data={
                "business_id": self.listing_id,
                "amount": 50000
            }
        )

    def test_create_offer(self):
        """Test creating an offer"""
        if not self.listing_id:
            print("❌ No listing ID available for testing")
            return False, {}
            
        return self.run_test(
            "Create Offer",
            "POST",
            "/api/offers",
            201,
            data={
                "business_id": self.listing_id,
                "offer_amount": 950000,
                "down_payment": 200000,
                "financing_terms": "BANK_FINANCING",
                "contingencies": ["Due diligence", "Financing approval"],
                "closing_timeline": 90,
                "additional_notes": "Test offer"
            }
        )
        
    def test_get_deals(self):
        """Test getting deals"""
        return self.run_test(
            "Get Deals",
            "GET",
            "/api/deals/",
            200
        )
        
    def test_get_investments(self):
        """Test getting investments"""
        return self.run_test(
            "Get Investments",
            "GET",
            "/api/investments",
            200
        )
        
    def test_get_offers(self):
        """Test getting offers"""
        return self.run_test(
            "Get Offers",
            "GET",
            "/api/offers",
            200
        )

def main():
    # Setup
    tester = SeedSMBAPITester()
    
    # Run tests
    print("\n===== TESTING SEEDSMB API (SUPABASE MIGRATION) =====\n")
    
    # Test API health
    health_check_success, health_data = tester.test_health_check()
    
    if not health_check_success:
        print("❌ API health check failed, stopping tests")
        return 1
    
    # Test public endpoints
    print("\n===== TESTING PUBLIC ENDPOINTS =====\n")
    
    listings_success, listings_data = tester.test_get_listings()
    featured_success, featured_data = tester.test_get_featured_listings()
    
    # Try to get a specific listing if available
    if listings_success and 'listings' in listings_data and len(listings_data['listings']) > 0:
        listing_id = listings_data['listings'][0]['id']
        tester.test_get_listing_detail(listing_id)
    
    # Test authentication
    print("\n===== TESTING AUTHENTICATION =====\n")
    
    # Try to register a new user
    register_success, register_data = tester.test_register_user()
    
    # Try to login
    if register_success and 'email' in register_data:
        login_success = tester.test_login(register_data['email'], "TestPass123!")
    else:
        # Try with mock credentials
        login_success = tester.test_login("admin@seedsmb.com", "password123")
    
    # Test authenticated endpoints
    if login_success:
        print("\n===== TESTING AUTHENTICATED ENDPOINTS =====\n")
        
        # Test current user endpoint
        tester.test_get_current_user()
        
        # Test profile
        if tester.user_id:
            tester.test_get_profile()
        
        # Test other endpoints
        tester.test_get_deals()
        tester.test_get_investments()
        tester.test_get_offers()
        
        # Test creating a listing
        create_success, create_data = tester.test_create_listing()
        
        if create_success:
            # Test getting the created listing
            tester.test_get_listing_detail()
            
            # Test investments and offers
            tester.test_create_investment()
            tester.test_create_offer()
    else:
        print("⚠️ Skipping authenticated tests due to login failure")
    
    # Print results
    print(f"\n===== TEST RESULTS =====")
    print(f"📊 Tests passed: {tester.tests_passed}/{tester.tests_run} ({tester.tests_passed/tester.tests_run*100:.1f}%)")
    
    return 0 if tester.tests_passed > 0 else 1

if __name__ == "__main__":
    sys.exit(main())
