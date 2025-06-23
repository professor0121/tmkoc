// Booking utility functions

/**
 * Format date for display
 */
export const formatDate = (dateString, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  };
  
  return new Date(dateString).toLocaleDateString('en-US', defaultOptions);
};

/**
 * Format date for input fields
 */
export const formatDateForInput = (dateString) => {
  return new Date(dateString).toISOString().split('T')[0];
};

/**
 * Format currency
 */
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
};

/**
 * Calculate duration between two dates
 */
export const calculateDuration = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

/**
 * Get booking status color classes
 */
export const getBookingStatusColor = (status) => {
  const statusColors = {
    draft: 'bg-gray-100 text-gray-800 border-gray-200',
    confirmed: 'bg-green-100 text-green-800 border-green-200',
    cancelled: 'bg-red-100 text-red-800 border-red-200',
    completed: 'bg-blue-100 text-blue-800 border-blue-200',
    refunded: 'bg-purple-100 text-purple-800 border-purple-200'
  };
  
  return statusColors[status] || 'bg-yellow-100 text-yellow-800 border-yellow-200';
};

/**
 * Get payment status color classes
 */
export const getPaymentStatusColor = (status) => {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
    partial: 'bg-orange-100 text-orange-800',
    refunded: 'bg-purple-100 text-purple-800'
  };
  
  return statusColors[status] || 'bg-gray-100 text-gray-800';
};

/**
 * Check if booking can be cancelled
 */
export const canCancelBooking = (booking) => {
  if (!booking || booking.status !== 'confirmed') {
    return false;
  }

  const now = new Date();
  const startDate = new Date(booking.bookingDetails?.travelDates?.startDate);
  const daysDifference = Math.ceil((startDate - now) / (1000 * 60 * 60 * 24));

  return daysDifference > 7; // Can cancel if more than 7 days before travel
};

// New booking utility functions for enhanced booking system

/**
 * Get booking type label
 */
export const getBookingTypeLabel = (type) => {
  const labels = {
    package: 'Package Booking',
    custom: 'Custom Trip',
    destination: 'Destination Booking'
  };
  return labels[type] || 'Booking';
};

/**
 * Calculate booking duration with formatted output
 */
export const calculateBookingDuration = (startDate, endDate) => {
  if (!startDate || !endDate) return null;

  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  const nights = days - 1;

  return {
    days,
    nights,
    formatted: `${days} day${days !== 1 ? 's' : ''}${nights > 0 ? ` / ${nights} night${nights !== 1 ? 's' : ''}` : ''}`
  };
};

/**
 * Generate booking URLs for different types
 */
export const generateBookingUrl = (type, id, destinationId = null) => {
  switch (type) {
    case 'destination':
      return `/book/destination/${id}`;
    case 'package':
      return destinationId ? `/book/package/${id}/${destinationId}` : `/book/package/${id}`;
    case 'custom':
      return `/book/custom/${id}`;
    default:
      return '/';
  }
};

/**
 * Parse booking URLs to extract type and IDs
 */
export const parseBookingUrl = (pathname) => {
  // Parse /book/:type/:id/:destinationId? pattern
  const bookMatch = pathname.match(/^\/book\/([^/]+)\/([^/]+)(?:\/([^/]+))?$/);
  if (bookMatch) {
    return {
      type: bookMatch[1],
      id: bookMatch[2],
      destinationId: bookMatch[3] || null
    };
  }

  // Parse legacy /booking/:packageId/:destinationId? pattern
  const legacyMatch = pathname.match(/^\/booking\/([^/]+)(?:\/([^/]+))?$/);
  if (legacyMatch) {
    return {
      type: 'package',
      id: legacyMatch[1],
      destinationId: legacyMatch[2] || null
    };
  }

  return null;
};

/**
 * Format booking pricing with currency
 */
