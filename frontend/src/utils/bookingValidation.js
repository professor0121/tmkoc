// Booking validation utilities for both destinations and packages

export const validateBookingDates = (startDate, endDate) => {
  const errors = {};
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  // Check if dates are provided
  if (!startDate) {
    errors.startDate = 'Start date is required';
  }
  
  if (!endDate) {
    errors.endDate = 'End date is required';
  }
  
  if (startDate && endDate) {
    // Check if start date is in the past
    if (start < today) {
      errors.startDate = 'Start date cannot be in the past';
    }
    
    // Check if end date is before start date
    if (end <= start) {
      errors.endDate = 'End date must be after start date';
    }
    
    // Check minimum trip duration (1 day)
    const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    if (duration < 1) {
      errors.endDate = 'Trip must be at least 1 day long';
    }
    
    // Check maximum advance booking (2 years)
    const maxAdvanceDate = new Date();
    maxAdvanceDate.setFullYear(maxAdvanceDate.getFullYear() + 2);
    if (start > maxAdvanceDate) {
      errors.startDate = 'Cannot book more than 2 years in advance';
    }
    
    // Check maximum trip duration (90 days for most packages)
    if (duration > 90) {
      errors.endDate = 'Trip duration cannot exceed 90 days';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateTravelerCounts = (adults, children, infants, maxGroupSize = null) => {
  const errors = {};
  
  // Convert to numbers
  const adultCount = parseInt(adults) || 0;
  const childCount = parseInt(children) || 0;
  const infantCount = parseInt(infants) || 0;
  
  // Check minimum adults
  if (adultCount < 1) {
    errors.adults = 'At least 1 adult is required';
  }
  
  // Check maximum individual counts
  if (adultCount > 20) {
    errors.adults = 'Maximum 20 adults allowed';
  }
  
  if (childCount > 10) {
    errors.children = 'Maximum 10 children allowed';
  }
  
  if (infantCount > 5) {
    errors.infants = 'Maximum 5 infants allowed';
  }
  
  // Check total group size
  const totalTravelers = adultCount + childCount + infantCount;
  if (maxGroupSize && totalTravelers > maxGroupSize) {
    errors.groupSize = `Total travelers cannot exceed ${maxGroupSize} for this package`;
  }
  
  // Check infant to adult ratio (max 2 infants per adult)
  if (infantCount > adultCount * 2) {
    errors.infants = 'Maximum 2 infants per adult allowed';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    totalTravelers
  };
};

export const validateAccommodation = (accommodationType, roomType, rooms, adults, children) => {
  const errors = {};
  
  const adultCount = parseInt(adults) || 0;
  const childCount = parseInt(children) || 0;
  const roomCount = parseInt(rooms) || 0;
  
  // Check required fields
  if (!accommodationType) {
    errors.accommodationType = 'Accommodation type is required';
  }
  
  if (!roomType) {
    errors.roomType = 'Room type is required';
  }
  
  if (roomCount < 1) {
    errors.rooms = 'At least 1 room is required';
  }
  
  // Calculate minimum rooms needed
  const totalGuests = adultCount + childCount;
  let minRooms = 1;
  
  if (roomType === 'single') {
    minRooms = totalGuests;
  } else if (roomType === 'double' || roomType === 'twin') {
    minRooms = Math.ceil(totalGuests / 2);
  } else if (roomType === 'triple') {
    minRooms = Math.ceil(totalGuests / 3);
  } else if (roomType === 'family') {
    minRooms = Math.ceil(totalGuests / 4);
  }
  
  if (roomCount < minRooms) {
    errors.rooms = `Minimum ${minRooms} ${roomType} room(s) required for ${totalGuests} guests`;
  }
  
  // Check maximum rooms (reasonable limit)
  if (roomCount > 10) {
    errors.rooms = 'Maximum 10 rooms allowed per booking';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    minRooms
  };
};

export const validateEmergencyContact = (contact) => {
  const errors = {};
  
  if (!contact.name || contact.name.trim().length < 2) {
    errors.emergencyContactName = 'Emergency contact name is required (minimum 2 characters)';
  }
  
  if (!contact.phone || contact.phone.trim().length < 10) {
    errors.emergencyContactPhone = 'Valid emergency contact phone number is required';
  }
  
  if (!contact.email || !isValidEmail(contact.email)) {
    errors.emergencyContactEmail = 'Valid emergency contact email is required';
  }
  
  if (!contact.relationship || contact.relationship.trim().length < 2) {
    errors.emergencyContactRelationship = 'Relationship to emergency contact is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validatePaymentMethod = (paymentMethod, amount) => {
  const errors = {};
  
  if (!paymentMethod) {
    errors.paymentMethod = 'Payment method is required';
  }
  
  const validMethods = ['credit_card', 'debit_card', 'bank_transfer', 'paypal', 'stripe'];
  if (paymentMethod && !validMethods.includes(paymentMethod)) {
    errors.paymentMethod = 'Invalid payment method selected';
  }
  
  if (!amount || amount <= 0) {
    errors.amount = 'Valid payment amount is required';
  }
  
  // Check minimum payment amount
  if (amount && amount < 50) {
    errors.amount = 'Minimum booking amount is $50';
  }
  
  // Check maximum payment amount (reasonable limit)
  if (amount && amount > 100000) {
    errors.amount = 'Maximum booking amount is $100,000';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validatePackageBooking = (bookingData, packageData) => {
  const errors = {};
  
  // Validate dates
  const dateValidation = validateBookingDates(
    bookingData.travelDates?.startDate,
    bookingData.travelDates?.endDate
  );
  Object.assign(errors, dateValidation.errors);
  
  // Validate travelers
  const travelerValidation = validateTravelerCounts(
    bookingData.travelers?.adults,
    bookingData.travelers?.children,
    bookingData.travelers?.infants,
    packageData?.groupSize
  );
  Object.assign(errors, travelerValidation.errors);
  
  // Validate accommodation
  const accommodationValidation = validateAccommodation(
    bookingData.accommodation?.type,
    bookingData.accommodation?.roomType,
    bookingData.accommodation?.rooms,
    bookingData.travelers?.adults,
    bookingData.travelers?.children
  );
  Object.assign(errors, accommodationValidation.errors);
  
  // Validate emergency contact
  if (bookingData.emergencyContact) {
    const emergencyValidation = validateEmergencyContact(bookingData.emergencyContact);
    Object.assign(errors, emergencyValidation.errors);
  }
  
  // Package-specific validations
  if (packageData) {
    // Check if package is available
    if (!packageData.isActive) {
      errors.package = 'This package is currently not available for booking';
    }
    
    // Check package duration constraints
    if (packageData.duration && bookingData.travelDates?.startDate && bookingData.travelDates?.endDate) {
      const bookingDuration = Math.ceil(
        (new Date(bookingData.travelDates.endDate) - new Date(bookingData.travelDates.startDate)) / (1000 * 60 * 60 * 24)
      );
      
      const packageDuration = typeof packageData.duration === 'object' 
        ? packageData.duration.days 
        : packageData.duration;
      
      if (Math.abs(bookingDuration - packageDuration) > 1) {
        errors.duration = `This package is designed for ${packageDuration} days. Your selected dates span ${bookingDuration} days.`;
      }
    }
    
    // Check seasonal availability
    if (packageData.seasonalAvailability && bookingData.travelDates?.startDate) {
      const startDate = new Date(bookingData.travelDates.startDate);
      const month = startDate.getMonth() + 1; // 1-12
      
      if (packageData.seasonalAvailability.excludedMonths?.includes(month)) {
        errors.seasonality = 'This package is not available during the selected month';
      }
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateCustomBooking = (bookingData, destinationData) => {
  const errors = {};
  
  // Validate dates
  const dateValidation = validateBookingDates(
    bookingData.travelDates?.startDate,
    bookingData.travelDates?.endDate
  );
  Object.assign(errors, dateValidation.errors);
  
  // Validate travelers
  const travelerValidation = validateTravelerCounts(
    bookingData.travelers?.adults,
    bookingData.travelers?.children,
    bookingData.travelers?.infants
  );
  Object.assign(errors, travelerValidation.errors);
  
  // Validate accommodation
  const accommodationValidation = validateAccommodation(
    bookingData.accommodation?.type,
    bookingData.accommodation?.roomType,
    bookingData.accommodation?.rooms,
    bookingData.travelers?.adults,
    bookingData.travelers?.children
  );
  Object.assign(errors, accommodationValidation.errors);
  
  // Validate emergency contact
  if (bookingData.emergencyContact) {
    const emergencyValidation = validateEmergencyContact(bookingData.emergencyContact);
    Object.assign(errors, emergencyValidation.errors);
  }
  
  // Custom booking specific validations
  if (!bookingData.preferences?.budget) {
    errors.budget = 'Budget range is required for custom bookings';
  }
  
  // Validate minimum trip duration for custom bookings
  if (bookingData.travelDates?.startDate && bookingData.travelDates?.endDate) {
    const duration = Math.ceil(
      (new Date(bookingData.travelDates.endDate) - new Date(bookingData.travelDates.startDate)) / (1000 * 60 * 60 * 24)
    );
    
    if (duration < 2) {
      errors.duration = 'Custom trips must be at least 2 days long';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Helper functions
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

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

export const formatValidationErrors = (errors) => {
  return Object.entries(errors).map(([field, message]) => ({
    field,
    message
  }));
};
