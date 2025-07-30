// new-frontend/src/components/dashboards/InvestorDashboard.tsx

import React from 'react';
import { useAuth } from '../../context/AuthContext'; // Assuming you'll need auth context here
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'; // Basic ShadCN Card for structure

const InvestorDashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth(); // Example: access user info

  if (!isAuthenticated) {
    // Basic protection, will be enhanced with ProtectedRoute
    return <div className="p-4 text-center text-red-500">Please log in to view the Investor Dashboard.</div>;
  }

  return (
    <div className="flex-grow p-6 bg-gray-50 min-h-screen"> {/* min-h-screen to fill viewport */}
      <Card className="w-full max-w-4xl mx-auto p-6 shadow-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-gray-800">Investor Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="mt-4">
          <p className="text-lg text-gray-600">Welcome, {user?.fullName || user?.email}!</p>
          <p className="mt-2 text-gray-700">This is your dedicated dashboard for managing investments.</p>
          <p className="mt-4 text-gray-500">
            Your User ID: <span className="font-mono bg-gray-200 p-1 rounded text-sm">{user?.id || 'N/A'}</span> (Role: <span className="font-semibold text-green-600">{user?.role || 'N/A'}</span>)
          </p>
          {/* Add investor-specific content here */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-100 p-4 rounded-md shadow-sm">
              <h3 className="font-semibold text-lg text-blue-800">Investment Overview</h3>
              <p className="text-blue-700">Track your current and past investments.</p>
            </div>
            <div className="bg-green-100 p-4 rounded-md shadow-sm">
              <h3 className="font-semibold text-lg text-green-800">Portfolio Performance</h3>
              <p className="text-green-700">View performance metrics and reports.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestorDashboard;