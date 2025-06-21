import mongoose, { Document, Schema } from 'mongoose';

// Define the Package interface
export interface IPackage extends Document {
  title: string;
  description: string;
  shortDescription: string;
  destination: string;
  duration: {
    days: number;
    nights: number;
  };
  price: {
    adult: number;
    child: number;
    infant: number;
  };
  groupSize: {
    min: number;
    max: number;
  };
  category: 'adventure' | 'cultural' | 'religious' | 'wildlife' | 'beach' | 'hill-station' | 'heritage' | 'honeymoon' | 'family' | 'business';
  difficulty: 'easy' | 'moderate' | 'challenging' | 'extreme';
  inclusions: string[];
  exclusions: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
    activities: string[];
    meals: string[];
    accommodation?: string;
  }[];
  images: {
    url: string;
    alt: string;
    isPrimary: boolean;
  }[];
  location: {
    country: string;
    state: string;
    city: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  availability: {
    startDate: Date;
    endDate: Date;
    isAvailable: boolean;
    maxBookings: number;
    currentBookings: number;
  }[];
  features: string[];
  transportation: {
    included: boolean;
    type: string[];
    details: string;
  };
  accommodation: {
    type: string;
    rating: number;
    details: string;
  };
  meals: {
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
    details: string;
  };
  guide: {
    included: boolean;
    language: string[];
    type: 'local' | 'professional' | 'expert';
  };
  cancellationPolicy: {
    refundable: boolean;
    cancellationDeadline: number; // days before trip
    refundPercentage: number;
    terms: string;
  };
  rating: {
    average: number;
    totalReviews: number;
  };
  tags: string[];
  isActive: boolean;
  isFeatured: boolean;
  createdBy: mongoose.Types.ObjectId;
  updatedBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Create the Package schema
const PackageSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Package title is required'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Package description is required'],
      trim: true,
      maxlength: [2000, 'Description cannot be more than 2000 characters']
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      trim: true,
      maxlength: [200, 'Short description cannot be more than 200 characters']
    },
    destination: {
      type: String,
      required: [true, 'Destination is required'],
      trim: true,
      maxlength: [100, 'Destination cannot be more than 100 characters']
    },
    duration: {
      days: {
        type: Number,
        required: [true, 'Duration in days is required'],
        min: [1, 'Duration must be at least 1 day']
      },
      nights: {
        type: Number,
        required: [true, 'Duration in nights is required'],
        min: [0, 'Nights cannot be negative']
      }
    },
    price: {
      adult: {
        type: Number,
        required: [true, 'Adult price is required'],
        min: [0, 'Price cannot be negative']
      },
      child: {
        type: Number,
        required: [true, 'Child price is required'],
        min: [0, 'Price cannot be negative']
      },
      infant: {
        type: Number,
        default: 0,
        min: [0, 'Price cannot be negative']
      }
    },
    groupSize: {
      min: {
        type: Number,
        required: [true, 'Minimum group size is required'],
        min: [1, 'Minimum group size must be at least 1']
      },
      max: {
        type: Number,
        required: [true, 'Maximum group size is required'],
        min: [1, 'Maximum group size must be at least 1']
      }
    },
    category: {
      type: String,
      required: [true, 'Package category is required'],
      enum: {
        values: ['adventure', 'cultural', 'religious', 'wildlife', 'beach', 'hill-station', 'heritage', 'honeymoon', 'family', 'business'],
        message: 'Invalid package category'
      }
    },
    difficulty: {
      type: String,
      required: [true, 'Difficulty level is required'],
      enum: {
        values: ['easy', 'moderate', 'challenging', 'extreme'],
        message: 'Invalid difficulty level'
      }
    },
    inclusions: [{
      type: String,
      trim: true,
      maxlength: [200, 'Inclusion item cannot be more than 200 characters']
    }],
    exclusions: [{
      type: String,
      trim: true,
      maxlength: [200, 'Exclusion item cannot be more than 200 characters']
    }],
    itinerary: [{
      day: {
        type: Number,
        required: [true, 'Day number is required'],
        min: [1, 'Day must be at least 1']
      },
      title: {
        type: String,
        required: [true, 'Itinerary title is required'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
      },
      description: {
        type: String,
        required: [true, 'Itinerary description is required'],
        trim: true,
        maxlength: [500, 'Description cannot be more than 500 characters']
      },
      activities: [{
        type: String,
        trim: true,
        maxlength: [100, 'Activity cannot be more than 100 characters']
      }],
      meals: [{
        type: String,
        trim: true,
        maxlength: [50, 'Meal cannot be more than 50 characters']
      }],
      accommodation: {
        type: String,
        trim: true,
        maxlength: [100, 'Accommodation cannot be more than 100 characters']
      }
    }],
    images: [{
      url: {
        type: String,
        required: [true, 'Image URL is required'],
        trim: true
      },
      alt: {
        type: String,
        required: [true, 'Image alt text is required'],
        trim: true,
        maxlength: [100, 'Alt text cannot be more than 100 characters']
      },
      isPrimary: {
        type: Boolean,
        default: false
      }
    }],
    location: {
      country: {
        type: String,
        required: [true, 'Country is required'],
        trim: true,
        maxlength: [50, 'Country cannot be more than 50 characters']
      },
      state: {
        type: String,
        required: [true, 'State is required'],
        trim: true,
        maxlength: [50, 'State cannot be more than 50 characters']
      },
      city: {
        type: String,
        required: [true, 'City is required'],
        trim: true,
        maxlength: [50, 'City cannot be more than 50 characters']
      },
      coordinates: {
        latitude: {
          type: Number,
          required: [true, 'Latitude is required'],
          min: [-90, 'Latitude must be between -90 and 90'],
          max: [90, 'Latitude must be between -90 and 90']
        },
        longitude: {
          type: Number,
          required: [true, 'Longitude is required'],
          min: [-180, 'Longitude must be between -180 and 180'],
          max: [180, 'Longitude must be between -180 and 180']
        }
      }
    },
    availability: [{
      startDate: {
        type: Date,
        required: [true, 'Start date is required']
      },
      endDate: {
        type: Date,
        required: [true, 'End date is required']
      },
      isAvailable: {
        type: Boolean,
        default: true
      },
      maxBookings: {
        type: Number,
        required: [true, 'Maximum bookings is required'],
        min: [1, 'Maximum bookings must be at least 1']
      },
      currentBookings: {
        type: Number,
        default: 0,
        min: [0, 'Current bookings cannot be negative']
      }
    }],
    features: [{
      type: String,
      trim: true,
      maxlength: [100, 'Feature cannot be more than 100 characters']
    }],
    transportation: {
      included: {
        type: Boolean,
        default: false
      },
      type: [{
        type: String,
        trim: true,
        maxlength: [50, 'Transportation type cannot be more than 50 characters']
      }],
      details: {
        type: String,
        trim: true,
        maxlength: [500, 'Transportation details cannot be more than 500 characters']
      }
    },
    accommodation: {
      type: {
        type: String,
        required: [true, 'Accommodation type is required'],
        trim: true,
        maxlength: [100, 'Accommodation type cannot be more than 100 characters']
      },
      rating: {
        type: Number,
        min: [1, 'Rating must be between 1 and 5'],
        max: [5, 'Rating must be between 1 and 5']
      },
      details: {
        type: String,
        trim: true,
        maxlength: [500, 'Accommodation details cannot be more than 500 characters']
      }
    },
    meals: {
      breakfast: {
        type: Boolean,
        default: false
      },
      lunch: {
        type: Boolean,
        default: false
      },
      dinner: {
        type: Boolean,
        default: false
      },
      details: {
        type: String,
        trim: true,
        maxlength: [500, 'Meal details cannot be more than 500 characters']
      }
    },
    guide: {
      included: {
        type: Boolean,
        default: false
      },
      language: [{
        type: String,
        trim: true,
        maxlength: [30, 'Language cannot be more than 30 characters']
      }],
      type: {
        type: String,
        enum: {
          values: ['local', 'professional', 'expert'],
          message: 'Invalid guide type'
        }
      }
    },
    cancellationPolicy: {
      refundable: {
        type: Boolean,
        default: true
      },
      cancellationDeadline: {
        type: Number,
        required: [true, 'Cancellation deadline is required'],
        min: [0, 'Cancellation deadline cannot be negative']
      },
      refundPercentage: {
        type: Number,
        required: [true, 'Refund percentage is required'],
        min: [0, 'Refund percentage must be between 0 and 100'],
        max: [100, 'Refund percentage must be between 0 and 100']
      },
      terms: {
        type: String,
        required: [true, 'Cancellation terms are required'],
        trim: true,
        maxlength: [1000, 'Terms cannot be more than 1000 characters']
      }
    },
    rating: {
      average: {
        type: Number,
        default: 0,
        min: [0, 'Rating must be between 0 and 5'],
        max: [5, 'Rating must be between 0 and 5']
      },
      totalReviews: {
        type: Number,
        default: 0,
        min: [0, 'Total reviews cannot be negative']
      }
    },
    tags: [{
      type: String,
      trim: true,
      maxlength: [50, 'Tag cannot be more than 50 characters']
    }],
    isActive: {
      type: Boolean,
      default: true
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Created by user is required']
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Updated by user is required']
    }
  },
  {
    timestamps: true // This adds createdAt and updatedAt fields automatically
  }
);

