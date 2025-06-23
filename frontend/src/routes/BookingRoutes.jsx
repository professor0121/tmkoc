import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
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

const BookingRoutes = () => {
  return (
    <Routes>
      {/* Main booking flow router - handles /book/:type/:id/:destinationId? */}
      <Route 
        path="/book/:type/:id/:destinationId?" 
        element={
          <ProtectedBookingRoute>
            <BookingFlowRouter />
          </ProtectedBookingRoute>
        } 
      />
      
      {/* Legacy booking routes for backward compatibility */}
      <Route 
        path="/booking/:packageId/:destinationId?" 
        element={
          <ProtectedBookingRoute>
            <PackageBookingFlow />
          </ProtectedBookingRoute>
        } 
      />
      
      {/* Destination-specific booking routes */}
      <Route 
        path="/destinations/:destinationId/book" 
        element={
          <ProtectedBookingRoute>
            <DestinationBookingFlow />
          </ProtectedBookingRoute>
        } 
      />
      
      {/* Package-specific booking routes */}
      <Route 
        path="/packages/:packageId/book/:destinationId?" 
        element={
          <ProtectedBookingRoute>
            <PackageBookingFlow />
          </ProtectedBookingRoute>
        } 
      />
      
      {/* Booking confirmation */}
      <Route 
        path="/bookings/:bookingId/confirmation" 
        element={
          <ProtectedBookingRoute>
            <BookingConfirmation />
          </ProtectedBookingRoute>
        } 
      />
      
      {/* User's bookings */}
      <Route 
        path="/my-bookings" 
        element={
          <ProtectedBookingRoute>
            <MyBookingsPage />
          </ProtectedBookingRoute>
        } 
      />
      
      {/* Individual booking details */}
      <Route 
        path="/bookings/:bookingId" 
        element={
          <ProtectedBookingRoute>
            <BookingDetailsPage />
          </ProtectedBookingRoute>
        } 
      />
      
      {/* Booking error page */}
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
      
      {/* Redirect /bookings to /my-bookings */}
      <Route path="/bookings" element={<Navigate to="/my-bookings" replace />} />
    </Routes>
  );
};

export default BookingRoutes;
