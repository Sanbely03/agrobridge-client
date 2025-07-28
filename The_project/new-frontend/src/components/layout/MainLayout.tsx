// new-frontend/src/components/layout/MainLayout.tsx
import React from 'react';
import { Header } from '../shared/Header'; // Correct relative path
import { Footer } from '../shared/Footer'; // Correct relative path, assuming Footer also in shared

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer /> {/* Include Footer here */}
    </div>
  );
};

export default MainLayout;