// Add indexes for better query performance
PackageSchema.index({ destination: 1 });
PackageSchema.index({ category: 1 });
PackageSchema.index({ 'price.adult': 1 });
PackageSchema.index({ 'rating.average': -1 });
PackageSchema.index({ isActive: 1 });
PackageSchema.index({ isFeatured: 1 });
PackageSchema.index({ tags: 1 });
PackageSchema.index({ 'location.country': 1, 'location.state': 1, 'location.city': 1 });

// Add a compound index for search functionality
PackageSchema.index({
  title: 'text',
  description: 'text',
  destination: 'text',
  tags: 'text'
});

// Pre-save middleware to validate group size
PackageSchema.pre<IPackage>('save', function(next) {
  if (this.groupSize.min > this.groupSize.max) {
    next(new Error('Minimum group size cannot be greater than maximum group size'));
  }

  // Validate duration
  if (this.duration.nights >= this.duration.days) {
    next(new Error('Nights should be less than days'));
  }

  // Ensure at least one primary image
  const primaryImages = this.images.filter(img => img.isPrimary);
  if (this.images.length > 0 && primaryImages.length === 0) {
    this.images[0].isPrimary = true;
  }

  next();
});

// Virtual for calculating total duration
PackageSchema.virtual('totalDuration').get(function(this: IPackage) {
  return `${this.duration.days} Days / ${this.duration.nights} Nights`;
});

