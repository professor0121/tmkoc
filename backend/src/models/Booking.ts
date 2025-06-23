import mongoose, { Document, Schema } from 'mongoose';

// Define the Booking interface
export interface IBooking extends Document {
  bookingId: string;
  user: mongoose.Types.ObjectId;
  package: mongoose.Types.ObjectId;
  destination: mongoose.Types.ObjectId;
  bookingDetails: {
    travelers: {
      adults: number;
      children: number;
      infants: number;
    };
    travelDates: {
      startDate: Date;
      endDate: Date;
      duration: number;
    };
    accommodation: {
      type: 'budget' | 'midRange' | 'luxury';
      roomType: string;
      rooms: number;
    };
    transportation: {
      flightRequired: boolean;
      flightDetails?: {
        departure: string;
        arrival: string;
        class: 'economy' | 'business' | 'first';
      };
      localTransport: string[];
    };
  };
  pricing: {
    basePrice: number;
    taxes: number;
    fees: number;
    discounts: number;
    totalAmount: number;
    currency: string;
    breakdown: {
      packageCost: number;
      accommodationCost: number;
      transportationCost: number;
      additionalServices: number;
    };
  };
  payment: {
    status: 'pending' | 'partial' | 'completed' | 'failed' | 'refunded';
    method: 'credit_card' | 'debit_card' | 'upi' | 'net_banking' | 'wallet' | 'cash';
    transactions: {
      transactionId: string;
      amount: number;
      status: 'pending' | 'success' | 'failed';
      paymentDate: Date;
      paymentMethod: string;
      gatewayResponse?: any;
    }[];
    totalPaid: number;
    remainingAmount: number;
    paymentSchedule?: {
      dueDate: Date;
      amount: number;
      status: 'pending' | 'paid' | 'overdue';
    }[];
  };
  status: 'draft' | 'confirmed' | 'cancelled' | 'completed' | 'refunded';
  bookingSource: 'website' | 'mobile_app' | 'phone' | 'agent' | 'walk_in';
  specialRequests: string[];
  emergencyContact: {
    name: string;
    phone: string;
    email: string;
    relationship: string;
  };
  documents: {
    type: 'passport' | 'visa' | 'id_proof' | 'medical' | 'insurance' | 'other';
    fileName: string;
    fileUrl: string;
    uploadDate: Date;
    verified: boolean;
  }[];
  notifications: {
    email: boolean;
    sms: boolean;
    whatsapp: boolean;
    push: boolean;
  };
  cancellation: {
    isCancellable: boolean;
    cancellationPolicy: string;
    cancellationFee: number;
    refundAmount: number;
    cancellationDate?: Date;
    cancellationReason?: string;
    refundStatus?: 'pending' | 'processed' | 'failed';
  };
  reviews: {
    rating: number;
    comment: string;
    reviewDate: Date;
    verified: boolean;
  }[];
  metadata: {
    ipAddress: string;
    userAgent: string;
    referrer?: string;
    utm?: {
      source: string;
      medium: string;
      campaign: string;
    };
  };
  createdAt: Date;
  updatedAt: Date;
  createdBy: mongoose.Types.ObjectId;
  updatedBy: mongoose.Types.ObjectId;

  // Instance methods
  calculateTotalAmount(): number;
  addPayment(paymentData: any): Promise<IBooking>;
  cancelBooking(reason: string): Promise<IBooking>;
  addReview(rating: number, comment: string): Promise<IBooking>;
  generateBookingConfirmation(): any;
}

