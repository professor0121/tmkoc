import mongoose, { Document, Schema } from 'mongoose';

// Define the Destination interface
export interface IDestination extends Document {
  name: string;
  description: string;
  shortDescription: string;
  country: string;
  state: string;
  city: string;
  region: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  category: 'adventure' | 'cultural' | 'religious' | 'wildlife' | 'beach' | 'hill-station' | 'heritage' | 'urban' | 'rural';
  popularityScore: number;
  climate: {
    type: 'tropical' | 'temperate' | 'arid' | 'cold' | 'mediterranean' | 'continental';
    bestVisitMonths: string[];
    averageTemperature: {
      min: number;
      max: number;
    };
    rainfallPattern: string;
  };
  attractions: {
    name: string;
    type: string;
    description: string;
    entryFee: number;
    timings: string;
    rating: number;
  }[];
  accommodation: {
    budget: {
      available: boolean;
      priceRange: { min: number; max: number };
      options: string[];
    };
    midRange: {
      available: boolean;
      priceRange: { min: number; max: number };
      options: string[];
    };
    luxury: {
      available: boolean;
      priceRange: { min: number; max: number };
      options: string[];
    };
  };
  transportation: {
    nearestAirport: {
      name: string;
      code: string;
      distance: number;
    };
    nearestRailway: {
      name: string;
      distance: number;
    };
    roadConnectivity: {
      highways: string[];
      accessibility: 'excellent' | 'good' | 'moderate' | 'poor';
    };
    localTransport: string[];
  };
  activities: string[];
  cuisine: {
    specialties: string[];
    restaurants: {
      name: string;
      type: string;
      priceRange: string;
      rating: number;
    }[];
  };
  shopping: {
    markets: string[];
    specialItems: string[];
    shoppingCenters: string[];
  };
  safety: {
    rating: number;
    tips: string[];
    emergencyContacts: {
      police: string;
      hospital: string;
      touristHelpline: string;
    };
  };
  images: {
    url: string;
    alt: string;
    category: 'landscape' | 'attraction' | 'culture' | 'food' | 'accommodation';
    isPrimary: boolean;
  }[];
  videos: {
    url: string;
    title: string;
    duration: number;
    type: 'promotional' | 'documentary' | 'virtual-tour';
  }[];
  languages: string[];
  currency: string;
  timeZone: string;
  tags: string[];
  seoData: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    slug: string;
  };
  statistics: {
    totalVisitors: number;
    averageStayDuration: number;
    peakSeason: string[];
    offSeason: string[];
  };
  packages: mongoose.Types.ObjectId[];
  reviews: {
    user: mongoose.Types.ObjectId;
    rating: number;
    comment: string;
    date: Date;
    helpful: number;
  }[];
  rating: {
    average: number;
    totalReviews: number;
    breakdown: {
      attractions: number;
      accommodation: number;
      food: number;
      transportation: number;
      value: number;
    };
  };
  isActive: boolean;
  isFeatured: boolean;
  isPopular: boolean;
  createdBy: mongoose.Types.ObjectId;
  updatedBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;

  // Virtual properties
  fullLocation: string;
  coordinateString: string;
  bestVisitPeriod: string;

  // Instance methods
  addReview(userId: string, rating: number, comment: string): Promise<IDestination>;
  updateRating(): void;
  getNearbyDestinations(maxDistance?: number): Promise<IDestination[]>;
}

