import Booking, { IBooking } from "../models/Booking";
import mongoose from "mongoose";

/**
 * Create a new booking
 */
export const createBooking = async (bookingData: Partial<IBooking>): Promise<IBooking> => {
  const newBooking = new Booking(bookingData);
  return await newBooking.save();
};

/**
 * Find booking by ID
 */
export const findBookingById = async (id: string): Promise<IBooking | null> => {
  return await Booking.findById(id)
    .populate('user', 'name email phone')
    .populate('package', 'title price duration category')
    .populate('destination', 'name city state country')
    .populate('createdBy updatedBy', 'name email');
};

/**
 * Find booking by booking ID
 */
export const findBookingByBookingId = async (bookingId: string): Promise<IBooking | null> => {
  return await Booking.findOne({ bookingId })
    .populate('user', 'name email phone')
    .populate('package', 'title price duration category')
    .populate('destination', 'name city state country');
};

/**
 * Find all bookings with optional filters
 */
export const findBookings = async (filters: any = {}, options: any = {}): Promise<IBooking[]> => {
  const {
    page = 1,
    limit = 10,
    sort = { createdAt: -1 },
    populate = 'user package destination'
  } = options;

  const skip = (page - 1) * limit;

  return await Booking.find(filters)
    .populate(populate)
    .sort(sort)
    .skip(skip)
    .limit(limit);
};

/**
 * Find bookings by user ID
 */
export const findBookingsByUserId = async (userId: string): Promise<IBooking[]> => {
  return await Booking.find({ user: userId })
    .populate('package', 'title price duration category images')
    .populate('destination', 'name city state country images')
    .sort({ createdAt: -1 });
};

/**
 * Find bookings by package ID
 */
export const findBookingsByPackageId = async (packageId: string): Promise<IBooking[]> => {
  return await Booking.find({ package: packageId })
    .populate('user', 'name email phone')
    .populate('destination', 'name city state country')
    .sort({ createdAt: -1 });
};

/**
 * Find bookings by destination ID
 */
export const findBookingsByDestinationId = async (destinationId: string): Promise<IBooking[]> => {
  return await Booking.find({ destination: destinationId })
    .populate('user', 'name email phone')
    .populate('package', 'title price duration category')
    .sort({ createdAt: -1 });
};

/**
 * Find bookings by status
 */
export const findBookingsByStatus = async (status: string): Promise<IBooking[]> => {
  return await Booking.find({ status })
    .populate('user', 'name email phone')
    .populate('package', 'title price duration category')
    .populate('destination', 'name city state country')
    .sort({ createdAt: -1 });
};

/**
 * Find bookings by date range
 */
export const findBookingsByDateRange = async (
  startDate: Date,
  endDate: Date
): Promise<IBooking[]> => {
  return await Booking.find({
    'bookingDetails.travelDates.startDate': {
      $gte: startDate,
      $lte: endDate
    }
  })
    .populate('user', 'name email phone')
    .populate('package', 'title price duration category')
    .populate('destination', 'name city state country')
    .sort({ 'bookingDetails.travelDates.startDate': 1 });
};

/**
 * Find upcoming bookings
 */
export const findUpcomingBookings = async (userId?: string): Promise<IBooking[]> => {
  const filter: any = {
    'bookingDetails.travelDates.startDate': { $gte: new Date() },
    status: { $in: ['confirmed', 'draft'] }
  };

  if (userId) {
    filter.user = userId;
  }

  return await Booking.find(filter)
    .populate('user', 'name email phone')
    .populate('package', 'title price duration category images')
    .populate('destination', 'name city state country images')
    .sort({ 'bookingDetails.travelDates.startDate': 1 });
};

/**
 * Find past bookings
 */
export const findPastBookings = async (userId?: string): Promise<IBooking[]> => {
  const filter: any = {
    'bookingDetails.travelDates.endDate': { $lt: new Date() },
    status: { $in: ['completed', 'cancelled'] }
  };

  if (userId) {
    filter.user = userId;
  }

  return await Booking.find(filter)
    .populate('user', 'name email phone')
    .populate('package', 'title price duration category images')
    .populate('destination', 'name city state country images')
    .sort({ 'bookingDetails.travelDates.endDate': -1 });
};

/**
 * Update booking by ID
 */
export const updateBookingById = async (
  id: string,
  updateData: Partial<IBooking>
): Promise<IBooking | null> => {
  return await Booking.findByIdAndUpdate(
    id,
    { ...updateData, updatedAt: new Date() },
    { new: true, runValidators: true }
  ).populate('user package destination');
};

/**
 * Update booking status
 */
export const updateBookingStatus = async (
  id: string,
  status: string,
  updatedBy: string
): Promise<IBooking | null> => {
  return await Booking.findByIdAndUpdate(
    id,
    { status, updatedBy, updatedAt: new Date() },
    { new: true }
  ).populate('user package destination');
};

/**
 * Add payment to booking
 */
export const addPaymentToBooking = async (
  id: string,
  paymentData: any
): Promise<IBooking | null> => {
  const booking = await Booking.findById(id);
  if (!booking) return null;

  return await booking.addPayment(paymentData);
};

/**
 * Cancel booking
 */
export const cancelBooking = async (
  id: string,
  reason: string,
  cancelledBy: string
): Promise<IBooking | null> => {
  const booking = await Booking.findById(id);
  if (!booking) return null;

  booking.updatedBy = new mongoose.Types.ObjectId(cancelledBy);
  return await booking.cancelBooking(reason);
};

/**
 * Add review to booking
 */
