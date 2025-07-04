// Shared data service for deal pipeline synchronization
class DealDataService {
  constructor() {
    this.deals = [];
    this.listeners = [];
  }

  // Stage definitions - single source of truth
  getStages() {
    return [
      { 
        id: 'interested', 
        title: 'Interested', 
        color: 'bg-blue-50 border-blue-200 text-blue-900',
        dashboardColor: 'text-blue-600'
      },
      { 
        id: 'loi_sent', 
        title: 'LOI Sent', 
        color: 'bg-yellow-50 border-yellow-200 text-yellow-900',
        dashboardColor: 'text-yellow-600'
      },
      { 
        id: 'diligence', 
        title: 'Diligence', 
        color: 'bg-purple-50 border-purple-200 text-purple-900',
        dashboardColor: 'text-purple-600'
      },
      { 
        id: 'closing', 
        title: 'Closing', 
        color: 'bg-green-50 border-green-200 text-green-900',
        dashboardColor: 'text-green-600'
      }
    ];
  }

  // Get deals by stage
  getDealsByStage(stage) {
    return this.deals.filter(deal => deal.stage === stage);
  }

  // Get stage counts
  getStageCounts() {
    const stages = this.getStages();
    return stages.reduce((counts, stage) => {
      counts[stage.id] = this.getDealsByStage(stage.id).length;
      return counts;
    }, {});
  }

  // Get total active deals (all stages)
  getTotalDeals() {
    return this.deals.length;
  }

  // Set deals data
  setDeals(deals) {
    this.deals = deals;
    this.notifyListeners();
  }

  // Add listener for data changes
  addListener(callback) {
    this.listeners.push(callback);
  }

  // Remove listener
  removeListener(callback) {
    this.listeners = this.listeners.filter(l => l !== callback);
  }

  // Notify all listeners of data changes
  notifyListeners() {
    this.listeners.forEach(callback => callback(this.deals));
  }

  // Load initial mock data
  loadMockData() {
    const mockDeals = [
      {
        id: '1',
        company_name: 'TechServ Solutions',
        industry: 'Technology Services',
        location: 'Austin, TX',
        revenue: 3200000,
        ebitda: 640000,
        asking_price: 2500000,
        stage: 'interested',
        first_contact: '2024-01-10',
        contact_person: 'John Smith',
        email: 'john@techserv.com',
        phone: '(512) 555-0123',
        nda_signed: true,
        nda_date: '2024-01-12',
        interest_level: 'high',
        next_meeting: '2024-01-20',
        broker_name: 'Tech Brokers LLC',
        automation_suggestions: ['Schedule management meeting', 'Request financials']
      },
      {
        id: '2',
        company_name: 'Local Restaurant Co',
        industry: 'Food Service',
        location: 'Dallas, TX',
        revenue: 1800000,
        ebitda: 280000,
        asking_price: 1200000,
        stage: 'interested',
        first_contact: '2024-01-08',
        contact_person: 'Maria Garcia',
        email: 'maria@localrest.com',
        phone: '(214) 555-0456',
        nda_signed: false,
        nda_date: null,
        interest_level: 'medium',
        next_meeting: '2024-01-18',
        broker_name: 'Restaurant Deals Inc',
        automation_suggestions: ['Send NDA', 'Schedule call']
      },
      {
        id: '3',
        company_name: 'Manufacturing Plus',
        industry: 'Manufacturing',
        location: 'Detroit, MI',
        revenue: 8200000,
        ebitda: 1150000,
        asking_price: 4800000,
        stage: 'loi_sent',
        loi_sent_date: '2024-01-05',
        loi_amount: 4200000,
        loi_terms: '7x EBITDA, 20% down',
        broker_name: 'Industrial Brokers',
        response_deadline: '2024-01-25',
        loi_status: 'under_review',
        days_pending: 10,
        follow_up_date: '2024-01-22',
        automation_suggestions: ['Send reminder', 'Prepare revised LOI']
      },
      {
        id: '4',
        company_name: 'Software Dynamics',
        industry: 'Software',
        location: 'San Francisco, CA',
        revenue: 5100000,
        ebitda: 1020000,
        asking_price: 6500000,
        stage: 'loi_sent',
        loi_sent_date: '2024-01-03',
        loi_amount: 5800000,
        loi_terms: '5.7x EBITDA, seller financing',
        broker_name: 'Tech Acquisitions',
        response_deadline: '2024-01-20',
        loi_status: 'countered',
        days_pending: 12,
        follow_up_date: '2024-01-21',
        automation_suggestions: ['Review counter-offer', 'Negotiate terms']
      },
      {
        id: '5',
        company_name: 'Healthcare Services Inc',
        industry: 'Healthcare',
        location: 'Phoenix, AZ',
        revenue: 2900000,
        ebitda: 420000,
        asking_price: 1800000,
        stage: 'diligence',
        loi_signed_date: '2024-12-20',
        dd_start_date: '2024-01-02',
        dd_end_date: '2024-02-02',
        qoe_provider: 'Johnson CPA',
        qoe_status: 'in_progress',
        qoe_completion: 60,
        legal_counsel: 'Smith & Associates',
        legal_review: 'in_progress',
        vdr_access: 'granted',
        vdr_docs_uploaded: 85,
        financial_review: 'completed',
        insurance_review: 'pending',
        automation_suggestions: ['Request missing docs', 'Schedule mgmt meeting']
      },
      {
        id: '6',
        company_name: 'Logistics Corp',
        industry: 'Logistics',
        location: 'Chicago, IL',
        revenue: 4500000,
        ebitda: 675000,
        asking_price: 3200000,
        stage: 'closing',
        target_close_date: '2024-02-15',
        purchase_price: 2900000,
        sba_lender: 'First National Bank',
        sba_approval: 'approved',
        sba_amount: 2320000,
        equity_required: 580000,
        apa_status: 'executed',
        closing_conditions: 3,
        conditions_cleared: 2,
        title_company: 'Reliable Title Co',
        closing_progress: 75,
        marketplace_listed: true,
        funding_raised: 450000,
        funding_target: 580000,
        automation_suggestions: ['Clear final conditions', 'Schedule closing']
      }
    ];
    
    this.setDeals(mockDeals);
  }
}

// Create singleton instance
const dealDataService = new DealDataService();

export default dealDataService;