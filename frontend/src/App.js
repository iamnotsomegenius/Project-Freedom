import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { AuthModalProvider } from './context/AuthModalContext';

// Layout Components
import MainNavigation from './components/layout/MainNavigation';
import Footer from './components/layout/Footer';
import AuthModal from './components/auth/AuthModal';
import DashboardLayout from './pages/dashboard/DashboardLayout';

// Pages
import HomePage from './pages/HomePage';
import MarketplacePage from './pages/MarketplacePage';
import BusinessDetailPage from './pages/BusinessDetailPage';
import InvestmentPage from './pages/InvestmentPage';
import MakeOfferPage from './pages/MakeOfferPage';

// How It Works Pages
import HowItWorksPage from './pages/HowItWorksPage';
import BuyersPage from './pages/how-it-works/BuyersPage';
import SellersPage from './pages/how-it-works/SellersPage';
import InvestorsPage from './pages/how-it-works/InvestorsPage';
import RegulatoryPage from './pages/how-it-works/RegulatoryPage';
import PricingPage from './pages/how-it-works/PricingPage';

// About Pages
import AboutPage from './pages/AboutPage';
import FounderPage from './pages/about/FounderPage';
import MissionPage from './pages/about/MissionPage';

// Additional Pages
import SuccessStoriesPage from './pages/SuccessStoriesPage';
import ResourceCenterPage from './pages/ResourceCenterPage';
import FAQPage from './pages/FAQPage';
import NotFoundPage from './pages/NotFoundPage';
import SeedStackPage from './pages/SeedStackPage';

// Dashboard Pages
import SellerDashboardPage from './pages/dashboard/SellerDashboardPage';
import InvestmentPortfolioPage from './pages/dashboard/InvestmentPortfolioPage';

// Initialize Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AuthModalProvider>
          <Router>
            <div className="flex flex-col min-h-screen bg-background text-foreground">
              <MainNavigation />
              
              <main className="flex-grow">
                <Routes>
                  {/* Public Pages */}
                  <Route path="/" element={<HomePage />} />
                  
                  {/* Marketplace */}
                  <Route path="/marketplace" element={<MarketplacePage />} />
                  <Route path="/marketplace/:id" element={<BusinessDetailPage />} />
                  <Route path="/marketplace/:id/invest" element={<InvestmentPage />} />
                  <Route path="/marketplace/:id/make-offer" element={<MakeOfferPage />} />
                  
                  {/* How It Works */}
                  <Route path="/how-it-works" element={<HowItWorksPage />} />
                  <Route path="/how-it-works/buyers" element={<BuyersPage />} />
                  <Route path="/how-it-works/sellers" element={<SellersPage />} />
                  <Route path="/how-it-works/investors" element={<InvestorsPage />} />
                  <Route path="/how-it-works/regulatory" element={<RegulatoryPage />} />
                  
                  {/* Pricing */}
                  <Route path="/pricing" element={<PricingPage />} />

                  {/* SeedStack App */}
                  <Route path="/seedstack-app/*" element={<SeedStackApp />} />
                  
                  {/* About */}
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/about/founder" element={<FounderPage />} />
                  <Route path="/about/mission" element={<MissionPage />} />
                  
                  {/* Additional Pages */}
                  <Route path="/success-stories" element={<SuccessStoriesPage />} />
                  <Route path="/resources" element={<ResourceCenterPage />} />
                  <Route path="/faq" element={<FAQPage />} />
                  
                  {/* Dashboard Routes */}
                  <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<SellerDashboardPage />} />
                    <Route path="seller" element={<SellerDashboardPage />} />
                    <Route path="investments" element={<InvestmentPortfolioPage />} />
                    {/* Add more dashboard routes as needed */}
                  </Route>
                  
                  {/* 404 Route */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
              
              <Footer />
              <AuthModal />
              <Toaster position="top-right" />
            </div>
          </Router>
        </AuthModalProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;