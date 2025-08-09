import React from "react";

type Props = {
  children: React.ReactNode;
};

const UserLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="user-layout">
      {/* User-specific header */}
      <header className="bg-green-600 text-white p-4">
        <h1>AgroBridge Dashboard</h1>
      </header>

      {/* Main content */}
      <main className="p-6">{children}</main>

      {/* Optional: User-specific footer */}
      <footer className="bg-gray-200 text-center p-4">
        <p>AgroBridge &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default UserLayout;