// Create the Destination schema
const DestinationSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Destination name is required'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters'],
      index: true
    },
    description: {
      type: String,
      required: [true, 'Destination description is required'],
      trim: true,
      maxlength: [3000, 'Description cannot be more than 3000 characters']
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      trim: true,
      maxlength: [300, 'Short description cannot be more than 300 characters']
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
      trim: true,
      maxlength: [50, 'Country cannot be more than 50 characters'],
      index: true
    },
    state: {
      type: String,
      required: [true, 'State is required'],
      trim: true,
      maxlength: [50, 'State cannot be more than 50 characters'],
      index: true
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
      maxlength: [50, 'City cannot be more than 50 characters'],
      index: true
    },
    region: {
      type: String,
      trim: true,
      maxlength: [50, 'Region cannot be more than 50 characters']
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
    },
    category: {
      type: String,
      required: [true, 'Destination category is required'],
      enum: {
        values: ['adventure', 'cultural', 'religious', 'wildlife', 'beach', 'hill-station', 'heritage', 'urban', 'rural'],
        message: 'Invalid destination category'
      },
      index: true
    },
    popularityScore: {
      type: Number,
      default: 0,
      min: [0, 'Popularity score cannot be negative'],
      max: [100, 'Popularity score cannot exceed 100']
    },
    climate: {
      type: {
        type: String,
        required: [true, 'Climate type is required'],
        enum: {
          values: ['tropical', 'temperate', 'arid', 'cold', 'mediterranean', 'continental'],
          message: 'Invalid climate type'
        }
      },
      bestVisitMonths: [{
        type: String,
        enum: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      }],
      averageTemperature: {
        min: {
          type: Number,
          required: [true, 'Minimum temperature is required']
        },
        max: {
          type: Number,
          required: [true, 'Maximum temperature is required']
        }
      },
      rainfallPattern: {
        type: String,
        maxlength: [200, 'Rainfall pattern cannot be more than 200 characters']
      }
    },
    attractions: [{
      name: {
        type: String,
        required: [true, 'Attraction name is required'],
        trim: true,
        maxlength: [100, 'Attraction name cannot be more than 100 characters']
      },
      type: {
        type: String,
        required: [true, 'Attraction type is required'],
        trim: true,
        maxlength: [50, 'Attraction type cannot be more than 50 characters']
      },
      description: {
        type: String,
        required: [true, 'Attraction description is required'],
        trim: true,
        maxlength: [500, 'Attraction description cannot be more than 500 characters']
      },
      entryFee: {
        type: Number,
        default: 0,
        min: [0, 'Entry fee cannot be negative']
      },
      timings: {
        type: String,
        required: [true, 'Attraction timings are required'],
        maxlength: [100, 'Timings cannot be more than 100 characters']
      },
      rating: {
        type: Number,
        default: 0,
        min: [0, 'Rating must be between 0 and 5'],
        max: [5, 'Rating must be between 0 and 5']
      }
    }],
    accommodation: {
      budget: {
        available: { type: Boolean, default: false },
        priceRange: {
          min: { type: Number, default: 0 },
          max: { type: Number, default: 0 }
        },
        options: [{ type: String, maxlength: [100, 'Option cannot be more than 100 characters'] }]
      },
      midRange: {
        available: { type: Boolean, default: false },
        priceRange: {
          min: { type: Number, default: 0 },
          max: { type: Number, default: 0 }
        },
        options: [{ type: String, maxlength: [100, 'Option cannot be more than 100 characters'] }]
      },
      luxury: {
        available: { type: Boolean, default: false },
        priceRange: {
          min: { type: Number, default: 0 },
          max: { type: Number, default: 0 }
        },
        options: [{ type: String, maxlength: [100, 'Option cannot be more than 100 characters'] }]
      }
    },
    transportation: {
      nearestAirport: {
        name: { type: String, maxlength: [100, 'Airport name cannot be more than 100 characters'] },
        code: { type: String, maxlength: [10, 'Airport code cannot be more than 10 characters'] },
        distance: { type: Number, min: [0, 'Distance cannot be negative'] }
      },
      nearestRailway: {
        name: { type: String, maxlength: [100, 'Railway name cannot be more than 100 characters'] },
        distance: { type: Number, min: [0, 'Distance cannot be negative'] }
      },
      roadConnectivity: {
        highways: [{ type: String, maxlength: [50, 'Highway name cannot be more than 50 characters'] }],
        accessibility: {
          type: String,
          enum: ['excellent', 'good', 'moderate', 'poor'],
          default: 'good'
        }
      },
      localTransport: [{ type: String, maxlength: [50, 'Transport type cannot be more than 50 characters'] }]
    },
    activities: [{
      type: String,
      trim: true,
      maxlength: [100, 'Activity cannot be more than 100 characters']
    }],
    cuisine: {
      specialties: [{ type: String, maxlength: [100, 'Specialty cannot be more than 100 characters'] }],
      restaurants: [{
        name: { type: String, required: true, maxlength: [100, 'Restaurant name cannot be more than 100 characters'] },
        type: { type: String, required: true, maxlength: [50, 'Restaurant type cannot be more than 50 characters'] },
        priceRange: { type: String, enum: ['budget', 'mid-range', 'expensive'], required: true },
        rating: { type: Number, min: [0, 'Rating must be between 0 and 5'], max: [5, 'Rating must be between 0 and 5'] }
      }]
    },
    shopping: {
      markets: [{ type: String, maxlength: [100, 'Market name cannot be more than 100 characters'] }],
      specialItems: [{ type: String, maxlength: [100, 'Special item cannot be more than 100 characters'] }],
      shoppingCenters: [{ type: String, maxlength: [100, 'Shopping center cannot be more than 100 characters'] }]
    },
    safety: {
      rating: {
        type: Number,
        default: 5,
        min: [1, 'Safety rating must be between 1 and 10'],
        max: [10, 'Safety rating must be between 1 and 10']
      },
      tips: [{ type: String, maxlength: [200, 'Safety tip cannot be more than 200 characters'] }],
      emergencyContacts: {
        police: { type: String, maxlength: [20, 'Phone number cannot be more than 20 characters'] },
        hospital: { type: String, maxlength: [20, 'Phone number cannot be more than 20 characters'] },
        touristHelpline: { type: String, maxlength: [20, 'Phone number cannot be more than 20 characters'] }
      }
    },
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
      category: {
        type: String,
        enum: ['landscape', 'attraction', 'culture', 'food', 'accommodation'],
        required: true
      },
      isPrimary: {
        type: Boolean,
        default: false
      }
    }],
    videos: [{
      url: { type: String, required: true, trim: true },
      title: { type: String, required: true, maxlength: [100, 'Video title cannot be more than 100 characters'] },
      duration: { type: Number, min: [0, 'Duration cannot be negative'] },
      type: {
        type: String,
        enum: ['promotional', 'documentary', 'virtual-tour'],
        required: true
      }
    }],
    languages: [{ type: String, maxlength: [30, 'Language cannot be more than 30 characters'] }],
    currency: { type: String, maxlength: [10, 'Currency cannot be more than 10 characters'] },
    timeZone: { type: String, maxlength: [50, 'Time zone cannot be more than 50 characters'] },
    tags: [{ type: String, trim: true, maxlength: [50, 'Tag cannot be more than 50 characters'] }],
    seoData: {
      metaTitle: { type: String, maxlength: [60, 'Meta title cannot be more than 60 characters'] },
      metaDescription: { type: String, maxlength: [160, 'Meta description cannot be more than 160 characters'] },
      keywords: [{ type: String, maxlength: [50, 'Keyword cannot be more than 50 characters'] }],
      slug: {
        type: String,
        unique: true,
        lowercase: true,
        maxlength: [100, 'Slug cannot be more than 100 characters']
      }
    },
    statistics: {
      totalVisitors: { type: Number, default: 0, min: [0, 'Total visitors cannot be negative'] },
      averageStayDuration: { type: Number, default: 0, min: [0, 'Average stay duration cannot be negative'] },
      peakSeason: [{ type: String, maxlength: [20, 'Season cannot be more than 20 characters'] }],
      offSeason: [{ type: String, maxlength: [20, 'Season cannot be more than 20 characters'] }]
    },
    packages: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Package'
    }],
    reviews: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      rating: {
        type: Number,
        required: true,
        min: [1, 'Rating must be between 1 and 5'],
        max: [5, 'Rating must be between 1 and 5']
      },
      comment: {
        type: String,
        required: true,
        maxlength: [1000, 'Comment cannot be more than 1000 characters']
      },
      date: {
        type: Date,
        default: Date.now
      },
      helpful: {
        type: Number,
        default: 0,
        min: [0, 'Helpful count cannot be negative']
      }
    }],
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
      },
      breakdown: {
        attractions: { type: Number, default: 0, min: [0, 'Rating must be between 0 and 5'], max: [5, 'Rating must be between 0 and 5'] },
        accommodation: { type: Number, default: 0, min: [0, 'Rating must be between 0 and 5'], max: [5, 'Rating must be between 0 and 5'] },
        food: { type: Number, default: 0, min: [0, 'Rating must be between 0 and 5'], max: [5, 'Rating must be between 0 and 5'] },
        transportation: { type: Number, default: 0, min: [0, 'Rating must be between 0 and 5'], max: [5, 'Rating must be between 0 and 5'] },
        value: { type: Number, default: 0, min: [0, 'Rating must be between 0 and 5'], max: [5, 'Rating must be between 0 and 5'] }
      }
    },
    isActive: {
      type: Boolean,
      default: true
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    isPopular: {
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
DestinationSchema.index({ name: 1 });
DestinationSchema.index({ country: 1, state: 1, city: 1 });
DestinationSchema.index({ category: 1 });
DestinationSchema.index({ 'rating.average': -1 });
DestinationSchema.index({ popularityScore: -1 });
DestinationSchema.index({ isActive: 1 });
DestinationSchema.index({ isFeatured: 1 });
DestinationSchema.index({ isPopular: 1 });
DestinationSchema.index({ tags: 1 });
DestinationSchema.index({ 'coordinates.latitude': 1, 'coordinates.longitude': 1 });

// Add a compound index for search functionality
DestinationSchema.index({
  name: 'text',
  description: 'text',
  shortDescription: 'text',
  city: 'text',
  state: 'text',
  country: 'text',
  tags: 'text'
});

// Pre-save middleware for validation and data processing
DestinationSchema.pre<IDestination>('save', function(next) {
  // Generate slug from name if not provided
  if (!this.seoData.slug) {
    this.seoData.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  // Ensure at least one primary image
  const primaryImages = this.images.filter(img => img.isPrimary);
  if (this.images.length > 0 && primaryImages.length === 0) {
    this.images[0].isPrimary = true;
  }

  // Validate temperature range
  if (this.climate.averageTemperature.min >= this.climate.averageTemperature.max) {
    next(new Error('Minimum temperature must be less than maximum temperature'));
  }

  // Calculate popularity score based on ratings and reviews
  if (this.rating.totalReviews > 0) {
    this.popularityScore = Math.min(100, (this.rating.average * 20) + (this.rating.totalReviews / 10));
  }

  next();
});

// Virtual for full location
DestinationSchema.virtual('fullLocation').get(function(this: IDestination) {
  return `${this.city}, ${this.state}, ${this.country}`;
});

// Virtual for coordinate string
DestinationSchema.virtual('coordinateString').get(function(this: IDestination) {
  return `${this.coordinates.latitude}, ${this.coordinates.longitude}`;
});

// Virtual for best visit period
DestinationSchema.virtual('bestVisitPeriod').get(function(this: IDestination) {
  if (this.climate.bestVisitMonths.length === 0) return 'Year-round';
  if (this.climate.bestVisitMonths.length === 12) return 'Year-round';
  return this.climate.bestVisitMonths.join(', ');
});

// Method to add a review
DestinationSchema.methods.addReview = function(this: IDestination, userId: string, rating: number, comment: string) {
  this.reviews.push({
    user: new mongoose.Types.ObjectId(userId),
    rating,
    comment,
    date: new Date(),
    helpful: 0
  } as any);

  // Recalculate average rating
  this.updateRating();
  return this.save();
};

// Method to update rating
DestinationSchema.methods.updateRating = function(this: IDestination) {
  if (this.reviews.length === 0) {
    this.rating.average = 0;
    this.rating.totalReviews = 0;
    return;
  }

  const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
  this.rating.average = Number((totalRating / this.reviews.length).toFixed(1));
  this.rating.totalReviews = this.reviews.length;

  // Update popularity score
  this.popularityScore = Math.min(100, (this.rating.average * 20) + (this.rating.totalReviews / 10));
};

// Method to get nearby destinations (requires geospatial index)
DestinationSchema.methods.getNearbyDestinations = function(this: IDestination, maxDistance: number = 100) {
  return mongoose.model('Destination').find({
    _id: { $ne: this._id },
    isActive: true,
    coordinates: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [this.coordinates.longitude, this.coordinates.latitude]
        },
        $maxDistance: maxDistance * 1000 // Convert km to meters
      }
    }
  }).limit(10);
};

// Static method to find destinations by category
DestinationSchema.statics.findByCategory = function(category: string) {
  return this.find({ category, isActive: true });
};

// Static method to find featured destinations
DestinationSchema.statics.findFeatured = function() {
  return this.find({ isFeatured: true, isActive: true });
};

// Static method to find popular destinations
DestinationSchema.statics.findPopular = function() {
  return this.find({ isPopular: true, isActive: true }).sort({ popularityScore: -1 });
};

// Static method to search destinations
DestinationSchema.statics.searchDestinations = function(searchText: string) {
  return this.find({
    $text: { $search: searchText },
    isActive: true
  }).sort({ score: { $meta: 'textScore' } });
};

// Create and export the Destination model
export default mongoose.model<IDestination>('Destination', DestinationSchema);
