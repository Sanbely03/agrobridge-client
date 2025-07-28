// new-frontend/src/pages/DashboardPage.tsx

import React from 'react';
import { useAuth } from '../context/AuthContext'; // To display user info
import { auth } from '../firebaseConfig'; // To sign out
import { useNavigate } from 'react-router-dom'; // To redirect after logout

const DashboardPage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Failed to log out.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-green-700 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Farmer Dashboard</h1>
        {currentUser && (
          <div className="flex items-center gap-4">
            <span className="text-sm">Welcome, {currentUser.email || 'Farmer'}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          </div>
        )}
      </div>
      <div className="flex-grow p-4 text-center">
        <h2 className="text-2xl text-green-800 mb-4">Your Private Dashboard Content</h2>
        <p className="text-gray-700">This page is only accessible when you are logged in.</p>
        {currentUser && (
          <p className="text-gray-600 mt-2">Your User ID: {currentUser.uid}</p>
        )}
        {/* Add more dashboard content here */}
      </div>
    </div>
  );
};

export default DashboardPage;