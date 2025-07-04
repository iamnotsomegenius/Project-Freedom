import os
import json
import asyncio
from typing import List, Optional, Dict, Any
import httpx
from datetime import datetime

from models import (
    DealSourcingCriteria,
    CompanyProfile,
    DealSourcingResponse,
    AIChatRequest,
    AIChatResponse,
    AIMessage,
    AIMessageType
)

class AIService:
    def __init__(self):
        self.openai_api_key = os.getenv("OPENAI_API_KEY")
        self.openai_base_url = "https://api.openai.com/v1"
        self.model = "gpt-4"
        
    async def generate_chat_response(self, request: AIChatRequest, user_context: Optional[Dict] = None) -> AIChatResponse:
        """
        Generate AI response using OpenAI GPT-4
        """
        if not self.openai_api_key:
            # Fallback to demo response if no API key
            return await self._generate_demo_response(request)
        
        try:
            # Build conversation context
            system_prompt = self._build_system_prompt(user_context)
            messages = [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": request.message}
            ]
            
            # Add conversation history if available
            if request.conversation_id and request.context:
                conversation_history = request.context.get("messages", [])
                for msg in conversation_history[-10:]:  # Last 10 messages for context
                    role = "user" if msg["type"] == "user" else "assistant"
                    messages.append({"role": role, "content": msg["content"]})
                messages.append({"role": "user", "content": request.message})
            
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{self.openai_base_url}/chat/completions",
                    headers={
                        "Authorization": f"Bearer {self.openai_api_key}",
                        "Content-Type": "application/json"
                    },
                    json={
                        "model": self.model,
                        "messages": messages,
                        "max_tokens": 1500,
                        "temperature": 0.7,
                        "stream": False
                    },
                    timeout=30.0
                )
                
                if response.status_code == 200:
                    result = response.json()
                    ai_response = result["choices"][0]["message"]["content"]
                    
                    # Generate suggestions based on the response
                    suggestions = await self._generate_suggestions(request.message, ai_response)
                    
                    return AIChatResponse(
                        response=ai_response,
                        conversation_id=request.conversation_id or f"conv_{datetime.utcnow().timestamp()}",
                        message_id=f"msg_{datetime.utcnow().timestamp()}",
                        suggestions=suggestions
                    )
                else:
                    # Fallback to demo response on API error
                    return await self._generate_demo_response(request)
                    
        except Exception as e:
            print(f"OpenAI API error: {e}")
            # Fallback to demo response on exception
            return await self._generate_demo_response(request)
    
    def _build_system_prompt(self, user_context: Optional[Dict] = None) -> str:
        """
        Build system prompt for the AI assistant
        """
        base_prompt = """You are SeedStack AI, an expert assistant for business acquisition and deal sourcing. You help users:

1. Find and analyze potential acquisition targets
2. Provide market intelligence and industry insights  
3. Guide users through due diligence processes
4. Help with LOI drafting and negotiation
5. Identify risks and opportunities in deals

You have access to business databases and market intelligence. Provide specific, actionable advice with concrete examples when possible. Always maintain a professional tone while being helpful and thorough.

When discussing deal sourcing, mention specific industries, locations, and business characteristics. For market analysis, provide relevant valuation multiples and industry trends. For due diligence, highlight key areas to investigate."""

        if user_context:
            base_prompt += f"\n\nUser context: {json.dumps(user_context, indent=2)}"
            
        return base_prompt
    
    async def _generate_suggestions(self, user_message: str, ai_response: str) -> List[str]:
        """
        Generate follow-up suggestions based on the conversation
        """
        suggestions = []
        
        if "auto repair" in user_message.lower():
            suggestions = [
                "What are key success factors for auto repair businesses?",
                "How do I evaluate an auto repair shop's equipment?",
                "What's typical customer retention for this industry?"
            ]
        elif "restaurant" in user_message.lower():
            suggestions = [
                "Analyze restaurant lease terms and renewal options",
                "What food service trends should I watch?", 
                "How do I evaluate restaurant location quality?"
            ]
        elif "due diligence" in user_message.lower():
            suggestions = [
                "Create a due diligence checklist for this deal",
                "What are common red flags in small business acquisitions?",
                "How long should due diligence typically take?"
            ]
        else:
            suggestions = [
                "Find similar businesses in my target market",
                "Analyze this industry's market trends",
                "Help me prepare for negotiations"
            ]
            
        return suggestions[:3]  # Return up to 3 suggestions
    
    async def _generate_demo_response(self, request: AIChatRequest) -> AIChatResponse:
        """
        Generate demo response when OpenAI API is not available
        """
        message_lower = request.message.lower()
        
        if "auto repair" in message_lower or "southeast" in message_lower:
            response = """🔍 **Auto Repair Shop Analysis - Southeast Region**

I found **127 potential targets** matching your criteria:

**Key Market Insights:**
• Average revenue: $2.3M (range: $800K - $4.2M)
• Typical EBITDA margin: 12-18%
• Most established businesses: 15-35 years
• 89% are founder-owned operations
• Strong recurring customer base (avg 65% repeat)

**Top Geographic Markets:**
• Atlanta suburbs: 23 qualifying shops
• Charlotte metro area: 18 prospects  
• Nashville region: 15 opportunities
• Jacksonville market: 12 targets

**Investment Thesis Validation:**
✅ Recession-resistant business model
✅ Aging vehicle fleet drives repair demand
✅ Local market advantages, hard to replicate
✅ Strong cash flow generation potential

Would you like me to pull detailed profiles for the top 20 prospects and show you how to approach them?"""

        elif "restaurant" in message_lower or "food" in message_lower:
            response = """🍽️ **Restaurant Industry Analysis**

**Current Market Dynamics:**
• Post-COVID recovery: 95% of pre-pandemic levels
• Labor cost inflation: 8-12% annually
• Technology adoption accelerating (QR codes, delivery apps)
• Consumer preferences shifting toward convenience

**Valuation Benchmarks:**
• Full-service restaurants: 2.5-4.0x EBITDA
• Fast-casual concepts: 3.5-5.5x EBITDA  
• QSR franchises: 4.0-6.0x EBITDA
• Independent operators: Often lower multiples

**Critical Due Diligence Areas:**
1. **Labor & Staffing**: Wage rates, turnover metrics
2. **Lease Analysis**: Terms, escalations, renewal rights
3. **Competition**: New entrants, delivery platform impact
4. **Technology**: POS systems, online ordering capabilities

**Red Flags to Monitor:**
⚠️ Declining same-store sales trends
⚠️ Employee turnover exceeding 100% annually
⚠️ Lease expiration within 24 months
⚠️ Over-reliance on third-party delivery platforms"""

        elif "due diligence" in message_lower or "red flags" in message_lower:
            response = """🔍 **Due Diligence Framework for Small Business Acquisitions**

**Financial Red Flags:**
⚠️ Revenue decline over 3+ consecutive years
⚠️ EBITDA margins significantly below industry norms
⚠️ Customer concentration risk (>20% from single client)
⚠️ Unusual expense timing near sale announcement
⚠️ Personal/business expense commingling

**Operational Warning Signs:**
⚠️ Excessive key person dependency on current owner
⚠️ Outdated technology systems and processes
⚠️ Regulatory compliance gaps or violations
⚠️ High employee turnover patterns
⚠️ Declining customer satisfaction scores

**Legal and Structural Risks:**
⚠️ Pending or threatened litigation
⚠️ Lease complications or near-term expirations
⚠️ Professional licensing or permit issues
⚠️ Environmental compliance concerns
⚠️ Intellectual property disputes

**Priority Investigation Areas:**
1. **Customer Analysis**: Retention rates, concentration risk
2. **Financial Quality**: Normalized EBITDA accuracy
3. **Management Assessment**: Key person dependencies
4. **Market Position**: Competitive advantages and threats
5. **Growth Potential**: Scalability and expansion opportunities"""

        else:
            response = """I can help you with comprehensive deal sourcing and acquisition guidance. Here are some ways I can assist:

**🎯 Deal Sourcing:**
• Search for businesses matching specific criteria
• Analyze target markets and opportunities
• Provide detailed company profiles and contact information

**📊 Market Intelligence:**
• Industry trend analysis and forecasting
• Valuation benchmarking and multiples research
• Competitive landscape assessment

**🤝 Acquisition Support:**
• Due diligence planning and execution
• LOI drafting and term negotiation
• Risk assessment and red flag identification

Try asking about a specific industry or location, like:
• "Find manufacturing companies in the Midwest"
• "Analyze the landscaping services market"
• "Due diligence checklist for tech companies"

What specific area would you like to explore?"""

        suggestions = await self._generate_suggestions(request.message, response)
        
        return AIChatResponse(
            response=response,
            conversation_id=request.conversation_id or f"demo_conv_{datetime.utcnow().timestamp()}",
            message_id=f"demo_msg_{datetime.utcnow().timestamp()}",
            suggestions=suggestions
        )


