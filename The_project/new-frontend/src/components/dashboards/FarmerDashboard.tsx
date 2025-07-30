// new-frontend/src/components/dashboards/FarmerDashboard.tsx

import React from 'react';
import { useAuth } from '../../context/AuthContext'; // Make sure this import exists
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'; // Add these imports

const FarmerDashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth(); // Access user info

  if (!isAuthenticated) {
    // Basic protection, will be enhanced with ProtectedRoute
    return <div className="p-4 text-center text-red-500">Please log in to view the Farmer Dashboard.</div>;
  }

  return (
    <div className="flex-grow p-6 bg-gray-50 min-h-screen"> {/* min-h-screen to fill viewport */}
      <Card className="w-full max-w-4xl mx-auto p-6 shadow-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-gray-800">Farmer Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="mt-4">
          <p className="text-lg text-gray-600">Welcome, {user?.fullName || user?.email}!</p>
          <p className="mt-2 text-gray-700">This is your private dashboard content.</p>
          <p className="mt-4 text-gray-500">
            Your User ID: <span className="font-mono bg-gray-200 p-1 rounded text-sm">{user?.id || 'N/A'}</span> (Role: <span className="font-semibold text-blue-600">{user?.role || 'N/A'}</span>)
          </p>
          {/* Add farmer-specific content here */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-purple-100 p-4 rounded-md shadow-sm">
              <h3 className="font-semibold text-lg text-purple-800">My Listings</h3>
              <p className="text-purple-700">View and manage your produce listings.</p>
            </div>
            <div className="bg-orange-100 p-4 rounded-md shadow-sm">
              <h3 className="font-semibold text-lg text-orange-800">Orders & Sales</h3>
              <p className="text-orange-700">Track your sales and incoming orders.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FarmerDashboard;