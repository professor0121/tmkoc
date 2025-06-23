import React from 'react';
import { formatDate, formatCurrency, calculateTotalTravelers } from '../../utils/bookingUtils';

const BookingConfirmation = ({ booking, isNewBooking = false }) => {
  if (!booking) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No booking information available</p>
      </div>
    );
  }

  const totalTravelers = calculateTotalTravelers(booking.bookingDetails?.travelers);

  return (
    <div className="max-w-4xl mx-auto bg-white">
      {/* Header */}
      <div className="text-center py-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-2">
          {isNewBooking ? 'Booking Confirmed!' : 'Booking Confirmation'}
        </h1>
        <p className="text-blue-100">
          {isNewBooking 
            ? 'Thank you for your booking. Your trip details are confirmed below.'
            : 'Here are your confirmed trip details.'
          }
        </p>
      </div>

      <div className="p-8">
        {/* Booking Reference */}
        <div className="text-center mb-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Booking Reference</p>
          <p className="text-2xl font-bold text-gray-900">{booking.bookingId}</p>
          <p className="text-sm text-gray-500 mt-1">
            Please keep this reference number for your records
          </p>
        </div>

        {/* Trip Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Trip Details</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Package</p>
                <p className="font-semibold text-gray-900">{booking.package?.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Destination</p>
                <p className="font-semibold text-gray-900">
                  {booking.destination?.name}, {booking.destination?.country}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Departure</p>
                  <p className="font-semibold text-gray-900">
                    {formatDate(booking.bookingDetails?.travelDates?.startDate)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Return</p>
                  <p className="font-semibold text-gray-900">
                    {formatDate(booking.bookingDetails?.travelDates?.endDate)}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Duration</p>
                <p className="font-semibold text-gray-900">
                  {Math.ceil((new Date(booking.bookingDetails?.travelDates?.endDate) - 
                             new Date(booking.bookingDetails?.travelDates?.startDate)) / 
                             (1000 * 60 * 60 * 24))} days
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Traveler Information</h2>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Adults</p>
                  <p className="font-semibold text-gray-900">
                    {booking.bookingDetails?.travelers?.adults}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Children</p>
                  <p className="font-semibold text-gray-900">
                    {booking.bookingDetails?.travelers?.children}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Infants</p>
                  <p className="font-semibold text-gray-900">
                    {booking.bookingDetails?.travelers?.infants}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Travelers</p>
                <p className="font-semibold text-gray-900">{totalTravelers} people</p>
              </div>
            </div>
          </div>
        </div>

        {/* Accommodation Details */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Accommodation</h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Type</p>
                <p className="font-semibold text-gray-900">
                  {booking.bookingDetails?.accommodation?.type?.charAt(0).toUpperCase() + 
                   booking.bookingDetails?.accommodation?.type?.slice(1)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Room Type</p>
                <p className="font-semibold text-gray-900">
                  {booking.bookingDetails?.accommodation?.roomType?.replace('_', ' ')}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Rooms</p>
                <p className="font-semibold text-gray-900">
                  {booking.bookingDetails?.accommodation?.rooms}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Emergency Contact</h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-semibold text-gray-900">{booking.emergencyContact?.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Relationship</p>
                <p className="font-semibold text-gray-900">{booking.emergencyContact?.relationship}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-semibold text-gray-900">{booking.emergencyContact?.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold text-gray-900">{booking.emergencyContact?.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Special Requests */}
        {booking.specialRequests && booking.specialRequests.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Special Requests</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <ul className="list-disc list-inside space-y-1">
                {booking.specialRequests.map((request, index) => (
                  <li key={index} className="text-gray-700">{request}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Pricing Breakdown */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Pricing Details</h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Base Price:</span>
                <span className="font-medium">
                  {formatCurrency(booking.pricing?.basePrice, booking.pricing?.currency)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Accommodation:</span>
                <span className="font-medium">
                  {formatCurrency(booking.pricing?.roomPrice, booking.pricing?.currency)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Taxes:</span>
                <span className="font-medium">
                  {formatCurrency(booking.pricing?.taxes, booking.pricing?.currency)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fees:</span>
                <span className="font-medium">
                  {formatCurrency(booking.pricing?.fees, booking.pricing?.currency)}
                </span>
              </div>
              {booking.pricing?.discounts > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discounts:</span>
                  <span className="font-medium">
                    -{formatCurrency(booking.pricing.discounts, booking.pricing?.currency)}
                  </span>
                </div>
              )}
              <div className="border-t pt-2 flex justify-between text-lg font-semibold">
                <span>Total Amount:</span>
                <span className="text-blue-600">
                  {formatCurrency(booking.pricing?.totalAmount, booking.pricing?.currency)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Important Information */}
        <div className="mb-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Information</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Please arrive at the departure point 30 minutes before scheduled time</li>
            <li>• Carry valid identification documents for all travelers</li>
            <li>• Check weather conditions and pack accordingly</li>
            <li>• Contact us immediately if you need to make any changes</li>
            <li>• Cancellation charges may apply as per our policy</li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="text-center bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h3>
          <p className="text-gray-600 mb-4">
            Our customer support team is here to assist you with any questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6">
            <div className="flex items-center">
              <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-sm text-gray-700">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-sm text-gray-700">support@tmkoctourism.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