export const formatBookingPrice = (pricing) => {
  if (!pricing) return null;

  return {
    basePrice: formatCurrency(pricing.basePrice || 0),
    totalPrice: formatCurrency(pricing.totalPrice || 0),
    finalTotal: formatCurrency(pricing.finalTotal || pricing.totalPrice || 0),
    savings: pricing.originalPrice && pricing.originalPrice > pricing.basePrice
      ? formatCurrency(pricing.originalPrice - pricing.basePrice)
      : null
  };
};

/**
 * Calculate minimum rooms needed
 */
export const calculateMinRooms = (adults, children = 0, roomType = 'double') => {
  const totalGuests = parseInt(adults) + parseInt(children);

  switch (roomType) {
    case 'single':
      return totalGuests;
    case 'double':
    case 'twin':
      return Math.ceil(totalGuests / 2);
    case 'triple':
      return Math.ceil(totalGuests / 3);
    case 'family':
      return Math.ceil(totalGuests / 4);
    default:
      return Math.ceil(totalGuests / 2);
  }
};

/**
 * Validate booking dates
 */
export const validateBookingDates = (startDate, endDate) => {
  const errors = {};
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (!startDate) {
    errors.startDate = 'Start date is required';
  } else if (start < today) {
    errors.startDate = 'Start date cannot be in the past';
  }

  if (!endDate) {
    errors.endDate = 'End date is required';
  } else if (end <= start) {
    errors.endDate = 'End date must be after start date';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Check if booking is editable
 */
export const isBookingEditable = (booking) => {
  return booking.status === 'draft' || booking.status === 'confirmed';
};

/**
 * Check if booking is cancellable
 */
export const isBookingCancellable = (booking) => {
  const cancellableStatuses = ['draft', 'confirmed'];
  const bookingDate = new Date(booking.bookingDetails?.travelDates?.startDate);
  const now = new Date();
  const daysDifference = (bookingDate - now) / (1000 * 60 * 60 * 24);

  return cancellableStatuses.includes(booking.status) && daysDifference > 1;
};

/**
 * Check if booking can be reviewed
 */
export const canReviewBooking = (booking) => {
  return booking?.status === 'completed' && !booking.review;
};

/**
 * Check if booking is upcoming
 */
export const isUpcomingBooking = (booking) => {
  if (!booking || booking.status !== 'confirmed') {
    return false;
  }
  
  const now = new Date();
  const startDate = new Date(booking.bookingDetails?.travelDates?.startDate);
  return startDate > now;
};

/**
 * Calculate total travelers
 */
export const calculateTotalTravelers = (travelers) => {
  if (!travelers) return 0;
  
  return (travelers.adults || 0) + (travelers.children || 0) + (travelers.infants || 0);
};

/**
 * Get accommodation type display name
 */
export const getAccommodationTypeLabel = (type) => {
  const types = {
    budget: 'Budget',
    midRange: 'Mid-Range',
    luxury: 'Luxury'
  };
  
  return types[type] || type;
};

/**
 * Get room type display name
 */
export const getRoomTypeLabel = (type) => {
  const types = {
    standard: 'Standard Room',
    deluxe: 'Deluxe Room',
    suite: 'Suite',
    family: 'Family Room',
    connecting: 'Connecting Rooms'
  };
  
  return types[type] || type;
};

/**
 * Get payment method display name
 */
export const getPaymentMethodLabel = (method) => {
  const methods = {
    credit_card: 'Credit Card',
    debit_card: 'Debit Card',
    upi: 'UPI',
    net_banking: 'Net Banking',
    wallet: 'Digital Wallet',
    cash: 'Cash'
  };
  
  return methods[method] || method;
};

/**
 * Get relationship display name
 */
export const getRelationshipLabel = (relationship) => {
  const relationships = {
    spouse: 'Spouse',
    parent: 'Parent',
    child: 'Child',
    sibling: 'Sibling',
    friend: 'Friend',
    colleague: 'Colleague',
    other: 'Other'
  };
  
  return relationships[relationship] || relationship;
};



/**
 * Generate booking summary text
 */
export const generateBookingSummary = (booking) => {
  if (!booking) return '';
  
  const travelers = calculateTotalTravelers(booking.bookingDetails?.travelers);
  const duration = calculateDuration(
    booking.bookingDetails?.travelDates?.startDate,
    booking.bookingDetails?.travelDates?.endDate
  );
  
  return `${travelers} traveler(s) for ${duration} days to ${booking.destination?.name}`;
};

/**
 * Get booking priority based on travel date
 */
export const getBookingPriority = (booking) => {
  if (!booking || booking.status !== 'confirmed') {
    return 'normal';
  }
  
  const now = new Date();
  const startDate = new Date(booking.bookingDetails?.travelDates?.startDate);
  const daysDifference = Math.ceil((startDate - now) / (1000 * 60 * 60 * 24));
  
  if (daysDifference <= 7) {
    return 'high'; // Travel within a week
  } else if (daysDifference <= 30) {
    return 'medium'; // Travel within a month
  }
  
  return 'normal';
};

/**
 * Sort bookings by priority and date
 */
export const sortBookings = (bookings, sortBy = 'date') => {
  return [...bookings].sort((a, b) => {
    switch (sortBy) {
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, normal: 1 };
        const aPriority = priorityOrder[getBookingPriority(a)] || 1;
        const bPriority = priorityOrder[getBookingPriority(b)] || 1;
        return bPriority - aPriority;
        
      case 'amount':
        return (b.pricing?.totalAmount || 0) - (a.pricing?.totalAmount || 0);
        
      case 'status':
        return a.status.localeCompare(b.status);
        
      case 'date':
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });
};

/**
 * Filter bookings by criteria
 */
export const filterBookings = (bookings, filters) => {
  return bookings.filter(booking => {
    // Status filter
    if (filters.status && booking.status !== filters.status) {
      return false;
    }
    
    // Date range filter
    if (filters.dateRange?.start && filters.dateRange?.end) {
      const bookingDate = new Date(booking.createdAt);
      const startDate = new Date(filters.dateRange.start);
      const endDate = new Date(filters.dateRange.end);
      
      if (bookingDate < startDate || bookingDate > endDate) {
        return false;
      }
    }
    
    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const searchableText = [
        booking.bookingId,
        booking.package?.name,
        booking.destination?.name,
        booking.user?.firstName,
        booking.user?.lastName,
        booking.user?.email,
        booking.emergencyContact?.name,
        booking.emergencyContact?.email
      ].join(' ').toLowerCase();
      
      if (!searchableText.includes(searchTerm)) {
        return false;
      }
    }
    
    return true;
  });
};

/**
 * Export booking data for CSV
 */
export const exportBookingToCSV = (bookings) => {
  const headers = [
    'Booking ID',
    'Customer Name',
    'Customer Email',
    'Package',
    'Destination',
    'Start Date',
    'End Date',
    'Travelers',
    'Total Amount',
    'Status',
    'Payment Status',
    'Booking Date'
  ];
  
  const rows = bookings.map(booking => [
    booking.bookingId,
    booking.user ? `${booking.user.firstName} ${booking.user.lastName}` : booking.emergencyContact?.name || '',
    booking.user?.email || booking.emergencyContact?.email || '',
    booking.package?.name || '',
    booking.destination?.name || '',
    formatDate(booking.bookingDetails?.travelDates?.startDate),
    formatDate(booking.bookingDetails?.travelDates?.endDate),
    calculateTotalTravelers(booking.bookingDetails?.travelers),
    booking.pricing?.totalAmount || 0,
    booking.status,
    booking.paymentStatus,
    formatDate(booking.createdAt)
  ]);
  
  const csvContent = [headers, ...rows]
    .map(row => row.map(field => `"${field}"`).join(','))
    .join('\n');
  
  return csvContent;
};