export const addBookingReview = async (
  id: string,
  rating: number,
  comment: string
): Promise<IBooking | null> => {
  const booking = await Booking.findById(id);
  if (!booking) return null;

  return await booking.addReview(rating, comment);
};

/**
 * Get booking count with optional filters
 */
export const getBookingCount = async (filters: any = {}): Promise<number> => {
  return await Booking.countDocuments(filters);
};

/**
 * Get booking statistics
 */
export const getBookingStatistics = async () => {
  const totalBookings = await getBookingCount();
  const confirmedBookings = await getBookingCount({ status: 'confirmed' });
  const cancelledBookings = await getBookingCount({ status: 'cancelled' });
  const completedBookings = await getBookingCount({ status: 'completed' });
  const pendingPayments = await getBookingCount({ 'payment.status': 'pending' });

  // Get revenue statistics
  const revenueStats = await Booking.aggregate([
    { $match: { status: { $in: ['confirmed', 'completed'] } } },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$pricing.totalAmount' },
        averageBookingValue: { $avg: '$pricing.totalAmount' },
        totalPaid: { $sum: '$payment.totalPaid' }
      }
    }
  ]);

  // Get monthly booking trends
  const monthlyTrends = await Booking.aggregate([
    {
      $match: {
        createdAt: { $gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) }
      }
    },
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' }
        },
        count: { $sum: 1 },
        revenue: { $sum: '$pricing.totalAmount' }
      }
    },
    { $sort: { '_id.year': 1, '_id.month': 1 } }
  ]);

  // Get popular destinations
  const popularDestinations = await Booking.aggregate([
    { $match: { status: { $in: ['confirmed', 'completed'] } } },
    {
      $group: {
        _id: '$destination',
        bookingCount: { $sum: 1 },
        totalRevenue: { $sum: '$pricing.totalAmount' }
      }
    },
    { $sort: { bookingCount: -1 } },
    { $limit: 10 },
    {
      $lookup: {
        from: 'destinations',
        localField: '_id',
        foreignField: '_id',
        as: 'destination'
      }
    },
    { $unwind: '$destination' }
  ]);

  // Get popular packages
  const popularPackages = await Booking.aggregate([
    { $match: { status: { $in: ['confirmed', 'completed'] } } },
    {
      $group: {
        _id: '$package',
        bookingCount: { $sum: 1 },
        totalRevenue: { $sum: '$pricing.totalAmount' }
      }
    },
    { $sort: { bookingCount: -1 } },
    { $limit: 10 },
    {
      $lookup: {
        from: 'packages',
        localField: '_id',
        foreignField: '_id',
        as: 'package'
      }
    },
    { $unwind: '$package' }
  ]);

  return {
    totalBookings,
    confirmedBookings,
    cancelledBookings,
    completedBookings,
    pendingPayments,
    revenue: revenueStats[0] || { totalRevenue: 0, averageBookingValue: 0, totalPaid: 0 },
    monthlyTrends,
    popularDestinations,
    popularPackages
  };
};

/**
 * Get bookings with advanced filters
 */
export const getBookingsWithFilters = async (filters: {
  userId?: string;
  packageId?: string;
  destinationId?: string;
  status?: string;
  paymentStatus?: string;
  startDate?: Date;
  endDate?: Date;
  minAmount?: number;
  maxAmount?: number;
  bookingSource?: string;
  page?: number;
  limit?: number;
  sort?: any;
}): Promise<{ bookings: IBooking[], total: number, page: number, totalPages: number }> => {
  const {
    userId,
    packageId,
    destinationId,
    status,
    paymentStatus,
    startDate,
    endDate,
    minAmount,
    maxAmount,
    bookingSource,
    page = 1,
    limit = 10,
    sort = { createdAt: -1 }
  } = filters;

  const query: any = {};

  // Apply filters
  if (userId) query.user = userId;
  if (packageId) query.package = packageId;
  if (destinationId) query.destination = destinationId;
  if (status) query.status = status;
  if (paymentStatus) query['payment.status'] = paymentStatus;
  if (bookingSource) query.bookingSource = bookingSource;

  if (startDate || endDate) {
    query['bookingDetails.travelDates.startDate'] = {};
    if (startDate) query['bookingDetails.travelDates.startDate'].$gte = startDate;
    if (endDate) query['bookingDetails.travelDates.startDate'].$lte = endDate;
  }

  if (minAmount || maxAmount) {
    query['pricing.totalAmount'] = {};
    if (minAmount) query['pricing.totalAmount'].$gte = minAmount;
    if (maxAmount) query['pricing.totalAmount'].$lte = maxAmount;
  }

  const skip = (page - 1) * limit;
  const total = await Booking.countDocuments(query);
  const totalPages = Math.ceil(total / limit);

  const bookings = await Booking.find(query)
    .populate('user', 'name email phone')
    .populate('package', 'title price duration category images')
    .populate('destination', 'name city state country images')
    .sort(sort)
    .skip(skip)
    .limit(limit);

  return {
    bookings,
    total,
    page,
    totalPages
  };
};

/**
 * Delete booking by ID (soft delete)
 */
export const deleteBookingById = async (id: string): Promise<IBooking | null> => {
  return await Booking.findByIdAndUpdate(
    id,
    { status: 'cancelled', updatedAt: new Date() },
    { new: true }
  );
};

/**
 * Hard delete booking by ID
 */
export const hardDeleteBookingById = async (id: string): Promise<IBooking | null> => {
  return await Booking.findByIdAndDelete(id);
};
