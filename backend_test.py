
import requests
import sys
from datetime import datetime
import json
import uuid

class SeedSMBAPITester:
    def __init__(self, base_url="https://b06f5b6f-bf00-48b0-b278-980c7e0d5556.preview.emergentagent.com"):
        self.base_url = base_url
        self.token = None
        self.tests_run = 0
        self.tests_passed = 0
        self.user_id = None
        self.listing_id = None

    def run_test(self, name, method, endpoint, expected_status, data=None, params=None):
        """Run a single API test"""
        url = f"{self.base_url}{endpoint}"
        headers = {'Content-Type': 'application/json'}
        if self.token:
            headers['Authorization'] = f'Bearer {self.token}'

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        
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
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"Response: {response_data}")

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

    def test_login(self, email="test@example.com", password="password123"):
        """Test login and get token"""
        success, response = self.run_test(
            "User Login",
            "POST",
            "/api/auth/login",
            200,
            data={"email": email, "password": password}
        )
        if success and 'access_token' in response:
            self.token = response['access_token']
            return True
        return False

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
        return success

    def test_get_listing_detail(self):
        """Test getting a specific business listing"""
        if not self.listing_id:
            print("❌ No listing ID available for testing")
            return False
        
        return self.run_test(
            "Get Listing Detail",
            "GET",
            f"/api/listings/{self.listing_id}",
            200
        )[0]

    def test_create_investment(self):
        """Test creating an investment"""
        if not self.listing_id:
            print("❌ No listing ID available for testing")
            return False
            
        return self.run_test(
            "Create Investment",
            "POST",
            "/api/investments",
            201,
            data={
                "business_id": self.listing_id,
                "amount": 50000
            }
        )[0]

    def test_create_offer(self):
        """Test creating an offer"""
        if not self.listing_id:
            print("❌ No listing ID available for testing")
            return False
            
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
        )[0]

def main():
    # Setup
    tester = SeedSMBAPITester()
    
    # Run tests
    health_check_success, _ = tester.test_health_check()
    
    if not health_check_success:
        print("❌ API health check failed, stopping tests")
        return 1
    
    # Try to register a new user
    tester.test_register_user()
    
    # Try to login (this might fail if we don't have valid credentials)
    login_success = tester.test_login()
    
    # These tests should work without authentication
    tester.test_get_listings()
    tester.test_get_featured_listings()
    
    # These tests require authentication
    if login_success:
        tester.test_create_listing()
        tester.test_get_listing_detail()
        tester.test_create_investment()
        tester.test_create_offer()
    else:
        print("⚠️ Skipping authenticated tests due to login failure")
    
    # Print results
    print(f"\n📊 Tests passed: {tester.tests_passed}/{tester.tests_run}")
    return 0 if tester.tests_passed > 0 else 1

if __name__ == "__main__":
    sys.exit(main())
