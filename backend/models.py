from typing import List, Optional, Union, Any
from pydantic import BaseModel, Field, EmailStr, model_validator
from datetime import datetime
import uuid
from enum import Enum


# Enums
class UserType(str, Enum):
    SELLER = "SELLER"
    BUYER = "BUYER"
    INVESTOR = "INVESTOR"
    ADMIN = "ADMIN"


class BusinessStatus(str, Enum):
    DRAFT = "draft"
    ACTIVE = "active"
    UNDER_LOI = "under_loi"
    CLOSED = "closed"


class FinancingType(str, Enum):
    CASH = "cash"
    SELLER_FINANCING = "seller_financing"
    BANK_FINANCING = "bank_financing"
    SBA_LOAN = "sba_loan"


class DealStatus(str, Enum):
    PENDING = "pending"
    ACCEPTED = "accepted"
    REJECTED = "rejected"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    CANCELLED = "cancelled"


# Base models
class BaseId(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))


class TimestampModel(BaseModel):
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


# Authentication models
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    user_type: Optional[UserType] = None


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserProfile(BaseId, TimestampModel):
    user_type: UserType
    display_name: Optional[str] = None
    email: EmailStr
    avatar_url: Optional[str] = None
    completed_onboarding: bool = False

    class Config:
        populate_by_name = True
        from_attributes = True


class UserProfileUpdate(BaseModel):
    display_name: Optional[str] = None
    avatar_url: Optional[str] = None
    user_type: Optional[UserType] = None


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    user_id: str
    email: EmailStr
    user_type: UserType


# Business Listing models
class BusinessListingBase(BaseModel):
    title: str
    industry: str
    location: str
    description: Optional[str] = None
    annual_revenue: Optional[float] = None
    annual_profit: Optional[float] = None
    asking_price: Optional[float] = None
    employees_count: Optional[int] = None
    years_in_business: Optional[int] = None
    reason_for_selling: Optional[str] = None
    funding_target: Optional[float] = None
    cover_image_url: Optional[str] = None


class BusinessListingCreate(BusinessListingBase):
    pass


class BusinessListingUpdate(BusinessListingBase):
    title: Optional[str] = None
    industry: Optional[str] = None
    location: Optional[str] = None
    status: Optional[BusinessStatus] = None
    under_loi: Optional[bool] = None


class BusinessListing(BusinessListingBase, BaseId, TimestampModel):
    seller_id: str
    status: BusinessStatus = BusinessStatus.DRAFT
    funding_raised: float = 0
    under_loi: bool = False
    investor_count: int = 0
    funding_end_date: Optional[datetime] = None

    class Config:
        populate_by_name = True
        from_attributes = True


# Investment models
class InvestmentCreate(BaseModel):
    business_id: str
    amount: float


class Investment(BaseId, TimestampModel):
    business_id: str
    investor_id: str
    amount: float
    business: Optional[BusinessListing] = None

    class Config:
        populate_by_name = True
        from_attributes = True


# Offer models
class ContingencyItem(BaseModel):
    type: str
    description: str


class OfferCreate(BaseModel):
    business_id: str
    offer_amount: float
    down_payment: Optional[float] = None
    financing_terms: Optional[FinancingType] = None
    contingencies: Optional[List[str]] = None
    closing_timeline: int = 60
    additional_notes: Optional[str] = None


class Offer(BaseId, TimestampModel):
    business_id: str
    buyer_id: str
    offer_amount: float
    down_payment: Optional[float] = None
    financing_terms: Optional[FinancingType] = None
    contingencies: Optional[List[str]] = None
    closing_timeline: int = 60
    additional_notes: Optional[str] = None
    status: DealStatus = DealStatus.PENDING
    business: Optional[BusinessListing] = None

    class Config:
        populate_by_name = True
        from_attributes = True


# Deal models
class TimelineEvent(BaseId):
    deal_id: str
    title: str
    description: Optional[str] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    event_type: str


class Deal(BaseId, TimestampModel):
    business_id: str
    seller_id: str
    buyer_id: str
    offer_id: str
    status: DealStatus = DealStatus.IN_PROGRESS
    business: Optional[BusinessListing] = None
    timeline_events: Optional[List[TimelineEvent]] = None

    class Config:
        populate_by_name = True
        from_attributes = True


# Document models
class Document(BaseId, TimestampModel):
    deal_id: str
    uploaded_by: str
    file_name: str
    file_url: str
    file_type: str
    description: Optional[str] = None

    class Config:
        populate_by_name = True
        from_attributes = True


