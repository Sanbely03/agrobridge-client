// new-frontend/src/components/layout/MainLayout.tsx
import React from 'react';
import { Header } from '../shared/Header'; // Correct relative path
import { Footer } from '../shared/Footer'; // Correct relative path, assuming Footer also in shared
import { Outlet } from 'react-router-dom'; // <--- Import Outlet

// Remove MainLayoutProps interface and children prop as it's no longer directly used for content
// interface MainLayoutProps {
//   children: React.ReactNode;
// }

const MainLayout: React.FC = () => { // <--- Remove MainLayoutProps and { children }
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet /> {/* <--- RENDER THE OUTLET HERE */}
      </main>
      <Footer /> {/* Include Footer here */}
    </div>
  );
};

export default MainLayout;