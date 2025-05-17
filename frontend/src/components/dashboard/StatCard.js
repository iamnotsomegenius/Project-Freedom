import React from 'react';

const StatCard = ({ title, value, icon, trend }) => {
  return (
    <div className="bg-primary p-6 rounded-lg border border-gray-800">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
          
          {trend && (
            <div className="flex items-center mt-2">
              {trend.value > 0 ? (
                <span className="text-success text-xs">↑ {trend.value}%</span>
              ) : trend.value < 0 ? (
                <span className="text-danger text-xs">↓ {Math.abs(trend.value)}%</span>
              ) : (
                <span className="text-gray-400 text-xs">→ {trend.value}%</span>
              )}
              <span className="text-gray-400 text-xs ml-1">{trend.label}</span>
            </div>
          )}
        </div>
        
        {icon && (
          <div className="bg-secondary/10 p-3 rounded-md">
            <div className="text-secondary">{icon}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
