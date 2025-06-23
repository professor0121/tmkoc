import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getDestinationById } from '../../redux/destinations/destinationSlice';
import { getAllPackages } from '../../redux/packages/packageSlice';
import PackageSelectionCard from './PackageSelectionCard';
import CustomBookingForm from './CustomBookingForm';

const DestinationBookingFlow = () => {
  const { destinationId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user } = useSelector(state => state.auth);
  const { currentDestination, loading: destinationLoading } = useSelector(state => state.destinations);
  const { packages, loading: packagesLoading } = useSelector(state => state.packages);
  
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [bookingType, setBookingType] = useState('package'); // 'package' or 'custom'
  const [availablePackages, setAvailablePackages] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate('/auth?redirect=' + encodeURIComponent(window.location.pathname));
      return;
    }

    if (destinationId) {
      dispatch(getDestinationById(destinationId));
      dispatch(getAllPackages());
    }
  }, [dispatch, destinationId, user, navigate]);

  useEffect(() => {
    if (currentDestination && packages) {
      // Filter packages that include this destination
      const destinationPackages = packages.filter(pkg => 
        pkg.destinations?.some(dest => dest._id === destinationId || dest === destinationId) ||
        pkg.destination?._id === destinationId ||
        pkg.destination === destinationId
      );
      setAvailablePackages(destinationPackages);
    }
  }, [currentDestination, packages, destinationId]);

  const handlePackageSelect = (packageData) => {
    setSelectedPackage(packageData);
    setBookingType('package');
  };

  const handleCustomBooking = () => {
    setSelectedPackage(null);
    setBookingType('custom');
  };

  const handleBookingSuccess = (booking) => {
    navigate(`/bookings/${booking._id}/confirmation`, {
      state: { booking, isNewBooking: true }
    });
  };

  const handleBackToSelection = () => {
    setSelectedPackage(null);
    setBookingType('package');
  };

  if (!user) {
    return null;
  }

  if (destinationLoading || packagesLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading destination details...</p>
        </div>
      </div>
    );
  }

  if (!currentDestination) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Destination Not Found</h3>
          <p className="mt-1 text-sm text-gray-500">The destination you're looking for doesn't exist.</p>
          <div className="mt-6">
            <button
              onClick={() => navigate('/destinations')}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Browse Destinations
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Destination Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="relative h-64 md:h-80">
            <img
              src={currentDestination.images?.[0] || '/api/placeholder/800/400'}
              alt={currentDestination.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
              <div className="p-6 text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{currentDestination.name}</h1>
                <p className="text-lg opacity-90">{currentDestination.country}</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <p className="text-gray-600 mb-4">{currentDestination.description}</p>
            <div className="flex flex-wrap gap-2">
              {currentDestination.highlights?.map((highlight, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Options */}
        {!selectedPackage && bookingType === 'package' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Choose Your Booking Option</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Package Booking Option */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0">
                      <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">Pre-designed Packages</h3>
                      <p className="text-gray-600">Choose from our curated travel packages</p>
                    </div>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1 mb-4">
                    <li>• Carefully planned itineraries</li>
                    <li>• Best value for money</li>
                    <li>• Includes accommodation & activities</li>
                    <li>• Expert local guides</li>
                  </ul>
                  <p className="text-sm text-green-600 font-medium">
                    {availablePackages.length} packages available for this destination
                  </p>
                </div>

                {/* Custom Booking Option */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0">
                      <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">Custom Trip</h3>
                      <p className="text-gray-600">Create your own personalized itinerary</p>
                    </div>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1 mb-4">
                    <li>• Fully customizable experience</li>
                    <li>• Choose your own activities</li>
                    <li>• Flexible dates and duration</li>
                    <li>• Personal travel consultant</li>
                  </ul>
                  <button
                    onClick={handleCustomBooking}
                    className="w-full mt-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                  >
                    Create Custom Trip
                  </button>
                </div>
              </div>
            </div>

            {/* Available Packages */}
            {availablePackages.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Available Packages</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {availablePackages.map((pkg) => (
                    <PackageSelectionCard
                      key={pkg._id}
                      package={pkg}
                      destination={currentDestination}
                      onSelect={() => handlePackageSelect(pkg)}
                    />
                  ))}
                </div>
              </div>
            )}

            {availablePackages.length === 0 && (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No packages available</h3>
                <p className="mt-1 text-sm text-gray-500">
                  No pre-designed packages are currently available for this destination.
                </p>
                <div className="mt-6">
                  <button
                    onClick={handleCustomBooking}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                  >
                    Create Custom Trip
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Custom Booking Form */}
        {bookingType === 'custom' && (
          <CustomBookingForm
            destination={currentDestination}
            onSuccess={handleBookingSuccess}
            onBack={handleBackToSelection}
          />
        )}

        {/* Package Booking Form */}
        {selectedPackage && bookingType === 'package' && (
          <div>
            <div className="mb-6">
              <button
                onClick={handleBackToSelection}
                className="inline-flex items-center text-blue-600 hover:text-blue-500"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to package selection
              </button>
            </div>
            {/* This will be handled by the existing BookingForm component */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Booking: {selectedPackage.name}
              </h3>
              <p className="text-gray-600 mb-4">
                You'll be redirected to complete your booking for this package.
              </p>
              <button
                onClick={() => navigate(`/booking/${selectedPackage._id}/${destinationId}`)}
                className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
              >
                Continue to Booking
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationBookingFlow;
