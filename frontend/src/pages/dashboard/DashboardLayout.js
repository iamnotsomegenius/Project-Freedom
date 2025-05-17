import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';

const DashboardLayout = () => {
  const { user, isAuthenticated, loading } = useAuth();
  
  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
      </div>
    );
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  // Redirect to onboarding if user hasn't completed it
  if (user && !user.completed_onboarding) {
    return <Navigate to="/onboarding" replace />;
  }
  
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 p-6 lg:p-8 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
