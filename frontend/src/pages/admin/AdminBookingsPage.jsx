import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllBookings, getBookingStatistics, updateBookingStatus } from '../../redux/bookings/bookingSlice';
import AdminBookingCard from '../../components/admin/AdminBookingCard';
import BookingFilters from '../../components/admin/BookingFilters';
import BookingStatistics from '../../components/admin/BookingStatistics';

const AdminBookingsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user } = useSelector(state => state.auth);
  const { bookings, statistics, loading, error, filters } = useSelector(state => state.bookings);

  // Ensure filters has default values
  const safeFilters = filters || {
    status: '',
    dateRange: { start: '', end: '' },
    destination: '',
    package: ''
  };
  
  const [activeTab, setActiveTab] = useState('all');
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBookings, setSelectedBookings] = useState([]);

  // Initialize filteredBookings with empty array to prevent filter errors
  useEffect(() => {
    if (!Array.isArray(filteredBookings)) {
      setFilteredBookings([]);
    }
  }, []);

  useEffect(() => {
    // Check if user is admin
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    // Load bookings and statistics
    dispatch(getAllBookings());
    dispatch(getBookingStatistics());
  }, [dispatch, user, navigate]);

  useEffect(() => {
    // Apply filters and tab selection
    // Ensure bookings is an array before filtering
    if (!Array.isArray(bookings)) {
      setFilteredBookings([]);
      return;
    }

    let filtered = [...bookings]; // Create a copy to avoid mutating original array

    // Apply tab filter
    switch (activeTab) {
      case 'confirmed':
        filtered = filtered.filter(booking => booking.status === 'confirmed');
        break;
      case 'cancelled':
        filtered = filtered.filter(booking => booking.status === 'cancelled');
        break;
      case 'completed':
        filtered = filtered.filter(booking => booking.status === 'completed');
        break;
      case 'pending':
        filtered = filtered.filter(booking => booking.status === 'draft');
        break;
      default:
        // 'all' - no additional filtering
        break;
    }

    // Apply additional filters
    if (safeFilters.status && safeFilters.status !== activeTab) {
      filtered = filtered.filter(booking => booking.status === safeFilters.status);
    }

    if (safeFilters.destination) {
      filtered = filtered.filter(booking =>
        booking.destination?._id === safeFilters.destination ||
        booking.destination?.name?.toLowerCase().includes(safeFilters.destination.toLowerCase())
      );
    }

    if (safeFilters.package) {
      filtered = filtered.filter(booking =>
        booking.package?._id === safeFilters.package ||
        booking.package?.name?.toLowerCase().includes(safeFilters.package.toLowerCase())
      );
    }

    if (safeFilters.dateRange?.start && safeFilters.dateRange?.end) {
      filtered = filtered.filter(booking => {
        const bookingDate = new Date(booking.createdAt);
        const startDate = new Date(safeFilters.dateRange.start);
        const endDate = new Date(safeFilters.dateRange.end);
        return bookingDate >= startDate && bookingDate <= endDate;
      });
    }

    setFilteredBookings(filtered);
  }, [activeTab, bookings, safeFilters]);

  // Ensure bookings is an array before calculating counts
  const safeBookings = Array.isArray(bookings) ? bookings : [];

  // Additional safety check for filteredBookings
  const safeFilteredBookings = Array.isArray(filteredBookings) ? filteredBookings : [];

  const tabs = [
    { id: 'all', label: 'All Bookings', count: safeBookings.length },
    { id: 'confirmed', label: 'Confirmed', count: safeBookings.filter(b => b?.status === 'confirmed').length },
    { id: 'pending', label: 'Pending', count: safeBookings.filter(b => b?.status === 'draft').length },
    { id: 'completed', label: 'Completed', count: safeBookings.filter(b => b?.status === 'completed').length },
    { id: 'cancelled', label: 'Cancelled', count: safeBookings.filter(b => b?.status === 'cancelled').length }
  ];

  const handleBulkStatusUpdate = async (newStatus) => {
    if (selectedBookings.length === 0) {
      alert('Please select bookings to update');
      return;
    }

    if (window.confirm(`Are you sure you want to update ${selectedBookings.length} booking(s) to ${newStatus}?`)) {
      try {
        for (const bookingId of selectedBookings) {
          await dispatch(updateBookingStatus({ bookingId, status: newStatus })).unwrap();
        }
        setSelectedBookings([]);
        alert('Bookings updated successfully');
      } catch (err) {
        console.error('Failed to update bookings:', err);
        alert('Failed to update some bookings');
      }
    }
  };

  const handleSelectBooking = (bookingId, isSelected) => {
    if (isSelected) {
      setSelectedBookings(prev => [...prev, bookingId]);
    } else {
      setSelectedBookings(prev => prev.filter(id => id !== bookingId));
    }
  };

  const handleSelectAll = (isSelected) => {
    if (isSelected && Array.isArray(filteredBookings)) {
      setSelectedBookings(safeFilteredBookings.map(b => b._id));
    } else {
      setSelectedBookings([]);
    }
  };

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Booking Management</h1>
          <p className="text-gray-600">Manage and monitor all customer bookings</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
            </svg>
            Filters
          </button>
          <button
            onClick={() => dispatch(getAllBookings())}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      {/* Statistics */}
      {statistics && <BookingStatistics statistics={statistics} />}

      {/* Filters */}
      {showFilters && <BookingFilters />}

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
              <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                activeTab === tab.id
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-100 text-gray-900'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Bulk Actions */}
      {selectedBookings.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-sm font-medium text-blue-900">
                {selectedBookings.length} booking(s) selected
              </span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleBulkStatusUpdate('confirmed')}
                className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
              >
                Confirm
              </button>
              <button
                onClick={() => handleBulkStatusUpdate('cancelled')}
                className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
              >
                Cancel
              </button>
              <button
                onClick={() => handleBulkStatusUpdate('completed')}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
              >
                Complete
              </button>
              <button
                onClick={() => setSelectedBookings([])}
                className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading bookings...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error loading bookings</h3>
              <p className="mt-1 text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Bookings List */}
      {!loading && !error && (
        <div>
          {safeFilteredBookings.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No bookings found</h3>
              <p className="mt-1 text-sm text-gray-500">
                No bookings match the current filters.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Select All Checkbox */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedBookings.length === safeFilteredBookings.length && safeFilteredBookings.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Select all ({safeFilteredBookings.length} bookings)
                </label>
              </div>

              {/* Bookings */}
              {safeFilteredBookings.map((booking) => (
                <AdminBookingCard
                  key={booking._id}
                  booking={booking}
                  isSelected={selectedBookings.includes(booking._id)}
                  onSelect={(isSelected) => handleSelectBooking(booking._id, isSelected)}
                  onViewDetails={() => navigate(`/admin/bookings/${booking._id}`)}
                  onUpdateStatus={(status) => dispatch(updateBookingStatus({ bookingId: booking._id, status }))}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminBookingsPage;
