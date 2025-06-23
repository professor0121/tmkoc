import React from 'react';

const BookingCard = ({ booking, onViewDetails, onCancel, onReview }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'draft':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'refunded':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'partial':
        return 'bg-orange-100 text-orange-800';
      case 'refunded':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const canCancel = () => {
    const now = new Date();
    const startDate = new Date(booking.bookingDetails?.travelDates?.startDate);
    const daysDifference = Math.ceil((startDate - now) / (1000 * 60 * 60 * 24));
    
    return booking.status === 'confirmed' && daysDifference > 7; // Can cancel if more than 7 days before travel
  };

  const canReview = () => {
    return booking.status === 'completed' && !booking.review;
  };

  const isUpcoming = () => {
    const now = new Date();
    const startDate = new Date(booking.bookingDetails?.travelDates?.startDate);
    return startDate > now && booking.status === 'confirmed';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {booking.package?.name || 'Package Name'}
            </h3>
            <p className="text-sm text-gray-600">
              Booking ID: {booking.bookingId}
            </p>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
              {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1)}
            </span>
            {isUpcoming() && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Upcoming
              </span>
            )}
          </div>
        </div>

        {/* Destination and Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">Destination</p>
            <p className="font-medium text-gray-900">
              {booking.destination?.name || 'Destination'}, {booking.destination?.country || 'Country'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Travel Dates</p>
            <p className="font-medium text-gray-900">
              {formatDate(booking.bookingDetails?.travelDates?.startDate)} - {formatDate(booking.bookingDetails?.travelDates?.endDate)}
            </p>
          </div>
        </div>

        {/* Travelers and Accommodation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">Travelers</p>
            <p className="font-medium text-gray-900">
              {(booking.bookingDetails?.travelers?.adults || 0) + 
               (booking.bookingDetails?.travelers?.children || 0) + 
               (booking.bookingDetails?.travelers?.infants || 0)} people
            </p>
            <p className="text-xs text-gray-500">
              {booking.bookingDetails?.travelers?.adults} adults, {booking.bookingDetails?.travelers?.children} children
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Accommodation</p>
            <p className="font-medium text-gray-900">
              {booking.bookingDetails?.accommodation?.type?.charAt(0).toUpperCase() + 
               booking.bookingDetails?.accommodation?.type?.slice(1)} - {booking.bookingDetails?.accommodation?.rooms} room(s)
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Amount</p>
            <p className="font-medium text-gray-900">
              {formatCurrency(booking.pricing?.totalAmount, booking.pricing?.currency)}
            </p>
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getPaymentStatusColor(booking.paymentStatus)}`}>
              {booking.paymentStatus?.charAt(0).toUpperCase() + booking.paymentStatus?.slice(1)}
            </span>
          </div>
        </div>

        {/* Special Requests */}
        {booking.specialRequests && booking.specialRequests.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-gray-500">Special Requests</p>
            <p className="text-sm text-gray-700">
              {booking.specialRequests.join(', ')}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
          <button
            onClick={onViewDetails}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View Details
          </button>

          {booking.status === 'confirmed' && (
            <button
              onClick={() => window.open(`/bookings/${booking._id}/confirmation`, '_blank')}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download
            </button>
          )}

          {canCancel() && (
            <button
              onClick={onCancel}
              className="inline-flex items-center px-3 py-2 border border-red-300 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancel
            </button>
          )}

          {canReview() && (
            <button
              onClick={onReview}
              className="inline-flex items-center px-3 py-2 border border-blue-300 shadow-sm text-sm leading-4 font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              Write Review
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
