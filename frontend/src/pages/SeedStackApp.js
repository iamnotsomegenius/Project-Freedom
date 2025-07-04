import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SeedStackLogin from '../components/seedstack/SeedStackLogin';
import SeedStackDashboard from '../components/seedstack/SeedStackDashboard';
import DealPipeline from '../components/seedstack/DealPipeline';
import AIAssistant from '../components/seedstack/AIAssistant';
import PLAnalyzer from '../components/seedstack/PLAnalyzer';
import MarketResearch from '../components/seedstack/MarketResearch';
import LOIGenerator from '../components/seedstack/LOIGenerator';
import LegalTemplates from '../components/seedstack/LegalTemplates';

const SeedStackApp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for existing demo session
    const demoUser = localStorage.getItem('seedstack_demo_user');
    if (demoUser) {
      setUser(JSON.parse(demoUser));
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('seedstack_demo_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('seedstack_demo_user');
  };

  if (!isAuthenticated) {
    return <SeedStackLogin onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<SeedStackDashboard user={user} onLogout={handleLogout} />} />
        <Route path="/pipeline" element={<DealPipeline user={user} onLogout={handleLogout} />} />
        <Route path="/ai-assistant" element={<AIAssistant user={user} onLogout={handleLogout} />} />
        <Route path="/pl-analyzer" element={<PLAnalyzer user={user} onLogout={handleLogout} />} />
        <Route path="/market-research" element={<MarketResearch user={user} onLogout={handleLogout} />} />
        <Route path="/loi-generator" element={<LOIGenerator user={user} onLogout={handleLogout} />} />
        <Route path="/legal-templates" element={<LegalTemplates user={user} onLogout={handleLogout} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default SeedStackApp;