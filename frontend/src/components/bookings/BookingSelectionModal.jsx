import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPackages } from '../../redux/packages/packageSlice';
import { useBookingNavigation } from './BookingFlowRouter';
import { formatCurrency } from '../../utils/bookingUtils';

const BookingSelectionModal = ({ 
  isOpen, 
  onClose, 
  destination = null, 
  package: selectedPackage = null,
  title = "Choose Your Booking Option"
}) => {
  const dispatch = useDispatch();
  const { navigateToBooking } = useBookingNavigation();
  const { packages, loading } = useSelector(state => state.packages);
  
  const [availablePackages, setAvailablePackages] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (isOpen && !packages.length) {
      dispatch(getAllPackages());
    }
  }, [isOpen, packages.length, dispatch]);

  useEffect(() => {
    if (destination && packages.length > 0) {
      // Filter packages for this destination
      const destinationPackages = packages.filter(pkg => 
        pkg.destinations?.some(dest => 
          (typeof dest === 'object' ? dest._id : dest) === destination._id
        ) ||
        (typeof pkg.destination === 'object' ? pkg.destination._id : pkg.destination) === destination._id
      );
      setAvailablePackages(destinationPackages);
    }
  }, [destination, packages]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleProceed = () => {
    if (!selectedOption) return;

    onClose();

    if (selectedOption.type === 'package') {
      navigateToBooking('package', selectedOption.id, destination?._id);
    } else if (selectedOption.type === 'custom') {
      navigateToBooking('custom', destination._id);
    } else if (selectedOption.type === 'destination') {
      navigateToBooking('destination', destination._id);
    }
  };

  const formatDuration = (duration) => {
    if (typeof duration === 'object' && duration.days) {
      return `${duration.days} days${duration.nights ? ` / ${duration.nights} nights` : ''}`;
    }
    return `${duration || 0} days`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        ></div>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          {/* Header */}
          <div className="bg-white px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">
                {title}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {destination && (
              <p className="mt-1 text-sm text-gray-600">
                Booking options for {destination.name}, {destination.country}
              </p>
            )}
          </div>

          {/* Content */}
          <div className="bg-white px-6 py-6">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading options...</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Quick Booking Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Package Booking */}
                  {availablePackages.length > 0 && (
                    <div
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedOption?.type === 'packages' 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleOptionSelect({ type: 'packages', id: null })}
                    >
                      <div className="flex items-center mb-3">
                        <div className="flex-shrink-0">
                          <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h4 className="text-lg font-semibold text-gray-900">Pre-designed Packages</h4>
                          <p className="text-sm text-gray-600">Choose from curated travel packages</p>
                        </div>
                      </div>
                      <p className="text-sm text-green-600 font-medium">
                        {availablePackages.length} packages available
                      </p>
                    </div>
                  )}

                  {/* Custom Booking */}
                  <div
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedOption?.type === 'custom' 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleOptionSelect({ type: 'custom', id: destination?._id })}
                  >
                    <div className="flex items-center mb-3">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-lg font-semibold text-gray-900">Custom Trip</h4>
                        <p className="text-sm text-gray-600">Create your personalized itinerary</p>
                      </div>
                    </div>
                    <p className="text-sm text-green-600 font-medium">
                      Fully customizable experience
                    </p>
                  </div>
                </div>

                {/* Available Packages */}
                {selectedOption?.type === 'packages' && availablePackages.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Select a Package</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                      {availablePackages.map((pkg) => (
                        <div
                          key={pkg._id}
                          className={`border rounded-lg p-4 cursor-pointer transition-all ${
                            selectedOption?.id === pkg._id 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => handleOptionSelect({ type: 'package', id: pkg._id })}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-semibold text-gray-900 text-sm">{pkg.name}</h5>
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                              {formatDuration(pkg.duration)}
                            </span>
                          </div>
                          
                          <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                            {pkg.description}
                          </p>
                          
                          <div className="flex justify-between items-center">
                            <div className="text-sm">
                              {pkg.pricing?.originalPrice && pkg.pricing.originalPrice > pkg.pricing.basePrice && (
                                <span className="text-xs text-gray-500 line-through">
                                  {formatCurrency(pkg.pricing.originalPrice)}
                                </span>
                              )}
                              <div className="font-bold text-gray-900">
                                {formatCurrency(pkg.pricing?.basePrice || pkg.price || 0)}
                                <span className="text-xs font-normal text-gray-600"> / person</span>
                              </div>
                            </div>
                            
                            {pkg.rating && (
                              <div className="flex items-center">
                                <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="ml-1 text-xs text-gray-600">{pkg.rating}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* No packages available */}
                {availablePackages.length === 0 && !loading && (
                  <div className="text-center py-8">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No packages available</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      No pre-designed packages are available for this destination.
                    </p>
                    <div className="mt-6">
                      <button
                        onClick={() => handleOptionSelect({ type: 'custom', id: destination?._id })}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                      >
                        Create Custom Trip
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleProceed}
              disabled={!selectedOption}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                selectedOption
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSelectionModal;
