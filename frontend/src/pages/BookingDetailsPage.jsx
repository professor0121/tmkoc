import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getBookingById, cancelBooking, generateBookingConfirmation } from '../redux/bookings/bookingSlice';
import Header from '../components/Header';

const BookingDetailsPage = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user } = useSelector(state => state.auth);
  const { currentBooking, loading, error } = useSelector(state => state.bookings);
  
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/auth?redirect=/my-bookings');
      return;
    }

    if (bookingId) {
      dispatch(getBookingById(bookingId));
    }
  }, [dispatch, bookingId, user, navigate]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

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

  const canCancel = () => {
    if (!currentBooking) return false;
    const now = new Date();
    const startDate = new Date(currentBooking.bookingDetails?.travelDates?.startDate);
    const daysDifference = Math.ceil((startDate - now) / (1000 * 60 * 60 * 24));
    
    return currentBooking.status === 'confirmed' && daysDifference > 7;
  };

  const handleCancelBooking = async () => {
    if (!cancelReason.trim()) {
      alert('Please provide a reason for cancellation');
      return;
    }

    setCancelling(true);
    try {
      await dispatch(cancelBooking({ 
        bookingId: currentBooking._id, 
        reason: cancelReason 
      })).unwrap();
      setShowCancelModal(false);
      setCancelReason('');
    } catch (err) {
      console.error('Failed to cancel booking:', err);
    } finally {
      setCancelling(false);
    }
  };

  const handleDownloadConfirmation = async () => {
    try {
      await dispatch(generateBookingConfirmation(currentBooking._id)).unwrap();
      // In a real app, this would trigger a download
      alert('Confirmation downloaded successfully!');
    } catch (err) {
      console.error('Failed to generate confirmation:', err);
    }
  };

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading booking details...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !currentBooking) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Booking Not Found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {error || 'The booking you are looking for does not exist or you do not have permission to view it.'}
              </p>
              <div className="mt-6">
                <button
                  onClick={() => navigate('/my-bookings')}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Back to My Bookings
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
                <a href="/my-bookings" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2">
                  My Bookings
                </a>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">Booking Details</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {currentBooking.package?.name || 'Package Name'}
              </h1>
              <p className="text-gray-600 mt-1">
                Booking ID: {currentBooking.bookingId}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Booked on {formatDate(currentBooking.createdAt)}
              </p>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(currentBooking.status)}`}>
                {currentBooking.status?.charAt(0).toUpperCase() + currentBooking.status?.slice(1)}
              </span>
              <p className="text-lg font-semibold text-gray-900">
                {formatCurrency(currentBooking.pricing?.totalAmount, currentBooking.pricing?.currency)}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-6">
          {currentBooking.status === 'confirmed' && (
            <button
              onClick={handleDownloadConfirmation}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Confirmation
            </button>
          )}
          
          {canCancel() && (
            <button
              onClick={() => setShowCancelModal(true)}
              className="inline-flex items-center px-4 py-2 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancel Booking
            </button>
          )}

          {currentBooking.status === 'completed' && !currentBooking.review && (
            <button
              onClick={() => navigate(`/bookings/${currentBooking._id}/review`)}
              className="inline-flex items-center px-4 py-2 border border-blue-300 shadow-sm text-sm font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              Write Review
            </button>
          )}
        </div>

        {/* Booking Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Trip Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Trip Information</h2>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Destination</p>
                <p className="font-medium text-gray-900">
                  {currentBooking.destination?.name}, {currentBooking.destination?.country}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Start Date</p>
                  <p className="font-medium text-gray-900">
                    {formatDate(currentBooking.bookingDetails?.travelDates?.startDate)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">End Date</p>
                  <p className="font-medium text-gray-900">
                    {formatDate(currentBooking.bookingDetails?.travelDates?.endDate)}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-medium text-gray-900">
                  {Math.ceil((new Date(currentBooking.bookingDetails?.travelDates?.endDate) - 
                             new Date(currentBooking.bookingDetails?.travelDates?.startDate)) / 
                             (1000 * 60 * 60 * 24))} days
                </p>
              </div>
            </div>
          </div>

          {/* Traveler Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Traveler Information</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Adults</p>
                  <p className="font-medium text-gray-900">
                    {currentBooking.bookingDetails?.travelers?.adults}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Children</p>
                  <p className="font-medium text-gray-900">
                    {currentBooking.bookingDetails?.travelers?.children}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Infants</p>
                  <p className="font-medium text-gray-900">
                    {currentBooking.bookingDetails?.travelers?.infants}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">Total Travelers</p>
                <p className="font-medium text-gray-900">
                  {(currentBooking.bookingDetails?.travelers?.adults || 0) + 
                   (currentBooking.bookingDetails?.travelers?.children || 0) + 
                   (currentBooking.bookingDetails?.travelers?.infants || 0)} people
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cancel Modal */}
        {showCancelModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Cancel Booking</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Please provide a reason for cancelling this booking:
                </p>
                <textarea
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter cancellation reason..."
                />
                <div className="flex justify-end space-x-3 mt-4">
                  <button
                    onClick={() => setShowCancelModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCancelBooking}
                    disabled={cancelling || !cancelReason.trim()}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                  >
                    {cancelling ? 'Cancelling...' : 'Confirm Cancellation'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingDetailsPage;
