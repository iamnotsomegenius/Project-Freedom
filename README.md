# SeedSMB Marketplace Platform

A comprehensive business marketplace platform that connects sellers, buyers, and investors in the small to medium business space. The platform includes an integrated AI-powered deal sourcing tool called SeedStack.

## Platform Overview

### Core Features

**For Business Sellers:**
- Create detailed business listings
- Manage offers and negotiations
- Track deal progress through timeline
- Access to funding opportunities

**For Business Buyers:**
- Browse and filter business listings
- Make offers with detailed terms
- Due diligence management
- Deal tracking and timeline

**For Investors:**
- Invest in businesses seeking funding
- Portfolio tracking
- Due diligence access

**SeedStack AI Integration:**
- AI-powered company sourcing
- Market research generation
- P&L analysis automation
- LOI generation
- Legal template creation
- Intelligent chat assistant for deal guidance

## Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **Supabase** - Database and authentication
- **MongoDB** - Fallback database support
- **Python 3.11+** - Runtime environment

### Frontend
- **React 19** - UI framework
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client
- **Formik & Yup** - Form handling and validation

### External Services
- **Supabase** - Database, Auth, Storage
- **OpenAI** - AI services for SeedStack
- **Stripe** - Payment processing (optional)

## Project Structure

```
/app/
├── backend/                 # FastAPI backend
│   ├── routers/            # API endpoints
│   ├── models.py           # Pydantic models
│   ├── database_supabase.py # Database operations
│   ├── auth_supabase.py    # Authentication
│   ├── ai_services.py      # AI integration
│   └── server.py           # Main application
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page components
│   │   ├── api/           # API client
│   │   ├── context/       # React context
│   │   └── utils/         # Utilities
│   └── public/            # Static assets
└── README.md              # This file
```

## Environment Setup

### Backend Environment Variables (.env)
```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
SECRET_KEY=your_jwt_secret_key
STRIPE_API_KEY=your_stripe_key (optional)
OPENAI_API_KEY=your_openai_key (for SeedStack AI features)
```

### Frontend Environment Variables (.env)
```
REACT_APP_BACKEND_URL=your_backend_url
```

## Quick Start

### Prerequisites
- Python 3.11+
- Node.js 18+
- Yarn package manager

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
# Set up environment variables in .env file
# Start with supervisor (production) or uvicorn (development)
```

### Frontend Setup
```bash
cd frontend
yarn install
# Set up environment variables in .env file
yarn start
```

## API Documentation

The API is automatically documented with FastAPI's built-in OpenAPI/Swagger documentation:
- API Docs: `{backend_url}/docs`
- ReDoc: `{backend_url}/redoc`

### Main API Endpoints

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

#### Business Listings
- `GET /api/listings/` - Get all listings
- `POST /api/listings/` - Create listing
- `GET /api/listings/{id}` - Get specific listing
- `PUT /api/listings/{id}` - Update listing

#### Offers & Investments
- `GET /api/offers/` - Get user offers
- `POST /api/offers/` - Create offer
- `GET /api/investments/` - Get user investments
- `POST /api/investments/` - Create investment

#### SeedStack AI
- `GET /api/seedstack/deals` - Get CRM deals
- `POST /api/seedstack/deals` - Create deal
- `POST /api/seedstack/ai/chat` - AI chat assistant
- `POST /api/seedstack/deal-sourcing/search` - Company search

## Key Features

### Business Marketplace
- **Listing Management**: Create, edit, and manage business listings
- **Offer System**: Structured offer process with terms and conditions
- **Investment Platform**: Crowdfunding capabilities for businesses
- **Deal Tracking**: Complete deal lifecycle management

### SeedStack AI Platform
- **Deal Sourcing**: AI-powered company discovery and research
- **Market Analysis**: Automated market research generation
- **Financial Analysis**: P&L analysis and insights
- **Document Generation**: LOI and legal template creation
- **Chat Assistant**: AI guidance throughout the deal process

### User Management
- **Multi-role System**: Sellers, Buyers, Investors, Admins
- **Authentication**: Secure JWT-based authentication
- **Profile Management**: User profiles with role-specific features

## Database Schema

### Core Tables
- `profiles` - User accounts and profile information
- `business_listings` - Business listings for sale
- `offers` - Purchase offers on businesses
- `investments` - Investment transactions
- `deals` - Accepted offers and deal progress
- `crm_deals` - SeedStack CRM deals
- `chat_messages` - AI chat history

## Security Features

- JWT-based authentication
- Role-based access control
- CORS protection
- Rate limiting
- Input validation with Pydantic
- Password hashing with bcrypt

## Deployment

The application is designed to run in containerized environments with:
- FastAPI backend with Supabase integration
- React frontend with optimized builds
- Environment-based configuration
- Health check endpoints

## Development Notes

### Authentication Flow
1. User registers/logs in via `/api/auth/` endpoints
2. JWT token returned and stored in frontend
3. Token included in `Authorization: Bearer {token}` header
4. Backend validates token for protected routes

### Database Strategy
- Primary: Supabase (PostgreSQL) for production data
- Fallback: Mock data for development/testing
- UUID-based IDs for better scalability

### AI Integration
- OpenAI GPT models for chat and analysis
- Structured prompts for consistent output
- Conversation history tracking
- Context-aware responses

## Contributing

When making changes:
1. Follow existing code patterns
2. Update API documentation if needed
3. Test authentication flows
4. Ensure proper error handling
5. Follow REST API conventions

## Support

For technical issues or questions about the platform:
1. Check API documentation at `/docs`
2. Review error logs for debugging
3. Verify environment variable configuration
4. Check Supabase connection and permissions