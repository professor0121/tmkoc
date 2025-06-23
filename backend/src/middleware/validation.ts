import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

/**
 * Handle validation errors
 */
export const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      message: 'Validation failed',
      errors: errors.array()
    });
    return;
  }
  next();
};

/**
 * Validate booking data
 */
export const validateBooking = [
  body('package')
    .notEmpty()
    .withMessage('Package is required')
    .isMongoId()
    .withMessage('Package must be a valid MongoDB ObjectId'),

  body('destination')
    .notEmpty()
    .withMessage('Destination is required')
    .isMongoId()
    .withMessage('Destination must be a valid MongoDB ObjectId'),

  body('bookingDetails.travelers.adults')
    .isInt({ min: 1 })
    .withMessage('At least one adult is required'),

  body('bookingDetails.travelers.children')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Children count cannot be negative'),

  body('bookingDetails.travelers.infants')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Infants count cannot be negative'),

  body('bookingDetails.travelDates.startDate')
    .isISO8601()
    .withMessage('Start date must be a valid date')
    .custom((value) => {
      if (new Date(value) <= new Date()) {
        throw new Error('Start date must be in the future');
      }
      return true;
    }),

  body('bookingDetails.travelDates.endDate')
    .isISO8601()
    .withMessage('End date must be a valid date')
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.bookingDetails.travelDates.startDate)) {
        throw new Error('End date must be after start date');
      }
      return true;
    }),

  body('bookingDetails.accommodation.type')
    .isIn(['budget', 'midRange', 'luxury'])
    .withMessage('Accommodation type must be budget, midRange, or luxury'),

  body('bookingDetails.accommodation.roomType')
    .notEmpty()
    .withMessage('Room type is required'),

  body('bookingDetails.accommodation.rooms')
    .isInt({ min: 1 })
    .withMessage('At least one room is required'),

  body('bookingDetails.transportation.flightRequired')
    .isBoolean()
    .withMessage('Flight required must be a boolean'),

  body('bookingDetails.transportation.flightDetails.class')
    .optional()
    .isIn(['economy', 'business', 'first'])
    .withMessage('Flight class must be economy, business, or first'),

  body('pricing.basePrice')
    .isFloat({ min: 0 })
    .withMessage('Base price must be a positive number'),

  body('pricing.totalAmount')
    .isFloat({ min: 0 })
    .withMessage('Total amount must be a positive number'),

  body('pricing.currency')
    .optional()
    .isLength({ min: 3, max: 3 })
    .withMessage('Currency must be a 3-character code'),

  body('payment.method')
    .isIn(['credit_card', 'debit_card', 'upi', 'net_banking', 'wallet', 'cash'])
    .withMessage('Invalid payment method'),

  body('emergencyContact.name')
    .notEmpty()
    .withMessage('Emergency contact name is required'),

  body('emergencyContact.phone')
    .notEmpty()
    .withMessage('Emergency contact phone is required')
    .isMobilePhone('any')
    .withMessage('Emergency contact phone must be a valid phone number'),

  body('emergencyContact.email')
    .isEmail()
    .withMessage('Emergency contact email must be valid'),

  body('emergencyContact.relationship')
    .notEmpty()
    .withMessage('Emergency contact relationship is required'),

  body('specialRequests')
    .optional()
    .isArray()
    .withMessage('Special requests must be an array'),

  body('bookingSource')
    .optional()
    .isIn(['website', 'mobile_app', 'phone', 'agent', 'walk_in'])
    .withMessage('Invalid booking source'),

  handleValidationErrors
];

/**
 * Validate payment data
 */
export const validatePayment = [
  body('transactionId')
    .notEmpty()
    .withMessage('Transaction ID is required'),

  body('amount')
    .isFloat({ min: 0.01 })
    .withMessage('Payment amount must be greater than 0'),

  body('paymentMethod')
    .notEmpty()
    .withMessage('Payment method is required'),

  body('status')
    .optional()
    .isIn(['pending', 'success', 'failed'])
    .withMessage('Payment status must be pending, success, or failed'),

  handleValidationErrors
];

/**
 * Validate review data
 */
export const validateReview = [
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),

  body('comment')
    .notEmpty()
    .withMessage('Review comment is required')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Review comment must be between 10 and 1000 characters'),

  handleValidationErrors
];

/**
 * Validate booking status update
 */
export const validateBookingStatus = [
  body('status')
    .isIn(['draft', 'confirmed', 'cancelled', 'completed', 'refunded'])
    .withMessage('Invalid booking status'),

  handleValidationErrors
];

/**
 * Validate booking cancellation
 */
export const validateCancellation = [
  body('reason')
    .notEmpty()
    .withMessage('Cancellation reason is required')
    .isLength({ min: 10, max: 500 })
    .withMessage('Cancellation reason must be between 10 and 500 characters'),

  handleValidationErrors
];

