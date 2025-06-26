import React from 'react';
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const sidebarLinks = [
    { name: 'Dashboard', path: '/host/dashboard', icon: assets.dashboardIcon },
    { name: 'Add Room', path: '/host/add-room', icon: assets.addIcon },
    { name: 'List Room', path: '/host/list-room', icon: assets.listIcon },
  ];

  return (
    <div className="h-full w-16 md:w-64 bg-gray-200 border-r border-gray-300 pt-4 flex flex-col transition-all duration-300">
      {sidebarLinks.map((item, idx) => (
        <NavLink
          to={item.path}
          key={idx}
          className={({ isActive }) =>
            `flex items-center py-3 px-4 md:px-6 gap-3 transition-colors duration-200 
            ${isActive
              ? 'border-r-4 md:border-r-[6px] bg-blue-600/10 border-blue-600 text-blue-600'
              : 'hover:bg-gray-100 text-gray-700'}`
          }
        >
          <img src={item.icon} alt={item.name} className="w-6 h-6" />
          <p className="hidden md:block">{item.name}</p>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
