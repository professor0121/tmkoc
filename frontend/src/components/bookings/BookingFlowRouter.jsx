import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DestinationBookingFlow from './DestinationBookingFlow';
import PackageBookingFlow from './PackageBookingFlow';
import BookingForm from './BookingForm';

const BookingFlowRouter = () => {
  const { type, id, destinationId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector(state => state.auth);
  
  const [bookingType, setBookingType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user) {
      const redirectUrl = encodeURIComponent(location.pathname + location.search);
      navigate(`/auth?redirect=${redirectUrl}`);
      return;
    }

    // Determine booking type based on URL parameters
    determineBookingType();
  }, [user, type, id, destinationId, location, navigate]);

  const determineBookingType = () => {
    setLoading(true);
    
    try {
      // Parse URL patterns to determine booking flow
      if (type === 'destination' && id) {
        // URL: /book/destination/:destinationId
        setBookingType({
          flow: 'destination',
          destinationId: id,
          packageId: null
        });
      } else if (type === 'package' && id) {
        if (destinationId) {
          // URL: /book/package/:packageId/:destinationId
          setBookingType({
            flow: 'package',
            packageId: id,
            destinationId: destinationId
          });
        } else {
          // URL: /book/package/:packageId
          setBookingType({
            flow: 'package',
            packageId: id,
            destinationId: null
          });
        }
      } else if (type === 'custom' && id) {
        // URL: /book/custom/:destinationId
        setBookingType({
          flow: 'custom',
          destinationId: id,
          packageId: null
        });
      } else {
        // Invalid URL pattern
        setBookingType({
          flow: 'error',
          error: 'Invalid booking URL'
        });
      }
    } catch (error) {
      console.error('Error determining booking type:', error);
      setBookingType({
        flow: 'error',
        error: 'Failed to determine booking type'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBookingSuccess = (booking) => {
    // Redirect to confirmation page
    navigate(`/bookings/${booking._id}/confirmation`, {
      state: { 
        booking, 
        isNewBooking: true,
        bookingType: bookingType.flow
      }
    });
  };

  const handleBookingError = (error) => {
    console.error('Booking error:', error);
    // Could redirect to an error page or show error message
    navigate('/bookings/error', {
      state: { error }
    });
  };

  const handleCancel = () => {
    // Navigate back based on booking type
    if (bookingType?.flow === 'destination') {
      navigate(`/destinations/${bookingType.destinationId}`);
    } else if (bookingType?.flow === 'package') {
      navigate(`/packages/${bookingType.packageId}`);
    } else {
      navigate('/');
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Preparing your booking...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (bookingType?.flow === 'error') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <svg className="mx-auto h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Booking Error</h3>
          <p className="mt-1 text-sm text-gray-500">
            {bookingType.error || 'Something went wrong with your booking request.'}
          </p>
          <div className="mt-6 space-y-3">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Go Home
            </button>
            <button
              onClick={() => navigate('/destinations')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 ml-3"
            >
              Browse Destinations
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render appropriate booking flow
  switch (bookingType?.flow) {
    case 'destination':
      return (
        <DestinationBookingFlow
          destinationId={bookingType.destinationId}
          onSuccess={handleBookingSuccess}
          onError={handleBookingError}
          onCancel={handleCancel}
        />
      );

    case 'package':
      return (
        <PackageBookingFlow
          packageId={bookingType.packageId}
          destinationId={bookingType.destinationId}
          onSuccess={handleBookingSuccess}
          onError={handleBookingError}
          onCancel={handleCancel}
        />
      );

    case 'custom':
      return (
        <DestinationBookingFlow
          destinationId={bookingType.destinationId}
          forceCustom={true}
          onSuccess={handleBookingSuccess}
          onError={handleBookingError}
          onCancel={handleCancel}
        />
      );

    default:
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Unknown Booking Type</h3>
            <p className="mt-1 text-sm text-gray-500">
              We couldn't determine what you're trying to book.
            </p>
            <div className="mt-6">
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Start Over
              </button>
            </div>
          </div>
        </div>
      );
  }
};

// Helper component for URL-based booking routing
export const BookingRouter = () => {
  const location = useLocation();
  
  // Parse different URL patterns and route to appropriate components
  const getBookingComponent = () => {
    const path = location.pathname;
    
    // Pattern: /destinations/:id/book
    if (path.match(/^\/destinations\/[^/]+\/book$/)) {
      const destinationId = path.split('/')[2];
      return <DestinationBookingFlow destinationId={destinationId} />;
    }
    
    // Pattern: /packages/:id/book
    if (path.match(/^\/packages\/[^/]+\/book$/)) {
      const packageId = path.split('/')[2];
      return <PackageBookingFlow packageId={packageId} />;
    }
    
    // Pattern: /booking/:packageId/:destinationId (legacy support)
    if (path.match(/^\/booking\/[^/]+\/[^/]+$/)) {
      const [, , packageId, destinationId] = path.split('/');
      return <PackageBookingFlow packageId={packageId} destinationId={destinationId} />;
    }
    
    // Pattern: /booking/:packageId (legacy support)
    if (path.match(/^\/booking\/[^/]+$/)) {
      const packageId = path.split('/')[2];
      return <PackageBookingFlow packageId={packageId} />;
    }
    
    // Default to main booking router
    return <BookingFlowRouter />;
  };
  
  return getBookingComponent();
};

// Quick booking component for CTAs
export const QuickBookingButton = ({ 
  type, 
  id, 
  destinationId = null, 
  className = '',
  children = 'Book Now'
}) => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  
  const handleQuickBook = () => {
    if (!user) {
      const bookingUrl = generateBookingUrl(type, id, destinationId);
      navigate(`/auth?redirect=${encodeURIComponent(bookingUrl)}`);
      return;
    }
    
    const url = generateBookingUrl(type, id, destinationId);
    navigate(url);
  };
  
  return (
    <button
      onClick={handleQuickBook}
      className={`inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${className}`}
    >
      {children}
    </button>
  );
};

// Utility function to generate booking URLs
export const generateBookingUrl = (type, id, destinationId = null) => {
  switch (type) {
    case 'destination':
      return `/book/destination/${id}`;
    case 'package':
      return destinationId ? `/book/package/${id}/${destinationId}` : `/book/package/${id}`;
    case 'custom':
      return `/book/custom/${id}`;
    default:
      return '/';
  }
};

// Hook for booking navigation
export const useBookingNavigation = () => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  
  const navigateToBooking = (type, id, destinationId = null) => {
    const url = generateBookingUrl(type, id, destinationId);
    console.log('navigateToBooking called:', { type, id, destinationId, url, user });

    if (!user) {
      console.log('User not logged in, redirecting to auth');
      navigate(`/auth?redirect=${encodeURIComponent(url)}`);
    } else {
      console.log('Navigating to booking URL:', url);
      navigate(url);
    }
  };
  
  return { navigateToBooking };
};

export default BookingFlowRouter;