# SeedStack™ CRM Models
class CRMDeal(BaseId, TimestampModel):
    user_id: str
    title: str
    industry: Optional[str] = None
    location: Optional[str] = None
    asking_price: Optional[float] = None
    revenue: Optional[float] = None
    ebitda: Optional[float] = None
    stage: str = "inbox"  # inbox, interested, loi_sent, diligence, closed
    priority: str = "medium"  # low, medium, high
    notes: Optional[str] = None
    next_action: Optional[str] = None
    broker_contact: Optional[str] = None
    last_activity: Optional[datetime] = None
    marketplace_listing_id: Optional[str] = None  # Link to SeedSMB marketplace

    class Config:
        populate_by_name = True
        from_attributes = True


class CRMDealCreate(BaseModel):
    title: str
    industry: Optional[str] = None
    location: Optional[str] = None
    asking_price: Optional[float] = None
    revenue: Optional[float] = None
    ebitda: Optional[float] = None
    stage: str = "inbox"
    priority: str = "medium"
    notes: Optional[str] = None
    next_action: Optional[str] = None
    broker_contact: Optional[str] = None


class CRMDealUpdate(BaseModel):
    title: Optional[str] = None
    industry: Optional[str] = None
    location: Optional[str] = None
    asking_price: Optional[float] = None
    revenue: Optional[float] = None
    ebitda: Optional[float] = None
    stage: Optional[str] = None
    priority: Optional[str] = None
    notes: Optional[str] = None
    next_action: Optional[str] = None
    broker_contact: Optional[str] = None
    marketplace_listing_id: Optional[str] = None


# AI Chat Models
class ChatMessage(BaseId, TimestampModel):
    user_id: str
    deal_id: Optional[str] = None
    message: str
    response: str
    message_type: str = "general"  # general, deal_analysis, market_research, loi_help

    class Config:
        populate_by_name = True
        from_attributes = True


class ChatRequest(BaseModel):
    message: str
    deal_id: Optional[str] = None
    message_type: str = "general"


# P&L Analysis Models
class PLAnalysis(BaseId, TimestampModel):
    user_id: str
    deal_id: Optional[str] = None
    file_name: str
    file_url: str
    analysis_result: dict  # JSON containing analysis results
    red_flags: List[str] = []
    summary: Optional[str] = None
    status: str = "processing"  # processing, completed, failed

    class Config:
        populate_by_name = True
        from_attributes = True


class PLAnalysisCreate(BaseModel):
    deal_id: Optional[str] = None
    file_name: str
    file_data: str  # Base64 encoded file data


# Market Research Models
class MarketResearch(BaseId, TimestampModel):
    user_id: str
    deal_id: Optional[str] = None
    industry: str
    location: str
    naics_code: Optional[str] = None
    research_data: dict  # JSON containing market data
    status: str = "processing"  # processing, completed, failed

    class Config:
        populate_by_name = True
        from_attributes = True


class MarketResearchRequest(BaseModel):
    industry: str
    location: str
    deal_id: Optional[str] = None


# LOI Models
class LOI(BaseId, TimestampModel):
    user_id: str
    deal_id: str
    buyer_name: str
    seller_name: str
    business_name: str
    offer_amount: float
    due_diligence_period: int = 30  # days
    financing_contingency: bool = True
    earnout_provision: Optional[str] = None
    exclusivity_period: int = 30  # days
    additional_terms: Optional[str] = None
    generated_content: str
    status: str = "draft"  # draft, sent, signed, expired

    class Config:
        populate_by_name = True
        from_attributes = True


class LOICreate(BaseModel):
    deal_id: str
    buyer_name: str
    seller_name: str
    business_name: str
    offer_amount: float
    due_diligence_period: int = 30
    financing_contingency: bool = True
    earnout_provision: Optional[str] = None
    exclusivity_period: int = 30
    additional_terms: Optional[str] = None


# Legal Template Models
class LegalTemplate(BaseId, TimestampModel):
    user_id: str
    deal_id: Optional[str] = None
    template_type: str  # nda, apa, employment, checklist
    template_name: str
    generated_content: str
    customizations: Optional[dict] = None

    class Config:
        populate_by_name = True
        from_attributes = True


class LegalTemplateRequest(BaseModel):
    template_type: str
    template_name: str
    deal_id: Optional[str] = None
    customizations: Optional[dict] = None


# NDA Management Models
class NDA(BaseId, TimestampModel):
    user_id: str
    deal_id: str
    counterparty_name: str
    counterparty_email: str
    template_content: str
    status: str = "sent"  # sent, signed, expired
    signed_date: Optional[datetime] = None
    expiry_date: Optional[datetime] = None

    class Config:
        populate_by_name = True
        from_attributes = True


class NDACreate(BaseModel):
    deal_id: str
    counterparty_name: str
    counterparty_email: str