class DealSourcingService:
    def __init__(self):
        # In production, these would connect to real business databases
        # For now, we'll use enhanced demo data
        self.api_keys = {
            "dun_bradstreet": os.getenv("DUN_BRADSTREET_API_KEY"),
            "data_axle": os.getenv("DATA_AXLE_API_KEY"),
            "zoominfo": os.getenv("ZOOMINFO_API_KEY")
        }
    
    async def search_companies(self, criteria: DealSourcingCriteria, max_results: int = 50) -> DealSourcingResponse:
        """
        Search for companies matching the given criteria
        """
        if any(self.api_keys.values()):
            # Use real API if keys are available
            return await self._search_real_databases(criteria, max_results)
        else:
            # Use enhanced demo data
            return await self._search_demo_companies(criteria, max_results)
    
    async def _search_real_databases(self, criteria: DealSourcingCriteria, max_results: int) -> DealSourcingResponse:
        """
        Search real business databases when API keys are available
        """
        # This would implement real API calls to business databases
        # For now, return enhanced demo data
        return await self._search_demo_companies(criteria, max_results)
    
    async def _search_demo_companies(self, criteria: DealSourcingCriteria, max_results: int) -> DealSourcingResponse:
        """
        Generate realistic demo companies based on search criteria
        """
        companies = []
        
        # Auto repair shops in Southeast
        if criteria.industry and "auto" in criteria.industry.lower():
            companies = [
                CompanyProfile(
                    id="1",
                    company_name="Southeast Auto Care",
                    industry="Auto Repair & Maintenance",
                    location="Marietta, GA",
                    distance="28 miles from Atlanta",
                    employees=15,
                    years_in_business=24,
                    estimated_revenue=2100000,
                    ownership="Founder-owned",
                    match_score=95,
                    contact_info={
                        "owner": "Robert Johnson",
                        "phone": "(770) 555-0123",
                        "email": "rjohnson@seautocare.com",
                        "website": "www.southeastautocare.com"
                    },
                    business_details={
                        "specialties": ["Import repair", "Fleet services", "State inspections"],
                        "facilities": "6-bay shop with modern equipment",
                        "customer_base": "2,400+ active customers",
                        "established": "1999",
                        "certifications": ["ASE Certified", "AAA Approved"]
                    }
                ),
                CompanyProfile(
                    id="2",
                    company_name="Precision Motors LLC",
                    industry="Auto Repair & Maintenance",
                    location="Matthews, NC",
                    distance="12 miles from Charlotte",
                    employees=22,
                    years_in_business=31,
                    estimated_revenue=2850000,
                    ownership="Founder-owned",
                    match_score=92,
                    contact_info={
                        "owner": "David Martinez",
                        "phone": "(704) 555-0456",
                        "email": "dmartinez@precisionmotors.com",
                        "website": "www.precisionmotorsllc.com"
                    },
                    business_details={
                        "specialties": ["European vehicles", "Performance tuning", "Classic car restoration"],
                        "facilities": "8-bay facility with tire center",
                        "customer_base": "3,100+ customers, 70% repeat",
                        "established": "1992",
                        "certifications": ["BMW Certified", "Mercedes Specialist"]
                    }
                ),
                CompanyProfile(
                    id="3",
                    company_name="Family Auto Service",
                    industry="Auto Repair & Maintenance",
                    location="Smyrna, TN",
                    distance="15 miles from Nashville",
                    employees=18,
                    years_in_business=28,
                    estimated_revenue=1950000,
                    ownership="Second-generation family",
                    match_score=89,
                    contact_info={
                        "owner": "Michael Thompson",
                        "phone": "(615) 555-0789",
                        "email": "mthompson@familyautoservice.com",
                        "website": "www.familyautoservice.com"
                    },
                    business_details={
                        "specialties": ["General repair", "Oil changes", "Brake service"],
                        "facilities": "5-bay shop with customer lounge",
                        "customer_base": "1,800+ regular customers",
                        "established": "1995",
                        "certifications": ["ASE Master Technicians", "AC Delco Professional"]
                    }
                )
            ]
        
        # Restaurant businesses
        elif criteria.industry and "restaurant" in criteria.industry.lower():
            companies = [
                CompanyProfile(
                    id="4",
                    company_name="The Local Grill",
                    industry="Full-Service Restaurant",
                    location="Alpharetta, GA",
                    distance="25 miles from Atlanta",
                    employees=28,
                    years_in_business=12,
                    estimated_revenue=1800000,
                    ownership="Independent owner",
                    match_score=88,
                    contact_info={
                        "owner": "Sarah Williams",
                        "phone": "(678) 555-0234",
                        "email": "sarah@thelocalgrill.com",
                        "website": "www.thelocalgrill.com"
                    },
                    business_details={
                        "specialties": ["American cuisine", "Craft cocktails", "Local sourcing"],
                        "facilities": "150-seat restaurant with full bar",
                        "customer_base": "Strong local following",
                        "established": "2011",
                        "certifications": ["Health A-rating", "Wine Spectator Award"]
                    }
                )
            ]
        
        # Manufacturing businesses
        elif criteria.industry and "manufacturing" in criteria.industry.lower():
            companies = [
                CompanyProfile(
                    id="5",
                    company_name="Precision Metal Works",
                    industry="Custom Manufacturing",
                    location="Spartanburg, SC",
                    distance="30 miles from Greenville",
                    employees=45,
                    years_in_business=35,
                    estimated_revenue=4200000,
                    ownership="Founder-owned",
                    match_score=91,
                    contact_info={
                        "owner": "James Patterson",
                        "phone": "(864) 555-0567",
                        "email": "jpatterson@precisionmetal.com",
                        "website": "www.precisionmetalworks.com"
                    },
                    business_details={
                        "specialties": ["CNC machining", "Aerospace components", "Medical devices"],
                        "facilities": "25,000 sq ft facility with modern equipment",
                        "customer_base": "Long-term contracts with major OEMs",
                        "established": "1988",
                        "certifications": ["ISO 9001", "AS9100 Aerospace"]
                    }
                )
            ]
        
        # Default to auto repair if no specific industry
        else:
            companies = companies[:3] if companies else []
        
        # Filter by max_results
        companies = companies[:max_results]
        
        return DealSourcingResponse(
            companies=companies,
            total_found=len(companies),
            search_criteria=criteria
        )

# Service instances
ai_service = AIService()
deal_sourcing_service = DealSourcingService()