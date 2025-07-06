import requests
import sys
import json
import uuid

def test_auth_direct():
    """
    Test authentication directly with the API
    """
    base_url = "https://59f7432c-ced4-45ce-b421-129e4da62a98.preview.emergentagent.com"
    
    # Register a new user
    test_email = f"test_user_{uuid.uuid4()}@example.com"
    test_password = "TestPass123!"
    
    register_data = {
        "email": test_email,
        "password": test_password,
        "user_type": "INVESTOR"
    }
    
    print(f"Registering user: {test_email}")
    register_response = requests.post(
        f"{base_url}/api/auth/register",
        json=register_data
    )
    
    if register_response.status_code != 201:
        print(f"Registration failed: {register_response.status_code}")
        print(register_response.text)
        return
    
    print(f"Registration successful: {register_response.status_code}")
    
    # Login with the new user
    login_data = {
        "email": test_email,
        "password": test_password
    }
    
    print(f"Logging in with: {test_email}")
    login_response = requests.post(
        f"{base_url}/api/auth/login",
        json=login_data
    )
    
    if login_response.status_code != 200:
        print(f"Login failed: {login_response.status_code}")
        print(login_response.text)
        return
    
    print(f"Login successful: {login_response.status_code}")
    
    # Get the token
    token = login_response.json()["access_token"]
    print(f"Token: {token[:30]}...")
    
    # Test the /api/auth/me endpoint
    headers = {"Authorization": f"Bearer {token}"}
    me_response = requests.get(
        f"{base_url}/api/auth/me",
        headers=headers
    )
    
    if me_response.status_code != 200:
        print(f"Get me failed: {me_response.status_code}")
        print(me_response.text)
        return
    
    print(f"Get me successful: {me_response.status_code}")
    
    # Test the /api/listings endpoint
    listings_response = requests.get(
        f"{base_url}/api/listings/",
        headers=headers
    )
    
    if listings_response.status_code != 200:
        print(f"Get listings failed: {listings_response.status_code}")
        print(listings_response.text)
    else:
        print(f"Get listings successful: {listings_response.status_code}")
    
    # Test the /api/investments endpoint
    investments_response = requests.get(
        f"{base_url}/api/investments/",
        headers=headers
    )
    
    if investments_response.status_code != 200:
        print(f"Get investments failed: {investments_response.status_code}")
        print(investments_response.text)
    else:
        print(f"Get investments successful: {investments_response.status_code}")
    
    # Test the /api/offers endpoint
    offers_response = requests.get(
        f"{base_url}/api/offers/",
        headers=headers
    )
    
    if offers_response.status_code != 200:
        print(f"Get offers failed: {offers_response.status_code}")
        print(offers_response.text)
    else:
        print(f"Get offers successful: {offers_response.status_code}")
    
    # Test the /api/seedstack/deals endpoint
    seedstack_response = requests.get(
        f"{base_url}/api/seedstack/deals",
        headers=headers
    )
    
    if seedstack_response.status_code != 200:
        print(f"Get seedstack deals failed: {seedstack_response.status_code}")
        print(seedstack_response.text)
    else:
        print(f"Get seedstack deals successful: {seedstack_response.status_code}")

if __name__ == "__main__":
    test_auth_direct()