import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getPackageById } from '../../redux/packages/packageSlice';
import { getDestinationById } from '../../redux/destinations/destinationSlice';
import PackageDetailsCard from './PackageDetailsCard';
import EnhancedBookingForm from './EnhancedBookingForm';

const PackageBookingFlow = () => {
  const { packageId, destinationId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user } = useSelector(state => state.auth);
  const { packages, loading: packageLoading } = useSelector(state => state.packages);
  const { destinations, loading: destinationLoading } = useSelector(state => state.destinations);
  
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/auth?redirect=' + encodeURIComponent(window.location.pathname));
      return;
    }

    if (packageId) {
      // Check if package is already in state
      const existingPackage = packages.find(p => p._id === packageId);
      if (existingPackage) {
        setSelectedPackage(existingPackage);
      } else {
        dispatch(getPackageById(packageId));
      }
    }

    if (destinationId) {
      // Check if destination is already in state
      const existingDestination = destinations.find(d => d._id === destinationId);
      if (existingDestination) {
        setSelectedDestination(existingDestination);
      } else {
        dispatch(getDestinationById(destinationId));
      }
    }
  }, [dispatch, packageId, destinationId, user, navigate, packages, destinations]);

  useEffect(() => {
    // Update selected package when packages state changes
    if (packageId && packages.length > 0) {
      const pkg = packages.find(p => p._id === packageId);
      if (pkg) {
        setSelectedPackage(pkg);
      }
    }
  }, [packages, packageId]);

  useEffect(() => {
    // Update selected destination when destinations state changes
    if (destinationId && destinations.length > 0) {
      const dest = destinations.find(d => d._id === destinationId);
      if (dest) {
        setSelectedDestination(dest);
      }
    }
  }, [destinations, destinationId]);

  const handleBookNow = () => {
    setShowBookingForm(true);
  };

  const handleBackToPackage = () => {
    setShowBookingForm(false);
  };

  const handleBookingSuccess = (booking) => {
    navigate(`/bookings/${booking._id}/confirmation`, {
      state: { booking, isNewBooking: true }
    });
  };

  if (!user) {
    return null;
  }

  if (packageLoading || destinationLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading package details...</p>
        </div>
      </div>
    );
  }

  if (!selectedPackage) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Package Not Found</h3>
          <p className="mt-1 text-sm text-gray-500">The package you're looking for doesn't exist.</p>
          <div className="mt-6">
            <button
              onClick={() => navigate('/packages')}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Browse Packages
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
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
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                  {showBookingForm ? 'Book Now' : selectedPackage.name}
                </span>
              </div>
            </li>
          </ol>
        </nav>

        {!showBookingForm ? (
          /* Package Details View */
          <div>
            <PackageDetailsCard
              package={selectedPackage}
              destination={selectedDestination}
              onBookNow={handleBookNow}
            />
          </div>
        ) : (
          /* Booking Form View */
          <div>
            <div className="mb-6">
              <button
                onClick={handleBackToPackage}
                className="inline-flex items-center text-blue-600 hover:text-blue-500"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to package details
              </button>
            </div>
            
            <EnhancedBookingForm
              packageData={selectedPackage}
              destinationData={selectedDestination}
              bookingType="package"
              onSuccess={handleBookingSuccess}
              onCancel={handleBackToPackage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PackageBookingFlow;
