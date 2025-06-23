import React, { useState } from 'react';

const AdminBookingCard = ({ booking, isSelected, onSelect, onViewDetails, onUpdateStatus }) => {
  const [isUpdating, setIsUpdating] = useState(false);

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

  const handleStatusUpdate = async (newStatus) => {
    if (window.confirm(`Are you sure you want to update this booking status to ${newStatus}?`)) {
      setIsUpdating(true);
      try {
        await onUpdateStatus(newStatus);
      } catch (err) {
        console.error('Failed to update status:', err);
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const getCustomerInfo = () => {
    if (booking.user) {
      return `${booking.user.firstName} ${booking.user.lastName}`;
    }
    return booking.emergencyContact?.name || 'Unknown Customer';
  };

  const getCustomerEmail = () => {
    return booking.user?.email || booking.emergencyContact?.email || 'No email';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6">
        {/* Header with Checkbox */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => onSelect(e.target.checked)}
              className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {booking.package?.name || 'Package Name'}
              </h3>
              <p className="text-sm text-gray-600">
                Booking ID: {booking.bookingId}
              </p>
              <p className="text-sm text-gray-500">
                Customer: {getCustomerInfo()}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
              {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1)}
            </span>
            <p className="text-lg font-semibold text-gray-900">
              {formatCurrency(booking.pricing?.totalAmount, booking.pricing?.currency)}
            </p>
          </div>
        </div>

        {/* Customer and Booking Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">Customer Email</p>
            <p className="font-medium text-gray-900 text-sm">{getCustomerEmail()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Destination</p>
            <p className="font-medium text-gray-900 text-sm">
              {booking.destination?.name}, {booking.destination?.country}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Travel Dates</p>
            <p className="font-medium text-gray-900 text-sm">
              {formatDate(booking.bookingDetails?.travelDates?.startDate)} - {formatDate(booking.bookingDetails?.travelDates?.endDate)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Booked On</p>
            <p className="font-medium text-gray-900 text-sm">
              {formatDate(booking.createdAt)}
            </p>
          </div>
        </div>

        {/* Travelers and Payment Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">Travelers</p>
            <p className="font-medium text-gray-900">
              {(booking.bookingDetails?.travelers?.adults || 0) + 
               (booking.bookingDetails?.travelers?.children || 0) + 
               (booking.bookingDetails?.travelers?.infants || 0)} people
            </p>
            <p className="text-xs text-gray-500">
              {booking.bookingDetails?.travelers?.adults}A, {booking.bookingDetails?.travelers?.children}C, {booking.bookingDetails?.travelers?.infants}I
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
            <p className="text-sm text-gray-500">Payment Status</p>
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getPaymentStatusColor(booking.paymentStatus)}`}>
              {booking.paymentStatus?.charAt(0).toUpperCase() + booking.paymentStatus?.slice(1)}
            </span>
          </div>
        </div>

        {/* Emergency Contact */}
        {booking.emergencyContact && (
          <div className="mb-4 p-3 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-500 mb-1">Emergency Contact</p>
            <p className="text-sm font-medium text-gray-900">
              {booking.emergencyContact.name} ({booking.emergencyContact.relationship})
            </p>
            <p className="text-sm text-gray-600">
              {booking.emergencyContact.phone} • {booking.emergencyContact.email}
            </p>
          </div>
        )}

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
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View Details
          </button>

          {/* Status Update Buttons */}
          {booking.status === 'draft' && (
            <button
              onClick={() => handleStatusUpdate('confirmed')}
              disabled={isUpdating}
              className="inline-flex items-center px-3 py-2 border border-green-300 shadow-sm text-sm leading-4 font-medium rounded-md text-green-700 bg-white hover:bg-green-50 disabled:opacity-50"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Confirm
            </button>
          )}

          {booking.status === 'confirmed' && (
            <>
              <button
                onClick={() => handleStatusUpdate('completed')}
                disabled={isUpdating}
                className="inline-flex items-center px-3 py-2 border border-blue-300 shadow-sm text-sm leading-4 font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 disabled:opacity-50"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Complete
              </button>
              <button
                onClick={() => handleStatusUpdate('cancelled')}
                disabled={isUpdating}
                className="inline-flex items-center px-3 py-2 border border-red-300 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50 disabled:opacity-50"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </button>
            </>
          )}

          {/* Contact Customer */}
          <a
            href={`mailto:${getCustomerEmail()}`}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Email
          </a>

          {/* Download Confirmation */}
          {booking.status === 'confirmed' && (
            <button
              onClick={() => window.open(`/bookings/${booking._id}/confirmation`, '_blank')}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBookingCard;
