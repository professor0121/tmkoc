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
import AdminDeshDashboard from '../components/admin/destinations/AdminDestinationsDashboard';
import AdminDestinationsPage from '../pages/admin/AdminDestinationsPage';
import CreateDestinations from '../pages/admin/CreateDestinationPage';
import FeaturedDestinations from '../components/destinations/FeaturedDestinations';
import DestinationDetailPage from '../pages/DestinationDetailPage';
const navRoutes = [
  { path: '/', element: <HomePage />, name: 'Home', showInNav: true },
  { path: '/services', element: <Services />, name: 'Services', showInNav: true },
  { path: '/about', element: <AboutPage />, name: 'About', showInNav: true },
  { path: '/auth', element: <AuthPage />, name: 'Login/Register', showInNav: true },
  { path: '/logout', element: <LogoutPage />, name: 'Logout', showInNav: true },
  { path: '/packages', element: <Packages />, name: 'Packages', showInNav: true },
  {path:'/destinations',element:<FeaturedDestinations/>,name:'Destination',showInNav:true},
  {path:'/destinations-detail/:id',element:<DestinationDetailPage/>,name:'Detalaipage',showInNav:false},

  // 🛡️ Not shown in nav but used in routing
  { path: '/admin/dashboard', element: <AdminDashboard />, name: 'Admin', showInNav: false },
  { path: '/admin/users', element: <AdminUsers />, showInNav: false },
  { path: '/admin/settings', element: <AdminSettings />, showInNav: false },
  { path: '/admin/packages', element: <Packages />, name: 'Packages', showInNav: false },
  { path: '/admin/logout', element: <LogoutPage />, name: 'Logout', showInNav: false },
  { path: '/admin/destinations', element: <AdminDestinationsPage />, name: 'Destinations', showInNav: false },
  { path: '/admin/dash', element: <AdminDeshDashboard />, name: 'Dashboard', showInNav: false },
  { path: '/admin/destinations/create', element: <CreateDestinations />, name: 'Create Destination', showInNav: false }
];

export default navRoutes;
