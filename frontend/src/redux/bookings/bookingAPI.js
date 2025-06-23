import axiosInstance from '../../axios/axiosInstance';

// Create a new booking
export const createBookingAPI = async (bookingData) => {
  const response = await axiosInstance.post('/bookings', bookingData);
  return response.data;
};

// Get all bookings (admin only or with filters)
export const getAllBookingsAPI = async (filters = {}) => {
  const params = new URLSearchParams();
  
  // Add filters to query params
  Object.keys(filters).forEach(key => {
    if (filters[key] && filters[key] !== '') {
      if (key === 'dateRange' && filters[key].start && filters[key].end) {
        params.append('startDate', filters[key].start);
        params.append('endDate', filters[key].end);
      } else if (key !== 'dateRange') {
        params.append(key, filters[key]);
      }
    }
  });

  const response = await axiosInstance.get(`/bookings?${params.toString()}`);
  return response.data;
};

// Get current user's bookings
export const getUserBookingsAPI = async () => {
  const response = await axiosInstance.get('/bookings/my-bookings');
  return response.data;
};

// Get upcoming bookings
export const getUpcomingBookingsAPI = async () => {
  const response = await axiosInstance.get('/bookings/upcoming');
  return response.data;
};

// Get past bookings
export const getPastBookingsAPI = async () => {
  const response = await axiosInstance.get('/bookings/past');
  return response.data;
};

// Get booking statistics (admin only)
export const getBookingStatisticsAPI = async () => {
  const response = await axiosInstance.get('/bookings/statistics');
  return response.data;
};

// Get booking by ID
export const getBookingByIdAPI = async (bookingId) => {
  const response = await axiosInstance.get(`/bookings/${bookingId}`);
  return response.data;
};

// Get booking by booking ID
export const getBookingByBookingIdAPI = async (bookingId) => {
  const response = await axiosInstance.get(`/bookings/booking-id/${bookingId}`);
  return response.data;
};

// Update booking
export const updateBookingAPI = async (bookingId, bookingData) => {
  const response = await axiosInstance.put(`/bookings/${bookingId}`, bookingData);
  return response.data;
};

// Update booking status
export const updateBookingStatusAPI = async (bookingId, status) => {
  const response = await axiosInstance.patch(`/bookings/${bookingId}/status`, { status });
  return response.data;
};

// Add payment to booking
export const addPaymentAPI = async (bookingId, paymentData) => {
  const response = await axiosInstance.post(`/bookings/${bookingId}/payment`, paymentData);
  return response.data;
};

// Cancel booking
export const cancelBookingAPI = async (bookingId, reason) => {
  const response = await axiosInstance.post(`/bookings/${bookingId}/cancel`, { reason });
  return response.data;
};

// Add review to booking
export const addReviewAPI = async (bookingId, reviewData) => {
  const response = await axiosInstance.post(`/bookings/${bookingId}/review`, reviewData);
  return response.data;
};

// Generate booking confirmation
export const generateBookingConfirmationAPI = async (bookingId) => {
  const response = await axiosInstance.get(`/bookings/${bookingId}/confirmation`);
  return response.data;
};

// Delete booking (admin only)
export const deleteBookingAPI = async (bookingId) => {
  const response = await axiosInstance.delete(`/bookings/${bookingId}`);
  return response.data;
};

