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
import HowItWorksPage from './pages/HowItWorksPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';

// Dashboard Pages
import SellerDashboardPage from './pages/dashboard/SellerDashboardPage';

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
                  <Route path="/marketplace" element={<MarketplacePage />} />
                  <Route path="/marketplace/:id" element={<BusinessDetailPage />} />
                  <Route path="/marketplace/:id/invest" element={<InvestmentPage />} />
                  <Route path="/marketplace/:id/make-offer" element={<MakeOfferPage />} />
                  <Route path="/how-it-works" element={<HowItWorksPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  
                  {/* Dashboard Routes */}
                  <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<SellerDashboardPage />} />
                    <Route path="seller" element={<SellerDashboardPage />} />
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
