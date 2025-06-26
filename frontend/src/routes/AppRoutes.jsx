// src/routes/AppRoutes.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import navRoutes from './NavRoutes';
import HomePage from '../pages/HomePage';
import AdminLayout from '../pages/admin/AdminLayout'; // 🧱 Import AdminLayout

// Import booking components
import BookingFlowRouter from '../components/bookings/BookingFlowRouter';
import DestinationBookingFlow from '../components/bookings/DestinationBookingFlow';
import PackageBookingFlow from '../components/bookings/PackageBookingFlow';
import BookingConfirmation from '../components/bookings/BookingConfirmation';
import MyBookingsPage from '../pages/MyBookingsPage';
import BookingDetailsPage from '../pages/BookingDetailsPage';

// Protected route wrapper for booking routes
const ProtectedBookingRoute = ({ children }) => {
  const { user } = useSelector(state => state.auth);

  if (!user) {
    const currentPath = window.location.pathname;
    return <Navigate to={`/auth?redirect=${encodeURIComponent(currentPath)}`} replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Booking routes - must come before other routes to avoid conflicts */}
        <Route
          path="/book/destination/:id"
          element={
            <ProtectedBookingRoute>
              <DestinationBookingFlow />
            </ProtectedBookingRoute>
          }
        />

        <Route
          path="/book/package/:id/:destinationId?"
          element={
            <ProtectedBookingRoute>
              <PackageBookingFlow />
            </ProtectedBookingRoute>
          }
        />

        <Route
          path="/book/custom/:id"
          element={
            <ProtectedBookingRoute>
              <BookingFlowRouter />
            </ProtectedBookingRoute>
          }
        />

        <Route
          path="/destinations/:destinationId/book"
          element={
            <ProtectedBookingRoute>
              <DestinationBookingFlow />
            </ProtectedBookingRoute>
          }
        />

        <Route
          path="/packages/:packageId/book/:destinationId?"
          element={
            <ProtectedBookingRoute>
              <PackageBookingFlow />
            </ProtectedBookingRoute>
          }
        />

        <Route
          path="/bookings/:bookingId/confirmation"
          element={
            <ProtectedBookingRoute>
              <BookingConfirmation />
            </ProtectedBookingRoute>
          }
        />

        <Route
          path="/my-bookings"
          element={
            <ProtectedBookingRoute>
              <MyBookingsPage />
            </ProtectedBookingRoute>
          }
        />

        <Route
          path="/bookings/:bookingId"
          element={
            <ProtectedBookingRoute>
              <BookingDetailsPage />
            </ProtectedBookingRoute>
          }
        />

        <Route
          path="/bookings/error"
          element={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <div className="text-center max-w-md mx-auto">
                <svg className="mx-auto h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">Booking Error</h3>
                <p className="mt-1 text-sm text-gray-500">
                  There was an error processing your booking request.
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => window.history.back()}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Go Back
                  </button>
                </div>
              </div>
            </div>
          }
        />

        <Route path="/bookings" element={<Navigate to="/my-bookings" replace />} />

        {/* Regular navigation routes */}
        {navRoutes
          .filter((route) => !route.path.startsWith('/admin'))
          .map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}

        {/* 🛡️ Admin layout routes */}
        <Route path="/admin" element={<AdminLayout />}>
          {navRoutes
            .filter((r) => r.path.startsWith('/admin'))
            .map(({ path, element }) => (
              <Route
                key={path}
                path={path.replace('/admin/', '')}
                element={element}
              />
            ))}
        </Route>

        {/* 404 Fallback */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