// Create the Booking schema
const BookingSchema: Schema = new Schema(
  {
    bookingId: {
      type: String,
      unique: true,
      required: [true, 'Booking ID is required'],
      index: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
      index: true
    },
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Package',
      required: [true, 'Package is required'],
      index: true
    },
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Destination',
      required: [true, 'Destination is required'],
      index: true
    },
    bookingDetails: {
      travelers: {
        adults: {
          type: Number,
          required: [true, 'Number of adults is required'],
          min: [1, 'At least one adult is required']
        },
        children: {
          type: Number,
          default: 0,
          min: [0, 'Children count cannot be negative']
        },
        infants: {
          type: Number,
          default: 0,
          min: [0, 'Infants count cannot be negative']
        }
      },
      travelDates: {
        startDate: {
          type: Date,
          required: [true, 'Start date is required'],
          validate: {
            validator: function(date: Date) {
              return date > new Date();
            },
            message: 'Start date must be in the future'
          }
        },
        endDate: {
          type: Date,
          required: [true, 'End date is required'],
          validate: {
            validator: function(this: IBooking, date: Date) {
              return date > this.bookingDetails.travelDates.startDate;
            },
            message: 'End date must be after start date'
          }
        },
        duration: {
          type: Number,
          required: true
        }
      },
      accommodation: {
        type: {
          type: String,
          enum: ['budget', 'midRange', 'luxury'],
          required: [true, 'Accommodation type is required']
        },
        roomType: {
          type: String,
          required: [true, 'Room type is required']
        },
        rooms: {
          type: Number,
          required: [true, 'Number of rooms is required'],
          min: [1, 'At least one room is required']
        }
      },
      transportation: {
        flightRequired: {
          type: Boolean,
          default: false
        },
        flightDetails: {
          departure: String,
          arrival: String,
          class: {
            type: String,
            enum: ['economy', 'business', 'first'],
            default: 'economy'
          }
        },
        localTransport: [String]
      }
    },
    pricing: {
      basePrice: {
        type: Number,
        required: [true, 'Base price is required'],
        min: [0, 'Base price cannot be negative']
      },
      taxes: {
        type: Number,
        default: 0,
        min: [0, 'Taxes cannot be negative']
      },
      fees: {
        type: Number,
        default: 0,
        min: [0, 'Fees cannot be negative']
      },
      discounts: {
        type: Number,
        default: 0,
        min: [0, 'Discounts cannot be negative']
      },
      totalAmount: {
        type: Number,
        required: [true, 'Total amount is required'],
        min: [0, 'Total amount cannot be negative']
      },
      currency: {
        type: String,
        default: 'INR',
        maxlength: [3, 'Currency code cannot be more than 3 characters']
      },
      breakdown: {
        packageCost: { type: Number, default: 0 },
        accommodationCost: { type: Number, default: 0 },
        transportationCost: { type: Number, default: 0 },
        additionalServices: { type: Number, default: 0 }
      }
    },
    payment: {
      status: {
        type: String,
        enum: ['pending', 'partial', 'completed', 'failed', 'refunded'],
        default: 'pending',
        index: true
      },
      method: {
        type: String,
        enum: ['credit_card', 'debit_card', 'upi', 'net_banking', 'wallet', 'cash'],
        required: [true, 'Payment method is required']
      },
      transactions: [{
        transactionId: {
          type: String,
          required: true
        },
        amount: {
          type: Number,
          required: true,
          min: [0, 'Transaction amount cannot be negative']
        },
        status: {
          type: String,
          enum: ['pending', 'success', 'failed'],
          default: 'pending'
        },
        paymentDate: {
          type: Date,
          default: Date.now
        },
        paymentMethod: String,
        gatewayResponse: Schema.Types.Mixed
      }],
      totalPaid: {
        type: Number,
        default: 0,
        min: [0, 'Total paid cannot be negative']
      },
      remainingAmount: {
        type: Number,
        default: 0,
        min: [0, 'Remaining amount cannot be negative']
      },
      paymentSchedule: [{
        dueDate: Date,
        amount: Number,
        status: {
          type: String,
          enum: ['pending', 'paid', 'overdue'],
          default: 'pending'
        }
      }]
    },
    status: {
      type: String,
      enum: ['draft', 'confirmed', 'cancelled', 'completed', 'refunded'],
      default: 'draft',
      index: true
    },
    bookingSource: {
      type: String,
      enum: ['website', 'mobile_app', 'phone', 'agent', 'walk_in'],
      default: 'website'
    },
    specialRequests: [String],
    emergencyContact: {
      name: {
        type: String,
        required: [true, 'Emergency contact name is required']
      },
      phone: {
        type: String,
        required: [true, 'Emergency contact phone is required']
      },
      email: {
        type: String,
        required: [true, 'Emergency contact email is required']
      },
      relationship: {
        type: String,
        required: [true, 'Emergency contact relationship is required']
      }
    },
    documents: [{
      type: {
        type: String,
        enum: ['passport', 'visa', 'id_proof', 'medical', 'insurance', 'other'],
        required: true
      },
      fileName: {
        type: String,
        required: true
      },
      fileUrl: {
        type: String,
        required: true
      },
      uploadDate: {
        type: Date,
        default: Date.now
      },
      verified: {
        type: Boolean,
        default: false
      }
    }],
    notifications: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: true },
      whatsapp: { type: Boolean, default: false },
      push: { type: Boolean, default: true }
    },
    cancellation: {
      isCancellable: { type: Boolean, default: true },
      cancellationPolicy: String,
      cancellationFee: { type: Number, default: 0 },
      refundAmount: { type: Number, default: 0 },
      cancellationDate: Date,
      cancellationReason: String,
      refundStatus: {
        type: String,
        enum: ['pending', 'processed', 'failed']
      }
    },
    reviews: [{
      rating: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating cannot be more than 5']
      },
      comment: String,
      reviewDate: {
        type: Date,
        default: Date.now
      },
      verified: {
        type: Boolean,
        default: false
      }
    }],
    metadata: {
      ipAddress: String,
      userAgent: String,
      referrer: String,
      utm: {
        source: String,
        medium: String,
        campaign: String
      }
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Indexes for better query performance
BookingSchema.index({ user: 1, status: 1 });
BookingSchema.index({ package: 1, status: 1 });
BookingSchema.index({ destination: 1, status: 1 });
BookingSchema.index({ 'bookingDetails.travelDates.startDate': 1 });
BookingSchema.index({ 'payment.status': 1 });
BookingSchema.index({ createdAt: -1 });
BookingSchema.index({ bookingId: 1 }, { unique: true });

// Pre-save middleware
BookingSchema.pre<IBooking>('save', function(next) {
  // Generate booking ID if not provided
  if (!this.bookingId) {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    this.bookingId = `BK${timestamp}${random}`.toUpperCase();
  }

  // Calculate duration
  if (this.bookingDetails.travelDates.startDate && this.bookingDetails.travelDates.endDate) {
    const start = new Date(this.bookingDetails.travelDates.startDate);
    const end = new Date(this.bookingDetails.travelDates.endDate);
    this.bookingDetails.travelDates.duration = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  }

  // Calculate remaining amount
  this.payment.remainingAmount = this.pricing.totalAmount - this.payment.totalPaid;

  next();
});

// Instance method to calculate total amount
BookingSchema.methods.calculateTotalAmount = function(this: IBooking): number {
  const { basePrice, taxes, fees, discounts } = this.pricing;
  return basePrice + taxes + fees - discounts;
};

// Instance method to add payment
BookingSchema.methods.addPayment = function(this: IBooking, paymentData: any): Promise<IBooking> {
  this.payment.transactions.push(paymentData);
  this.payment.totalPaid += paymentData.amount;
  this.payment.remainingAmount = this.pricing.totalAmount - this.payment.totalPaid;
  
  if (this.payment.remainingAmount <= 0) {
    this.payment.status = 'completed';
  } else if (this.payment.totalPaid > 0) {
    this.payment.status = 'partial';
  }
  
  return this.save();
};

// Instance method to cancel booking
BookingSchema.methods.cancelBooking = function(this: IBooking, reason: string): Promise<IBooking> {
  this.status = 'cancelled';
  this.cancellation.cancellationDate = new Date();
  this.cancellation.cancellationReason = reason;
  
  // Calculate refund amount based on cancellation policy
  // This is a simplified calculation - in real scenarios, this would be more complex
  const daysToDeparture = Math.ceil((this.bookingDetails.travelDates.startDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  
  if (daysToDeparture > 30) {
    this.cancellation.refundAmount = this.payment.totalPaid * 0.9; // 10% cancellation fee
    this.cancellation.cancellationFee = this.payment.totalPaid * 0.1;
  } else if (daysToDeparture > 15) {
    this.cancellation.refundAmount = this.payment.totalPaid * 0.7; // 30% cancellation fee
    this.cancellation.cancellationFee = this.payment.totalPaid * 0.3;
  } else {
    this.cancellation.refundAmount = this.payment.totalPaid * 0.5; // 50% cancellation fee
    this.cancellation.cancellationFee = this.payment.totalPaid * 0.5;
  }
  
  return this.save();
};

// Instance method to add review
BookingSchema.methods.addReview = function(this: IBooking, rating: number, comment: string): Promise<IBooking> {
  this.reviews.push({
    rating,
    comment,
    reviewDate: new Date(),
    verified: true
  });
  
  return this.save();
};

// Instance method to generate booking confirmation
BookingSchema.methods.generateBookingConfirmation = function(this: IBooking): any {
  return {
    bookingId: this.bookingId,
    status: this.status,
    travelerDetails: this.bookingDetails.travelers,
    travelDates: this.bookingDetails.travelDates,
    totalAmount: this.pricing.totalAmount,
    paymentStatus: this.payment.status,
    emergencyContact: this.emergencyContact
  };
};

// Create and export the Booking model
export default mongoose.model<IBooking>('Booking', BookingSchema);
