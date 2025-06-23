import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Settings,
  Package,
  MapPin,
  Compass,
  PlusSquare,
  CalendarCheck,
  FileText,
  FilePlus
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { path: '/admin/dashboard', name: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { path: '/admin/allusers', name: 'Manage Users', icon: <Users size={18} /> },
    { path: '/admin/settings', name: 'Settings', icon: <Settings size={18} /> },
    { path: '/admin/packages', name: 'Packages', icon: <Package size={18} /> },
    { path: '/admin/destinations', name: 'Destinations List', icon: <MapPin size={18} /> },
    { path: '/admin/dash', name: 'Destination Dashboard', icon: <Compass size={18} /> },
    { path: '/admin/destinations/create', name: 'Create Destination', icon: <PlusSquare size={18} /> },
    { path: '/admin/bookings', name: 'Bookings', icon: <CalendarCheck size={18} /> },
    { path: '/admin/blogs', name: 'Blogs', icon: <FileText size={18} /> },
    { path: '/admin/blogs/create', name: 'Create Blog', icon: <FilePlus size={18} /> }
  ];

  return (
    <aside className="h-screen w-64 bg-white shadow-lg p-4 hidden md:block">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Admin Panel</h2>
      <nav className="space-y-2">
        {menuItems.map(({ path, name, icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50 transition ${
                isActive ? 'bg-blue-100 text-blue-700' : ''
              }`
            }
          >
            {icon}
            <span>{name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
