import * as bookingDAO from '../dao/booking.dao';
import * as packageDAO from '../dao/package.dao';
import * as destinationDAO from '../dao/destination.dao';
import { IBooking } from '../models/Booking';
import { IUser } from '../models/User';

/**
 * Booking Service Layer
 * Contains business logic for booking operations
 */

export class BookingService {
  /**
   * Create a new booking with business logic validation
   */
  static async createBooking(bookingData: any, user: IUser): Promise<IBooking> {
    // Validate package exists and is active
    const packageExists = await packageDAO.findPackageById(bookingData.package);
    if (!packageExists || !packageExists.isActive) {
      throw new Error('Package not found or inactive');
    }

    // Validate destination exists and is active
    const destinationExists = await destinationDAO.findDestinationById(bookingData.destination);
    if (!destinationExists || !destinationExists.isActive) {
      throw new Error('Destination not found or inactive');
    }

    // Calculate pricing based on package and customizations
    const calculatedPricing = await this.calculateBookingPricing(
      packageExists,
      bookingData.bookingDetails,
      bookingData.pricing
    );

    // Validate pricing
    if (Math.abs(calculatedPricing.totalAmount - bookingData.pricing.totalAmount) > 0.01) {
      throw new Error('Pricing calculation mismatch');
    }

    // Check availability (simplified - in real scenario, this would check actual availability)
    const isAvailable = await this.checkAvailability(
      bookingData.package,
      bookingData.bookingDetails.travelDates,
      bookingData.bookingDetails.travelers
    );

    if (!isAvailable) {
      throw new Error('Package not available for selected dates');
    }

    // Create booking with calculated data
    const finalBookingData = {
      ...bookingData,
      user: user._id,
      pricing: calculatedPricing,
      status: 'draft',
      createdBy: user._id,
      updatedBy: user._id
    };

    const newBooking = await bookingDAO.createBooking(finalBookingData);

    // Send booking confirmation email (would be implemented)
    await this.sendBookingConfirmation(newBooking);

    return newBooking;
  }

  /**
   * Calculate booking pricing based on package and customizations
   */
  static async calculateBookingPricing(packageData: any, bookingDetails: any, providedPricing: any) {
    const { travelers, travelDates, accommodation, transportation } = bookingDetails;
    
    // Base package price
    let basePrice = packageData.price;
    
    // Calculate per-person pricing
    const totalTravelers = travelers.adults + travelers.children + travelers.infants;
    const adultPrice = basePrice;
    const childPrice = basePrice * 0.7; // 30% discount for children
    const infantPrice = basePrice * 0.1; // 90% discount for infants
    
    const travelerCost = (travelers.adults * adultPrice) + 
                        (travelers.children * childPrice) + 
                        (travelers.infants * infantPrice);

    // Accommodation cost based on type and rooms
    const accommodationMultiplier = {
      budget: 1.0,
      midRange: 1.5,
      luxury: 2.5
    };
    
    const accommodationCost = travelerCost * 
      (accommodationMultiplier[accommodation.type] - 1) * 
      accommodation.rooms;

    // Transportation cost
    let transportationCost = 0;
    if (transportation.flightRequired) {
      const flightMultiplier = {
        economy: 1.0,
        business: 2.0,
        first: 4.0
      };
      transportationCost = 15000 * totalTravelers * flightMultiplier[transportation.flightDetails?.class || 'economy'];
    }

    // Additional services cost
    const additionalServices = 0; // Can be calculated based on special requests

    // Calculate subtotal
    const subtotal = travelerCost + accommodationCost + transportationCost + additionalServices;

    // Calculate taxes (18% GST in India)
    const taxes = subtotal * 0.18;

    // Platform fees (2% of subtotal)
    const fees = subtotal * 0.02;

    // Apply discounts
    const discounts = providedPricing.discounts || 0;

    // Calculate total
    const totalAmount = subtotal + taxes + fees - discounts;

    return {
      basePrice: travelerCost,
      taxes,
      fees,
      discounts,
      totalAmount,
      currency: providedPricing.currency || 'INR',
      breakdown: {
        packageCost: travelerCost,
        accommodationCost,
        transportationCost,
        additionalServices
      }
    };
  }

  /**
   * Check availability for package on given dates
   */
  static async checkAvailability(packageId: string, travelDates: any, travelers: any): Promise<boolean> {
    // In a real scenario, this would check:
    // 1. Package availability calendar
    // 2. Accommodation availability
    // 3. Transportation availability
    // 4. Maximum capacity limits
    
    // For now, we'll do a simple check for existing bookings
    const existingBookings = await bookingDAO.findBookingsByPackageId(packageId);
    
    const conflictingBookings = existingBookings.filter(booking => {
      if (booking.status === 'cancelled' || booking.status === 'refunded') {
        return false;
      }
      
      const bookingStart = new Date(booking.bookingDetails.travelDates.startDate);
      const bookingEnd = new Date(booking.bookingDetails.travelDates.endDate);
      const requestStart = new Date(travelDates.startDate);
      const requestEnd = new Date(travelDates.endDate);
      
      // Check for date overlap
      return (requestStart <= bookingEnd && requestEnd >= bookingStart);
    });

    // Simple capacity check - max 50 people per package per period
    const totalExistingTravelers = conflictingBookings.reduce((total, booking) => {
      return total + booking.bookingDetails.travelers.adults + 
             booking.bookingDetails.travelers.children + 
             booking.bookingDetails.travelers.infants;
    }, 0);

    const requestedTravelers = travelers.adults + travelers.children + travelers.infants;
    
    return (totalExistingTravelers + requestedTravelers) <= 50;
  }

