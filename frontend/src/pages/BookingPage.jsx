import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getPackageById } from '../redux/packages/packageSlice';
import { getDestinationById } from '../redux/destinations/destinationSlice';
import BookingForm from '../components/bookings/BookingForm';
import Header from '../components/Header';

const BookingPage = () => {
  const { packageId, destinationId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user } = useSelector(state => state.auth);
  const { packages, loading: packageLoading } = useSelector(state => state.packages);
  const { destinations, loading: destinationLoading } = useSelector(state => state.destinations);
  
  const [packageData, setPackageData] = useState(null);
  const [destinationData, setDestinationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is authenticated
    if (!user) {
      navigate('/auth?redirect=/booking');
      return;
    }

    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Load package data
        if (packageId) {
          let pkg = packages.find(p => p._id === packageId);
          if (!pkg) {
            await dispatch(getPackageById(packageId)).unwrap();
            pkg = packages.find(p => p._id === packageId);
          }
          setPackageData(pkg);
        }

        // Load destination data
        if (destinationId) {
          let dest = destinations.find(d => d._id === destinationId);
          if (!dest) {
            await dispatch(getDestinationById(destinationId)).unwrap();
            dest = destinations.find(d => d._id === destinationId);
          }
          setDestinationData(dest);
        }

        // If no specific package/destination, we might be coming from a general booking page
        if (!packageId && !destinationId) {
          setError('Please select a package and destination to proceed with booking.');
        }

      } catch (err) {
        console.error('Error loading booking data:', err);
        setError('Failed to load booking information. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [packageId, destinationId, user, navigate, dispatch, packages, destinations]);

  const handleBookingSuccess = (booking) => {
    // Navigate to booking confirmation page
    navigate(`/bookings/${booking._id}/confirmation`, {
      state: { booking, isNewBooking: true }
    });
  };

  const handleBookingCancel = () => {
    // Navigate back to the previous page or packages page
    navigate(-1);
  };

  if (!user) {
    return null; // Will redirect to auth
  }

  if (loading || packageLoading || destinationLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading booking information...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Booking Error</h3>
              <p className="mt-1 text-sm text-gray-500">{error}</p>
              <div className="mt-6">
                <button
                  onClick={() => navigate('/packages')}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Browse Packages
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <a href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                  Home
                </a>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <a href="/packages" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2">
                    Packages
                  </a>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">Book Now</span>
                </div>
              </li>
            </ol>
          </nav>
          
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Create Your Booking</h1>
          <p className="mt-2 text-gray-600">
            Complete the form below to book your dream vacation
          </p>
        </div>

        {/* Package/Destination Info */}
        {(packageData || destinationData) && (
          <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Selected Package</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {packageData && (
                  <div>
                    <h3 className="font-medium text-gray-900">{packageData.name}</h3>
                    <p className="text-gray-600 mt-1">{packageData.description}</p>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <span>Duration: {packageData.duration} days</span>
                      <span className="mx-2">•</span>
                      <span>Starting from ${packageData.pricing?.basePrice}</span>
                    </div>
                  </div>
                )}
                {destinationData && (
                  <div>
                    <h3 className="font-medium text-gray-900">{destinationData.name}</h3>
                    <p className="text-gray-600 mt-1">{destinationData.description}</p>
                    <div className="mt-2 text-sm text-gray-500">
                      <span>{destinationData.country}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Booking Form */}
        <BookingForm
          packageData={packageData}
          destinationData={destinationData}
          onSuccess={handleBookingSuccess}
          onCancel={handleBookingCancel}
        />
      </div>
    </div>
  );
};

export default BookingPage;
