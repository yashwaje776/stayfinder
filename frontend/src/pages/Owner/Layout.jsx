import React from 'react';
import Navbar from '../../components/Owner/Navbar';
import Sidebar from '../../components/Owner/Sidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Fixed Navbar */}
      <div className="h-16 flex-shrink-0">
        <Navbar />
      </div>

      {/* Main area (fills rest of screen, scrolls internally) */}
      <div className="flex flex-1 overflow-hidden">
        <div className="w-16 md:w-64 bg-gray-200 border-r border-gray-300">
          <Sidebar />
        </div>

        {/* Main content scrolls vertically only */}
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