/**
 * Validate document upload
 */
export const validateDocument = [
  body('type')
    .isIn(['passport', 'visa', 'id_proof', 'medical', 'insurance', 'other'])
    .withMessage('Invalid document type'),

  body('fileName')
    .notEmpty()
    .withMessage('File name is required'),

  body('fileUrl')
    .isURL()
    .withMessage('File URL must be valid'),

  handleValidationErrors
];

/**
 * Validate booking filters for search
 */
export const validateBookingFilters = [
  body('userId')
    .optional()
    .isMongoId()
    .withMessage('User ID must be a valid MongoDB ObjectId'),

  body('packageId')
    .optional()
    .isMongoId()
    .withMessage('Package ID must be a valid MongoDB ObjectId'),

  body('destinationId')
    .optional()
    .isMongoId()
    .withMessage('Destination ID must be a valid MongoDB ObjectId'),

  body('status')
    .optional()
    .isIn(['draft', 'confirmed', 'cancelled', 'completed', 'refunded'])
    .withMessage('Invalid booking status'),

  body('paymentStatus')
    .optional()
    .isIn(['pending', 'partial', 'completed', 'failed', 'refunded'])
    .withMessage('Invalid payment status'),

  body('startDate')
    .optional()
    .isISO8601()
    .withMessage('Start date must be a valid date'),

  body('endDate')
    .optional()
    .isISO8601()
    .withMessage('End date must be a valid date'),

  body('minAmount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Minimum amount must be a positive number'),

  body('maxAmount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Maximum amount must be a positive number'),

  body('bookingSource')
    .optional()
    .isIn(['website', 'mobile_app', 'phone', 'agent', 'walk_in'])
    .withMessage('Invalid booking source'),

  handleValidationErrors
];

/**
 * Validate pagination parameters
 */
export const validatePagination = [
  body('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),

  body('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),

  handleValidationErrors
];

/**
 * Validate MongoDB ObjectId
 */
export const validateObjectId = (field: string) => [
  body(field)
    .isMongoId()
    .withMessage(`${field} must be a valid MongoDB ObjectId`),

  handleValidationErrors
];

/**
 * Validate date range
 */
export const validateDateRange = [
  body('startDate')
    .optional()
    .isISO8601()
    .withMessage('Start date must be a valid date'),

  body('endDate')
    .optional()
    .isISO8601()
    .withMessage('End date must be a valid date')
    .custom((value, { req }) => {
      if (req.body.startDate && new Date(value) <= new Date(req.body.startDate)) {
        throw new Error('End date must be after start date');
      }
      return true;
    }),

  handleValidationErrors
];

/**
 * Validate email
 */
export const validateEmail = [
  body('email')
    .isEmail()
    .withMessage('Email must be valid')
    .normalizeEmail(),

  handleValidationErrors
];

/**
 * Validate phone number
 */
export const validatePhone = [
  body('phone')
    .isMobilePhone('any')
    .withMessage('Phone number must be valid'),

  handleValidationErrors
];

/**
 * Custom validation for booking business rules
 */
export const validateBookingBusinessRules = (req: Request, res: Response, next: NextFunction): void => {
  const { bookingDetails, pricing } = req.body;

  // Check if total travelers don't exceed reasonable limits
  const totalTravelers = bookingDetails.travelers.adults +
                        bookingDetails.travelers.children +
                        bookingDetails.travelers.infants;

  if (totalTravelers > 20) {
    res.status(400).json({
      message: 'Total travelers cannot exceed 20 per booking'
    });
    return;
  }

  // Check if rooms are sufficient for travelers
  const minRoomsRequired = Math.ceil(bookingDetails.travelers.adults / 2);
  if (bookingDetails.accommodation.rooms < minRoomsRequired) {
    res.status(400).json({
      message: `Minimum ${minRoomsRequired} rooms required for ${bookingDetails.travelers.adults} adults`
    });
    return;
  }

  // Validate pricing calculations
  const calculatedTotal = pricing.basePrice + pricing.taxes + pricing.fees - pricing.discounts;
  if (Math.abs(calculatedTotal - pricing.totalAmount) > 0.01) {
    res.status(400).json({
      message: 'Total amount calculation is incorrect'
    });
    return;
  }

  // Check if travel dates are not too far in the future (e.g., 2 years)
  const maxFutureDate = new Date();
  maxFutureDate.setFullYear(maxFutureDate.getFullYear() + 2);

  if (new Date(bookingDetails.travelDates.startDate) > maxFutureDate) {
    res.status(400).json({
      message: 'Travel dates cannot be more than 2 years in the future'
    });
    return;
  }

  next();
};