// Virtual for calculating price range
PackageSchema.virtual('priceRange').get(function(this: IPackage) {
  const prices = [this.price.adult, this.price.child];
  if (this.price.infant > 0) prices.push(this.price.infant);

  const min = Math.min(...prices);
  const max = Math.max(...prices);

  return min === max ? `₹${min}` : `₹${min} - ₹${max}`;
});

// Method to check availability for a specific date range
PackageSchema.methods.isAvailableForDates = function(this: IPackage, startDate: Date, endDate: Date) {
  return this.availability.some(slot =>
    slot.isAvailable &&
    startDate >= slot.startDate &&
    endDate <= slot.endDate &&
    slot.currentBookings < slot.maxBookings
  );
};

// Method to get available slots
PackageSchema.methods.getAvailableSlots = function(this: IPackage) {
  return this.availability.filter(slot =>
    slot.isAvailable &&
    slot.currentBookings < slot.maxBookings &&
    slot.startDate > new Date()
  );
};

// Static method to find packages by category
PackageSchema.statics.findByCategory = function(category: string) {
  return this.find({ category, isActive: true });
};

// Static method to find featured packages
PackageSchema.statics.findFeatured = function() {
  return this.find({ isFeatured: true, isActive: true });
};

// Create and export the Package model
export default mongoose.model<IPackage>('Package', PackageSchema);