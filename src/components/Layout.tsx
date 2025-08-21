import React, { useState, ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden ml-0 lg:ml-64 transition-all duration-300">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-3 lg:p-4">
          <div className="w-full mx-auto max-w-7xl">
            {/* Render children directly without background cards */}
            <div className="px-2 lg:px-0">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
