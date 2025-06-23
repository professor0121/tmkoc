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
import DestinationDetailsPage from '../pages/DestinationDetailsPage';
import PackageDetailsPage from '../pages/PackageDetailsPage';
import AllUsersPage from '../pages/AllUsersPage';

// Booking related imports
import BookingPage from '../pages/BookingPage';
import MyBookingsPage from '../pages/MyBookingsPage';
import BookingDetailsPage from '../pages/BookingDetailsPage';
import AdminBookingsPage from '../pages/admin/AdminBookingsPage';
import BookingFlowRouter from '../components/bookings/BookingFlowRouter';
import DestinationBookingFlow from '../components/bookings/DestinationBookingFlow';
import PackageBookingFlow from '../components/bookings/PackageBookingFlow';
const navRoutes = [
  { path: '/', element: <HomePage />, name: 'Home', showInNav: true },
  { path: '/services', element: <Services />, name: 'Services', showInNav: true },
  { path: '/about', element: <AboutPage />, name: 'About', showInNav: true },
  { path: '/auth', element: <AuthPage />, name: 'Login/Register', showInNav: true },
  { path: '/logout', element: <LogoutPage />, name: 'Logout', showInNav: true },
  { path: '/packages', element: <Packages />, name: 'Packages', showInNav: true },
  { path: '/destinations', element: <FeaturedDestinations/>, name: 'Destination', showInNav: true },

  // Destination routes
  { path: '/destinations-detail/:id', element: <DestinationDetailPage/>, name: 'Detalaipage', showInNav: false },
  { path: '/destinations/:id', element: <DestinationDetailsPage/>, name: 'Destination Details', showInNav: false },
  { path: '/destinations/:id/book', element: <DestinationBookingFlow/>, name: 'Book Destination', showInNav: false },

  // Package routes
  { path: '/packages/:id', element: <PackageDetailsPage/>, name: 'Package Details', showInNav: false },
  { path: '/packages/:id/book', element: <PackageBookingFlow/>, name: 'Book Package', showInNav: false },
  { path: '/packages/:id/book/:destinationId', element: <PackageBookingFlow/>, name: 'Book Package Trip', showInNav: false },

  // Enhanced booking routes
  { path: '/book/:type/:id/:destinationId?', element: <BookingFlowRouter />, name: 'Book Trip', showInNav: false },

  // Legacy booking routes (for backward compatibility)
  { path: '/booking', element: <BookingPage />, name: 'Book Now', showInNav: false },
  { path: '/booking/:packageId', element: <BookingPage />, name: 'Book Package', showInNav: false },
  { path: '/booking/:packageId/:destinationId', element: <BookingPage />, name: 'Book Trip', showInNav: false },

  // User booking routes
  { path: '/my-bookings', element: <MyBookingsPage />, name: 'My Bookings', showInNav: true },
  { path: '/bookings/:bookingId', element: <BookingDetailsPage />, name: 'Booking Details', showInNav: false },

  // 🛡️ Admin routes - Not shown in nav but used in routing
  { path: '/admin/dashboard', element: <AdminDashboard />, name: 'Admin', showInNav: false },
  { path: '/admin/users', element: <AdminUsers />, showInNav: false },
  { path: '/admin/settings', element: <AdminSettings />, showInNav: false },
  { path: '/admin/packages', element: <Packages />, name: 'Packages', showInNav: false },
  { path: '/admin/logout', element: <LogoutPage />, name: 'Logout', showInNav: false },
  { path: '/admin/destinations', element: <AdminDestinationsPage />, name: 'Destinations', showInNav: false },
  { path: '/admin/dash', element: <AdminDeshDashboard />, name: 'Dashboard', showInNav: false },
  { path: '/admin/destinations/create', element: <CreateDestinations />, name: 'Create Destination', showInNav: false },
  { path: '/admin/allusers', element: <AllUsersPage />, name: 'All Users', showInNav: false },
  { path: '/admin/bookings', element: <AdminBookingsPage />, name: 'Bookings', showInNav: false }
];

export default navRoutes;
