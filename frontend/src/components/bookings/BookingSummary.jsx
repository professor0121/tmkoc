import React from 'react';

const BookingSummary = ({ formData, packageData, destinationData }) => {
  const accommodationTypes = {
    budget: 'Budget',
    midRange: 'Mid-Range',
    luxury: 'Luxury'
  };

  const roomTypes = {
    standard: 'Standard Room',
    deluxe: 'Deluxe Room',
    suite: 'Suite',
    family: 'Family Room',
    connecting: 'Connecting Rooms'
  };

  const paymentMethods = {
    credit_card: 'Credit Card',
    debit_card: 'Debit Card',
    upi: 'UPI',
    net_banking: 'Net Banking',
    wallet: 'Digital Wallet'
  };

  const relationships = {
    spouse: 'Spouse',
    parent: 'Parent',
    child: 'Child',
    sibling: 'Sibling',
    friend: 'Friend',
    colleague: 'Colleague',
    other: 'Other'
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateDuration = () => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      return days;
    }
    return 0;
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Review Your Booking</h3>
      
      {/* Package and Destination Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
        <h4 className="text-lg font-semibold text-blue-900 mb-3">Trip Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-blue-700 font-medium">Package</p>
            <p className="text-blue-900 font-semibold">{packageData?.name}</p>
            <p className="text-sm text-blue-600 mt-1">{packageData?.description}</p>
          </div>
          <div>
            <p className="text-sm text-blue-700 font-medium">Destination</p>
            <p className="text-blue-900 font-semibold">{destinationData?.name}</p>
            <p className="text-sm text-blue-600 mt-1">{destinationData?.country}</p>
          </div>
        </div>
      </div>

      {/* Travel Details */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Travel Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-medium text-gray-700 mb-2">Travelers</h5>
            <div className="text-sm text-gray-600 space-y-1">
              <p>Adults: {formData.adults}</p>
              <p>Children: {formData.children}</p>
              <p>Infants: {formData.infants}</p>
              <p className="font-medium">
                Total: {parseInt(formData.adults) + parseInt(formData.children) + parseInt(formData.infants)} travelers
              </p>
            </div>
          </div>
          
          <div>
            <h5 className="font-medium text-gray-700 mb-2">Travel Dates</h5>
            <div className="text-sm text-gray-600 space-y-1">
              <p>Start: {formatDate(formData.startDate)}</p>
              <p>End: {formatDate(formData.endDate)}</p>
              <p className="font-medium">Duration: {calculateDuration()} days</p>
            </div>
          </div>
        </div>

        {formData.flightRequired && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h5 className="font-medium text-gray-700 mb-2">Flight Requirements</h5>
            <p className="text-sm text-gray-600">
              Flight arrangements required - {formData.flightClass} class
            </p>
          </div>
        )}
      </div>

      {/* Accommodation Details */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Accommodation</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500">Type</p>
            <p className="font-medium">{accommodationTypes[formData.accommodationType]}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Room Type</p>
            <p className="font-medium">{roomTypes[formData.roomType]}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Number of Rooms</p>
            <p className="font-medium">{formData.rooms}</p>
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium">{formData.emergencyContactName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Relationship</p>
            <p className="font-medium">{relationships[formData.emergencyContactRelationship]}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium">{formData.emergencyContactPhone}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{formData.emergencyContactEmail}</p>
          </div>
        </div>
      </div>

      {/* Special Requests */}
      {formData.specialRequests && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Special Requests</h4>
          <p className="text-gray-600">{formData.specialRequests}</p>
        </div>
      )}

      {/* Payment Information */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h4>
        <div className="mb-4">
          <p className="text-sm text-gray-500">Payment Method</p>
          <p className="font-medium">{paymentMethods[formData.paymentMethod]}</p>
        </div>

        {formData.pricing && (
          <div className="bg-gray-50 p-4 rounded-md">
            <h5 className="font-medium text-gray-900 mb-3">Pricing Breakdown</h5>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Base Price:</span>
                <span>${formData.pricing.basePrice?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Accommodation:</span>
                <span>${formData.pricing.roomPrice?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Taxes:</span>
                <span>${formData.pricing.taxes?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fees:</span>
                <span>${formData.pricing.fees?.toFixed(2)}</span>
              </div>
              {formData.pricing.discounts > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discounts:</span>
                  <span>-${formData.pricing.discounts?.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t pt-2 flex justify-between text-lg font-semibold">
                <span>Total Amount:</span>
                <span className="text-blue-600">${formData.pricing.totalAmount?.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Important Notes */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              Important Information
            </h3>
            <div className="mt-2 text-sm text-yellow-700 space-y-1">
              <p>• Please review all details carefully before confirming your booking</p>
              <p>• A confirmation email will be sent to your registered email address</p>
              <p>• Changes to booking may incur additional charges</p>
              <p>• Ensure all traveler information is accurate for smooth travel</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