  /**
   * Process payment for booking
   */
  static async processPayment(bookingId: string, paymentData: any): Promise<IBooking> {
    const booking = await bookingDAO.findBookingById(bookingId);
    if (!booking) {
      throw new Error('Booking not found');
    }

    // Validate payment amount
    if (paymentData.amount > booking.payment.remainingAmount) {
      throw new Error('Payment amount exceeds remaining balance');
    }

    // In a real scenario, integrate with payment gateway here
    const paymentResult = await this.processPaymentGateway(paymentData);
    
    if (paymentResult.status === 'success') {
      // Update booking with payment
      const updatedBooking = await bookingDAO.addPaymentToBooking(bookingId, {
        ...paymentData,
        status: 'success',
        paymentDate: new Date(),
        gatewayResponse: paymentResult
      });

      // If fully paid, confirm booking
      if (updatedBooking && updatedBooking.payment.remainingAmount <= 0) {
        await bookingDAO.updateBookingStatus(bookingId, 'confirmed', booking.user.toString());
        
        // Send confirmation email
        await this.sendPaymentConfirmation(updatedBooking);
      }

      return updatedBooking!;
    } else {
      throw new Error('Payment processing failed');
    }
  }

  /**
   * Cancel booking with refund calculation
   */
  static async cancelBooking(bookingId: string, reason: string, userId: string): Promise<IBooking> {
    const booking = await bookingDAO.findBookingById(bookingId);
    if (!booking) {
      throw new Error('Booking not found');
    }

    // Check if booking can be cancelled
    if (!booking.cancellation.isCancellable) {
      throw new Error('Booking cannot be cancelled');
    }

    if (booking.status === 'cancelled' || booking.status === 'completed') {
      throw new Error('Booking is already cancelled or completed');
    }

    // Calculate refund based on cancellation policy
    const refundDetails = this.calculateRefund(booking);
    
    // Cancel booking
    const cancelledBooking = await bookingDAO.cancelBooking(bookingId, reason, userId);
    
    if (cancelledBooking) {
      // Process refund if applicable
      if (refundDetails.refundAmount > 0) {
        await this.processRefund(cancelledBooking, refundDetails);
      }

      // Send cancellation confirmation
      await this.sendCancellationConfirmation(cancelledBooking);
    }

    return cancelledBooking!;
  }

  /**
   * Calculate refund amount based on cancellation policy
   */
  static calculateRefund(booking: IBooking) {
    const daysToDeparture = Math.ceil(
      (booking.bookingDetails.travelDates.startDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );

    let refundPercentage = 0;
    let cancellationFeePercentage = 0;

    if (daysToDeparture > 30) {
      refundPercentage = 90;
      cancellationFeePercentage = 10;
    } else if (daysToDeparture > 15) {
      refundPercentage = 70;
      cancellationFeePercentage = 30;
    } else if (daysToDeparture > 7) {
      refundPercentage = 50;
      cancellationFeePercentage = 50;
    } else {
      refundPercentage = 25;
      cancellationFeePercentage = 75;
    }

    const refundAmount = booking.payment.totalPaid * (refundPercentage / 100);
    const cancellationFee = booking.payment.totalPaid * (cancellationFeePercentage / 100);

    return {
      refundAmount,
      cancellationFee,
      refundPercentage,
      daysToDeparture
    };
  }

  /**
   * Get booking analytics and statistics
   */
  static async getBookingAnalytics(filters: any = {}) {
    const statistics = await bookingDAO.getBookingStatistics();
    
    // Additional analytics calculations
    const conversionRate = statistics.totalBookings > 0 
      ? (statistics.confirmedBookings / statistics.totalBookings) * 100 
      : 0;

    const cancellationRate = statistics.totalBookings > 0 
      ? (statistics.cancelledBookings / statistics.totalBookings) * 100 
      : 0;

    const averageBookingValue = statistics.revenue.averageBookingValue || 0;

    return {
      ...statistics,
      conversionRate: Math.round(conversionRate * 100) / 100,
      cancellationRate: Math.round(cancellationRate * 100) / 100,
      averageBookingValue: Math.round(averageBookingValue * 100) / 100
    };
  }

  /**
   * Send booking confirmation email
   */
  private static async sendBookingConfirmation(booking: IBooking): Promise<void> {
    // Implementation would integrate with email service
    console.log(`Sending booking confirmation for ${booking.bookingId}`);
    // await emailService.sendBookingConfirmation(booking);
  }

  /**
   * Send payment confirmation email
   */
  private static async sendPaymentConfirmation(booking: IBooking): Promise<void> {
    // Implementation would integrate with email service
    console.log(`Sending payment confirmation for ${booking.bookingId}`);
    // await emailService.sendPaymentConfirmation(booking);
  }

  /**
   * Send cancellation confirmation email
   */
  private static async sendCancellationConfirmation(booking: IBooking): Promise<void> {
    // Implementation would integrate with email service
    console.log(`Sending cancellation confirmation for ${booking.bookingId}`);
    // await emailService.sendCancellationConfirmation(booking);
  }

  /**
   * Process payment through gateway
   */
  private static async processPaymentGateway(paymentData: any): Promise<any> {
    // Mock payment gateway response
    // In real scenario, integrate with Razorpay, Stripe, etc.
    return {
      status: 'success',
      transactionId: paymentData.transactionId,
      gatewayTransactionId: `GW_${Date.now()}`,
      amount: paymentData.amount,
      currency: 'INR',
      timestamp: new Date()
    };
  }

  /**
   * Process refund
   */
  private static async processRefund(booking: IBooking, refundDetails: any): Promise<void> {
    // Implementation would integrate with payment gateway for refund processing
    console.log(`Processing refund of ${refundDetails.refundAmount} for booking ${booking.bookingId}`);
    // await paymentGateway.processRefund(booking, refundDetails);
  }
}
