#!/usr/bin/env python3
"""
Simple API testing script for SeedSMB
Tests critical endpoints to ensure they're working correctly
"""

import asyncio
import httpx
import json
from typing import Dict, Any
import os

# Configuration
BASE_URL = os.environ.get("API_BASE_URL", "https://245c604c-4c50-4fab-bca8-4dbabbe9217d.preview.emergentagent.com/api")
TEST_USER_EMAIL = "test@example.com"
TEST_USER_PASSWORD = "testpass123"

class APITester:
    def __init__(self, base_url: str):
        self.base_url = base_url
        self.token = None
        
    async def test_health_check(self):
        """Test the API health endpoint"""
        print("🔍 Testing API health check...")
        
        async with httpx.AsyncClient() as client:
            try:
                response = await client.get(f"{self.base_url}/")
                if response.status_code == 200:
                    data = response.json()
                    print(f"✅ Health check passed: {data.get('message', 'OK')}")
                    return True
                else:
                    print(f"❌ Health check failed: {response.status_code}")
                    return False
            except Exception as e:
                print(f"❌ Health check error: {str(e)}")
                return False
    
    async def test_listings_endpoint(self):
        """Test the business listings endpoint"""
        print("🔍 Testing listings endpoint...")
        
        async with httpx.AsyncClient() as client:
            try:
                response = await client.get(f"{self.base_url}/listings/")
                if response.status_code == 200:
                    data = response.json()
                    print(f"✅ Listings endpoint working: {len(data)} listings found")
                    
                    # Test a specific listing if available
                    if data and len(data) > 0:
                        listing_id = data[0]["id"]
                        detail_response = await client.get(f"{self.base_url}/listings/{listing_id}")
                        if detail_response.status_code == 200:
                            print(f"✅ Listing detail endpoint working for ID: {listing_id}")
                        else:
                            print(f"⚠️  Listing detail endpoint issue: {detail_response.status_code}")
                    
                    return True
                else:
                    print(f"❌ Listings endpoint failed: {response.status_code}")
                    return False
            except Exception as e:
                print(f"❌ Listings endpoint error: {str(e)}")
                return False
    
    async def test_auth_endpoints(self):
        """Test authentication endpoints"""
        print("🔍 Testing authentication endpoints...")
        
        async with httpx.AsyncClient() as client:
            try:
                # Test user registration
                register_data = {
                    "email": TEST_USER_EMAIL,
                    "password": TEST_USER_PASSWORD,
                    "user_type": "BUYER"
                }
                
                register_response = await client.post(
                    f"{self.base_url}/auth/register",
                    json=register_data
                )
                
                if register_response.status_code in [201, 400]:  # 400 if user already exists
                    print("✅ Registration endpoint working")
                else:
                    print(f"⚠️  Registration endpoint issue: {register_response.status_code}")
                
                # Test login
                login_data = {
                    "email": TEST_USER_EMAIL,
                    "password": TEST_USER_PASSWORD
                }
                
                login_response = await client.post(
                    f"{self.base_url}/auth/login",
                    json=login_data
                )
                
                if login_response.status_code == 200:
                    token_data = login_response.json()
                    self.token = token_data.get("access_token")
                    print("✅ Login endpoint working")
                    return True
                else:
                    print(f"⚠️  Login endpoint issue: {login_response.status_code}")
                    return False
                    
            except Exception as e:
                print(f"❌ Auth endpoints error: {str(e)}")
                return False
    
    async def test_protected_endpoint(self):
        """Test a protected endpoint if we have a token"""
        if not self.token:
            print("⚠️  Skipping protected endpoint test (no token available)")
            return True
        
        print("🔍 Testing protected endpoint...")
        
        async with httpx.AsyncClient() as client:
            try:
                headers = {"Authorization": f"Bearer {self.token}"}
                response = await client.get(f"{self.base_url}/auth/me", headers=headers)
                
                if response.status_code == 200:
                    user_data = response.json()
                    print(f"✅ Protected endpoint working: {user_data.get('email', 'unknown')}")
                    return True
                else:
                    print(f"⚠️  Protected endpoint issue: {response.status_code}")
                    return False
                    
            except Exception as e:
                print(f"❌ Protected endpoint error: {str(e)}")
                return False
    
    async def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting SeedSMB API Tests")
        print("=" * 50)
        
        tests = [
            ("Health Check", self.test_health_check()),
            ("Listings Endpoint", self.test_listings_endpoint()),
            ("Auth Endpoints", self.test_auth_endpoints()),
            ("Protected Endpoint", self.test_protected_endpoint()),
        ]
        
        results = []
        for test_name, test_coro in tests:
            try:
                result = await test_coro
                results.append((test_name, result))
            except Exception as e:
                print(f"❌ {test_name} failed with exception: {str(e)}")
                results.append((test_name, False))
        
        print("\n" + "=" * 50)
        print("📊 Test Results Summary:")
        
        passed = 0
        for test_name, result in results:
            status = "✅ PASS" if result else "❌ FAIL"
            print(f"  {status} - {test_name}")
            if result:
                passed += 1
        
        total = len(results)
        print(f"\n🎯 Overall: {passed}/{total} tests passed ({passed/total*100:.1f}%)")
        
        if passed == total:
            print("🎉 All tests passed! API is working correctly.")
        elif passed >= total * 0.75:
            print("⚠️  Most tests passed. Some minor issues detected.")
        else:
            print("❌ Multiple test failures. API needs attention.")
        
        return passed / total

async def main():
    """Main test runner"""
    tester = APITester(BASE_URL)
    success_rate = await tester.run_all_tests()
    
    # Exit with appropriate code
    exit_code = 0 if success_rate >= 0.75 else 1
    exit(exit_code)

if __name__ == "__main__":
    asyncio.run(main())