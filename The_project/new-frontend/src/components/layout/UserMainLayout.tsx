import React from "react";

interface UserMainLayoutProps {
  children: React.ReactNode;
}

const UserMainLayout: React.FC<UserMainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* This is the new layout for registered users */}
      <main className="p-4">
        {children}
      </main>
    </div>
  );
};

export default UserMainLayout;