// Booking validation helpers
export const validateBookingData = (bookingData) => {
  const errors = {};

  // Validate package
  if (!bookingData.package) {
    errors.package = 'Package is required';
  }

  // Validate destination
  if (!bookingData.destination) {
    errors.destination = 'Destination is required';
  }

  // Validate travelers
  if (!bookingData.bookingDetails?.travelers?.adults || bookingData.bookingDetails.travelers.adults < 1) {
    errors.adults = 'At least one adult is required';
  }

  // Validate travel dates
  if (!bookingData.bookingDetails?.travelDates?.startDate) {
    errors.startDate = 'Start date is required';
  }

  if (!bookingData.bookingDetails?.travelDates?.endDate) {
    errors.endDate = 'End date is required';
  }

  if (bookingData.bookingDetails?.travelDates?.startDate && 
      bookingData.bookingDetails?.travelDates?.endDate) {
    const startDate = new Date(bookingData.bookingDetails.travelDates.startDate);
    const endDate = new Date(bookingData.bookingDetails.travelDates.endDate);
    
    if (startDate <= new Date()) {
      errors.startDate = 'Start date must be in the future';
    }
    
    if (endDate <= startDate) {
      errors.endDate = 'End date must be after start date';
    }
  }

  // Validate accommodation
  if (!bookingData.bookingDetails?.accommodation?.type) {
    errors.accommodationType = 'Accommodation type is required';
  }

  if (!bookingData.bookingDetails?.accommodation?.roomType) {
    errors.roomType = 'Room type is required';
  }

  if (!bookingData.bookingDetails?.accommodation?.rooms || 
      bookingData.bookingDetails.accommodation.rooms < 1) {
    errors.rooms = 'At least one room is required';
  }

  // Validate emergency contact
  if (!bookingData.emergencyContact?.name) {
    errors.emergencyContactName = 'Emergency contact name is required';
  }

  if (!bookingData.emergencyContact?.phone) {
    errors.emergencyContactPhone = 'Emergency contact phone is required';
  }

  if (!bookingData.emergencyContact?.email) {
    errors.emergencyContactEmail = 'Emergency contact email is required';
  }

  if (!bookingData.emergencyContact?.relationship) {
    errors.emergencyContactRelationship = 'Emergency contact relationship is required';
  }

  // Validate payment method
  if (!bookingData.payment?.method) {
    errors.paymentMethod = 'Payment method is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Calculate booking pricing
export const calculateBookingPricing = (packageData, bookingDetails, customPricing = {}) => {
  if (!packageData || !bookingDetails) {
    return null;
  }

  const { travelers, travelDates, accommodation } = bookingDetails;
  const totalTravelers = travelers.adults + travelers.children + travelers.infants;
  
  // Calculate number of days
  const startDate = new Date(travelDates.startDate);
  const endDate = new Date(travelDates.endDate);
  const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

  // Base price calculation
  let basePrice = packageData.pricing?.basePrice || 0;
  
  // Multiply by travelers and days
  basePrice = basePrice * totalTravelers * days;

  // Accommodation pricing adjustments
  const accommodationMultiplier = {
    budget: 1.0,
    midRange: 1.3,
    luxury: 1.8
  };
  
  basePrice = basePrice * (accommodationMultiplier[accommodation.type] || 1.0);

  // Room pricing
  const roomPrice = accommodation.rooms * 100 * days; // $100 per room per day

  // Calculate taxes and fees
  const taxes = (basePrice + roomPrice) * 0.12; // 12% tax
  const fees = 50; // Fixed processing fee

  // Apply discounts
  const discounts = customPricing.discounts || 0;

  // Calculate total
  const totalAmount = basePrice + roomPrice + taxes + fees - discounts;

  return {
    basePrice: Math.round(basePrice * 100) / 100,
    roomPrice: Math.round(roomPrice * 100) / 100,
    taxes: Math.round(taxes * 100) / 100,
    fees: Math.round(fees * 100) / 100,
    discounts: Math.round(discounts * 100) / 100,
    totalAmount: Math.round(totalAmount * 100) / 100,
    currency: 'USD'
  };
};

// Format booking data for API
export const formatBookingDataForAPI = (formData, packageData, destinationData) => {
  return {
    package: packageData._id,
    destination: destinationData._id,
    bookingDetails: {
      travelers: {
        adults: parseInt(formData.adults) || 1,
        children: parseInt(formData.children) || 0,
        infants: parseInt(formData.infants) || 0
      },
      travelDates: {
        startDate: formData.startDate,
        endDate: formData.endDate
      },
      accommodation: {
        type: formData.accommodationType,
        roomType: formData.roomType,
        rooms: parseInt(formData.rooms) || 1
      },
      transportation: {
        flightRequired: formData.flightRequired || false,
        flightDetails: formData.flightRequired ? {
          class: formData.flightClass || 'economy'
        } : {}
      }
    },
    pricing: formData.pricing,
    payment: {
      method: formData.paymentMethod
    },
    emergencyContact: {
      name: formData.emergencyContactName,
      phone: formData.emergencyContactPhone,
      email: formData.emergencyContactEmail,
      relationship: formData.emergencyContactRelationship
    },
    specialRequests: formData.specialRequests ? formData.specialRequests.split(',').map(req => req.trim()) : [],
    bookingSource: 'website'
  };
};
