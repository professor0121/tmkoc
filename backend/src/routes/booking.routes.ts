import express from 'express';
import * as bookingController from '../controllers/booking.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import {
  validateBooking,
  validatePayment,
  validateReview,
  validateBookingBusinessRules,
  validateCancellation
} from '../middleware/validation';

const router = express.Router();

/**
 * @route   POST /api/bookings
 * @desc    Create a new booking
 * @access  Private (Authenticated users)
 */
router.post(
  '/',
  authMiddleware,
  validateBooking,
  validateBookingBusinessRules,
  bookingController.createBooking
);

/**
 * @route   GET /api/bookings
 * @desc    Get all bookings with filters (Admin only for all, users get their own)
 * @access  Private
 */
router.get(
  '/',
  authMiddleware,
  bookingController.getAllBookings
);

/**
 * @route   GET /api/bookings/my-bookings
 * @desc    Get current user's bookings
 * @access  Private
 */
router.get(
  '/my-bookings',
  authMiddleware,
  bookingController.getUserBookings
);

/**
 * @route   GET /api/bookings/upcoming
 * @desc    Get upcoming bookings
 * @access  Private
 */
router.get(
  '/upcoming',
  authMiddleware,
  bookingController.getUpcomingBookings
);

/**
 * @route   GET /api/bookings/past
 * @desc    Get past bookings
 * @access  Private
 */
router.get(
  '/past',
  authMiddleware,
  bookingController.getPastBookings
);

/**
 * @route   GET /api/bookings/statistics
 * @desc    Get booking statistics
 * @access  Private (Admin only)
 */
router.get(
  '/statistics',
  authMiddleware,
  bookingController.getBookingStatistics
);

/**
 * @route   GET /api/bookings/:id
 * @desc    Get booking by ID
 * @access  Private
 */
router.get(
  '/:id',
  authMiddleware,
  bookingController.getBookingById
);

/**
 * @route   GET /api/bookings/booking-id/:bookingId
 * @desc    Get booking by booking ID
 * @access  Private
 */
router.get(
  '/booking-id/:bookingId',
  authMiddleware,
  bookingController.getBookingByBookingId
);

/**
 * @route   PUT /api/bookings/:id
 * @desc    Update booking
 * @access  Private
 */
router.put(
  '/:id',
  authMiddleware,
  validateBooking,
  bookingController.updateBooking
);

/**
 * @route   PATCH /api/bookings/:id/status
 * @desc    Update booking status
 * @access  Private
 */
router.patch(
  '/:id/status',
  authMiddleware,
  bookingController.updateBookingStatus
);

/**
 * @route   POST /api/bookings/:id/payment
 * @desc    Add payment to booking
 * @access  Private
 */
router.post(
  '/:id/payment',
  authMiddleware,
  validatePayment,
  bookingController.addPayment
);

/**
 * @route   POST /api/bookings/:id/cancel
 * @desc    Cancel booking
 * @access  Private
 */
router.post(
  '/:id/cancel',
  authMiddleware,
  validateCancellation,
  bookingController.cancelBooking
);

/**
 * @route   POST /api/bookings/:id/review
 * @desc    Add review to booking
 * @access  Private
 */
router.post(
  '/:id/review',
  authMiddleware,
  validateReview,
  bookingController.addReview
);

/**
 * @route   GET /api/bookings/:id/confirmation
 * @desc    Generate booking confirmation
 * @access  Private
 */
router.get(
  '/:id/confirmation',
  authMiddleware,
  bookingController.generateBookingConfirmation
);

/**
 * @route   DELETE /api/bookings/:id
 * @desc    Delete booking
 * @access  Private (Admin only)
 */
router.delete(
  '/:id',
  authMiddleware,
  bookingController.deleteBooking
);

export default router;
