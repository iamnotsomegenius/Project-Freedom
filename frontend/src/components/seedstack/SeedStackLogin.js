import React, { useState } from 'react';
import Button from '../ui/Button';

const SeedStackLogin = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDemoLogin = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const demoUser = {
      id: "demo-user-123",
      email: "demo@seedstack.com",
      user_type: "BUYER",
      display_name: "Demo User"
    };
    
    onLogin(demoUser);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            SeedStack<span className="text-xs align-super text-gray-600">™</span>
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            AI-Native SMB Acquisition Platform
          </p>
        </div>
        
        <div className="bg-white py-8 px-6 shadow-sm rounded-lg">
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900">Demo Access</h3>
              <p className="mt-2 text-sm text-gray-600">
                Experience the full SeedStack platform with demo data
              </p>
            </div>
            
            <Button
              onClick={handleDemoLogin}
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              {isLoading ? 'Signing In...' : 'Enter Demo Platform'}
            </Button>
            
            <div className="text-center">
              <p className="text-xs text-gray-500">
                Demo includes: Deal pipeline, AI assistant, P&L analyzer, and more
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeedStackLogin;