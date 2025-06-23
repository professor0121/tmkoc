import { Request, Response } from 'express';
import * as bookingDAO from '../dao/booking.dao';
import { BookingService } from '../services/booking.service';
import { IBooking } from '../models/Booking';
import { IUser } from '../models/User';

// Extend Request interface to include user
interface AuthRequest extends Request {
  user?: IUser;
}

/**
 * Create a new booking
 */
export const createBooking = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = req.user;
    if (!user) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }

    const bookingData = {
      ...req.body,
      metadata: {
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
        referrer: req.get('Referer')
      }
    };

    const newBooking = await BookingService.createBooking(bookingData, user);

    res.status(201).json({
      message: 'Booking created successfully',
      booking: newBooking
    });
  } catch (error: any) {
    console.error('Error creating booking:', error);

    // Handle specific business logic errors
    if (error.message.includes('not found') || error.message.includes('inactive')) {
      res.status(400).json({
        message: 'Invalid booking data',
        error: error.message
      });
      return;
    }

    if (error.message.includes('not available')) {
      res.status(409).json({
        message: 'Package not available',
        error: error.message
      });
      return;
    }

    res.status(500).json({
      message: 'Error creating booking',
      error: error.message
    });
  }
};

/**
 * Get booking by ID
 */
export const getBookingById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const booking = await bookingDAO.findBookingById(id);

    if (!booking) {
      res.status(404).json({ message: 'Booking not found' });
      return;
    }

    res.status(200).json({
      message: 'Booking retrieved successfully',
      booking
    });
  } catch (error: any) {
    console.error('Error getting booking:', error);
    res.status(500).json({
      message: 'Error retrieving booking',
      error: error.message
    });
  }
};

/**
 * Get booking by booking ID
 */
export const getBookingByBookingId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bookingId } = req.params;
    const booking = await bookingDAO.findBookingByBookingId(bookingId);

    if (!booking) {
      res.status(404).json({ message: 'Booking not found' });
      return;
    }

    res.status(200).json({
      message: 'Booking retrieved successfully',
      booking
    });
  } catch (error: any) {
    console.error('Error getting booking:', error);
    res.status(500).json({
      message: 'Error retrieving booking',
      error: error.message
    });
  }
};

/**
 * Get all bookings with filters
 */
export const getAllBookings = async (req: Request, res: Response): Promise<void> => {
  try {
    const filters = {
      userId: req.query.userId as string,
      packageId: req.query.packageId as string,
      destinationId: req.query.destinationId as string,
      status: req.query.status as string,
      paymentStatus: req.query.paymentStatus as string,
      startDate: req.query.startDate ? new Date(req.query.startDate as string) : undefined,
      endDate: req.query.endDate ? new Date(req.query.endDate as string) : undefined,
      minAmount: req.query.minAmount ? parseFloat(req.query.minAmount as string) : undefined,
      maxAmount: req.query.maxAmount ? parseFloat(req.query.maxAmount as string) : undefined,
      bookingSource: req.query.bookingSource as string,
      page: req.query.page ? parseInt(req.query.page as string) : 1,
      limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
      sort: req.query.sort ? JSON.parse(req.query.sort as string) : { createdAt: -1 }
    };

    const result = await bookingDAO.getBookingsWithFilters(filters);

    res.status(200).json({
      message: 'Bookings retrieved successfully',
      ...result
    });
  } catch (error: any) {
    console.error('Error getting bookings:', error);
    res.status(500).json({
      message: 'Error retrieving bookings',
      error: error.message
    });
  }
};

/**
 * Get user's bookings
 */
export const getUserBookings = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }

    const bookings = await bookingDAO.findBookingsByUserId(userId);

    res.status(200).json({
      message: 'User bookings retrieved successfully',
      bookings
    });
  } catch (error: any) {
    console.error('Error getting user bookings:', error);
    res.status(500).json({
      message: 'Error retrieving user bookings',
      error: error.message
    });
  }
};

/**
 * Get upcoming bookings
 */
export const getUpcomingBookings = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.role === 'admin' ? undefined : req.user?.id;
    const bookings = await bookingDAO.findUpcomingBookings(userId);

    res.status(200).json({
      message: 'Upcoming bookings retrieved successfully',
      bookings
    });
  } catch (error: any) {
    console.error('Error getting upcoming bookings:', error);
    res.status(500).json({
      message: 'Error retrieving upcoming bookings',
      error: error.message
    });
  }
};

/**
 * Get past bookings
 */
export const getPastBookings = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.role === 'admin' ? undefined : req.user?.id;
    const bookings = await bookingDAO.findPastBookings(userId);

    res.status(200).json({
      message: 'Past bookings retrieved successfully',
      bookings
    });
  } catch (error: any) {
    console.error('Error getting past bookings:', error);
    res.status(500).json({
      message: 'Error retrieving past bookings',
      error: error.message
    });
  }
};

/**
 * Update booking
 */
export const updateBooking = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }

    const updateData = {
      ...req.body,
      updatedBy: userId
    };

    const updatedBooking = await bookingDAO.updateBookingById(id, updateData);

    if (!updatedBooking) {
      res.status(404).json({ message: 'Booking not found' });
      return;
    }

    res.status(200).json({
      message: 'Booking updated successfully',
      booking: updatedBooking
    });
  } catch (error: any) {
    console.error('Error updating booking:', error);
    res.status(500).json({
      message: 'Error updating booking',
      error: error.message
    });
  }
};

/**
 * Update booking status
 */
export const updateBookingStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }

    const updatedBooking = await bookingDAO.updateBookingStatus(id, status, userId);

    if (!updatedBooking) {
      res.status(404).json({ message: 'Booking not found' });
      return;
    }

    res.status(200).json({
      message: 'Booking status updated successfully',
      booking: updatedBooking
    });
  } catch (error: any) {
    console.error('Error updating booking status:', error);
    res.status(500).json({
      message: 'Error updating booking status',
      error: error.message
    });
  }
};

/**
 * Add payment to booking
 */
export const addPayment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const paymentData = req.body;

    const updatedBooking = await BookingService.processPayment(id, paymentData);

    res.status(200).json({
      message: 'Payment processed successfully',
      booking: updatedBooking
    });
  } catch (error: any) {
    console.error('Error processing payment:', error);

    if (error.message.includes('not found')) {
      res.status(404).json({ message: 'Booking not found' });
      return;
    }

    if (error.message.includes('exceeds remaining balance') || error.message.includes('failed')) {
      res.status(400).json({
        message: 'Payment processing failed',
        error: error.message
      });
      return;
    }

    res.status(500).json({
      message: 'Error processing payment',
      error: error.message
    });
  }
};

/**
 * Cancel booking
 */
export const cancelBooking = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    const userId = req.user?._id?.toString();

    if (!userId) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }

    const cancelledBooking = await BookingService.cancelBooking(id, reason, userId);

    res.status(200).json({
      message: 'Booking cancelled successfully',
      booking: cancelledBooking,
      refundDetails: {
        refundAmount: cancelledBooking.cancellation.refundAmount,
        cancellationFee: cancelledBooking.cancellation.cancellationFee
      }
    });
  } catch (error: any) {
    console.error('Error cancelling booking:', error);

    if (error.message.includes('not found')) {
      res.status(404).json({ message: 'Booking not found' });
      return;
    }

    if (error.message.includes('cannot be cancelled') || error.message.includes('already cancelled')) {
      res.status(400).json({
        message: 'Cancellation not allowed',
        error: error.message
      });
      return;
    }

    res.status(500).json({
      message: 'Error cancelling booking',
      error: error.message
    });
  }
};

/**
 * Add review to booking
 */
export const addReview = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    const updatedBooking = await bookingDAO.addBookingReview(id, rating, comment);

    if (!updatedBooking) {
      res.status(404).json({ message: 'Booking not found' });
      return;
    }

    res.status(200).json({
      message: 'Review added successfully',
      booking: updatedBooking
    });
  } catch (error: any) {
    console.error('Error adding review:', error);
    res.status(500).json({
      message: 'Error adding review',
      error: error.message
    });
  }
};

/**
 * Get booking statistics (Admin only)
 */
export const getBookingStatistics = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (req.user?.role !== 'admin') {
      res.status(403).json({ message: 'Access denied. Admin privileges required.' });
      return;
    }

    const analytics = await BookingService.getBookingAnalytics();

    res.status(200).json({
      message: 'Booking analytics retrieved successfully',
      analytics
    });
  } catch (error: any) {
    console.error('Error getting booking analytics:', error);
    res.status(500).json({
      message: 'Error retrieving booking analytics',
      error: error.message
    });
  }
};

/**
 * Delete booking (Admin only)
 */
export const deleteBooking = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (req.user?.role !== 'admin') {
      res.status(403).json({ message: 'Access denied. Admin privileges required.' });
      return;
    }

    const { id } = req.params;
    const deletedBooking = await bookingDAO.deleteBookingById(id);

    if (!deletedBooking) {
      res.status(404).json({ message: 'Booking not found' });
      return;
    }

    res.status(200).json({
      message: 'Booking deleted successfully',
      booking: deletedBooking
    });
  } catch (error: any) {
    console.error('Error deleting booking:', error);
    res.status(500).json({
      message: 'Error deleting booking',
      error: error.message
    });
  }
};

/**
 * Generate booking confirmation
 */
export const generateBookingConfirmation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const booking = await bookingDAO.findBookingById(id);

    if (!booking) {
      res.status(404).json({ message: 'Booking not found' });
      return;
    }

    const confirmation = booking.generateBookingConfirmation();

    res.status(200).json({
      message: 'Booking confirmation generated successfully',
      confirmation
    });
  } catch (error: any) {
    console.error('Error generating booking confirmation:', error);
    res.status(500).json({
      message: 'Error generating booking confirmation',
      error: error.message
    });
  }
};
