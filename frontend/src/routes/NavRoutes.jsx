// src/routes/navRoutes.js
import HomePage from '../pages/HomePage';
import Services from '../pages/Services';
import AboutPage from '../pages/AboutPage';
import AuthPage from '../pages/AuthPage';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminUsers from '../pages/admin/AdminUsers';
import AdminSettings from '../pages/admin/AdminSettings';
import LogoutPage from '../pages/Logout';
import Packages from '../pages/admin/Packages';

const navRoutes = [
  { path: '/', element: <HomePage />, name: 'Home', showInNav: true },
  { path: '/services', element: <Services />, name: 'Services', showInNav: true },
  { path: '/about', element: <AboutPage />, name: 'About', showInNav: true },
  { path: '/auth', element: <AuthPage />, name: 'Login/Register', showInNav: true },
  { path: '/logout', element: <LogoutPage />, name: 'Logout', showInNav: true },

  // 🛡️ Not shown in nav but used in routing
  { path: '/admin/dashboard', element: <AdminDashboard />, name: 'Admin', showInNav: false },
  { path: '/admin/users', element: <AdminUsers />, showInNav: false },
  { path: '/admin/settings', element: <AdminSettings />, showInNav: false },
  { path: '/admin/packages', element: <Packages />, name: 'Packages', showInNav: false },

];

export default navRoutes;
