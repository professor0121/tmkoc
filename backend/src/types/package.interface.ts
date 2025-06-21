import { Document } from 'mongoose';

/**
 * Package Category Types
 */
export type PackageCategory = 
  | 'adventure' 
  | 'cultural' 
  | 'religious' 
  | 'wildlife' 
  | 'beach' 
  | 'hill-station' 
  | 'heritage' 
  | 'honeymoon' 
  | 'family' 
  | 'business';

/**
 * Package Difficulty Levels
 */
export type PackageDifficulty = 'easy' | 'moderate' | 'challenging' | 'extreme';

/**
 * Guide Types
 */
export type GuideType = 'local' | 'professional' | 'expert';

/**
 * Package Duration Interface
 */
export interface PackageDuration {
  days: number;
  nights: number;
}

/**
 * Package Pricing Interface
 */
export interface PackagePricing {
  adult: number;
  child: number;
  infant: number;
}

/**
 * Group Size Interface
 */
export interface GroupSize {
  min: number;
  max: number;
}

/**
 * Itinerary Day Interface
 */
export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
  meals: string[];
  accommodation?: string;
}

/**
 * Package Image Interface
 */
export interface PackageImage {
  url: string;
  alt: string;
  isPrimary: boolean;
}

/**
 * Location Coordinates Interface
 */
export interface LocationCoordinates {
  latitude: number;
  longitude: number;
}

/**
 * Package Location Interface
 */
export interface PackageLocation {
  country: string;
  state: string;
  city: string;
  coordinates: LocationCoordinates;
}

/**
 * Availability Slot Interface
 */
export interface AvailabilitySlot {
  startDate: Date;
  endDate: Date;
  isAvailable: boolean;
  maxBookings: number;
  currentBookings: number;
}

/**
 * Transportation Details Interface
 */
export interface Transportation {
  included: boolean;
  type: string[];
  details: string;
}

/**
 * Accommodation Details Interface
 */
export interface Accommodation {
  type: string;
  rating: number;
  details: string;
}

/**
 * Meals Information Interface
 */
export interface MealsInfo {
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
  details: string;
}

/**
 * Guide Information Interface
 */
export interface GuideInfo {
  included: boolean;
  language: string[];
  type: GuideType;
}

/**
 * Cancellation Policy Interface
 */
export interface CancellationPolicy {
  refundable: boolean;
  cancellationDeadline: number; // days before trip
  refundPercentage: number;
  terms: string;
}

/**
 * Package Rating Interface
 */
export interface PackageRating {
  average: number;
  totalReviews: number;
}

/**
 * Package Filter Interface for API queries
 */
export interface PackageFilters {
  category?: PackageCategory;
  destination?: string;
  minPrice?: number;
  maxPrice?: number;
  minDays?: number;
  maxDays?: number;
  difficulty?: PackageDifficulty;
  features?: string[];
  tags?: string[];
  rating?: number;
  country?: string;
  state?: string;
  city?: string;
  isActive?: boolean;
  isFeatured?: boolean;
}

/**
 * Package Search Options Interface
 */
export interface PackageSearchOptions {
  page?: number;
  limit?: number;
  sort?: string | object;
  populate?: string;
}

/**
 * Package Query Result Interface
 */
export interface PackageQueryResult {
  packages: IPackageDocument[];
  total: number;
  page: number;
  totalPages: number;
}

/**
 * Package Creation Input Interface
 */
export interface CreatePackageInput {
  title: string;
  description: string;
  shortDescription: string;
  destination: string;
  duration: PackageDuration;
  price: PackagePricing;
  groupSize: GroupSize;
  category: PackageCategory;
  difficulty: PackageDifficulty;
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
  images: PackageImage[];
  location: PackageLocation;
  availability: AvailabilitySlot[];
  features: string[];
  transportation: Transportation;
  accommodation: Accommodation;
  meals: MealsInfo;
  guide: GuideInfo;
  cancellationPolicy: CancellationPolicy;
  tags: string[];
  isActive?: boolean;
  isFeatured?: boolean;
}

/**
 * Package Update Input Interface
 */
export interface UpdatePackageInput extends Partial<CreatePackageInput> {
  updatedBy?: string;
}

/**
 * Package Booking Availability Check Interface
 */
export interface AvailabilityCheck {
  packageId: string;
  startDate: Date;
  endDate: Date;
  groupSize: number;
}

/**
 * Package Pricing Calculation Interface
 */
export interface PricingCalculation {
  adults: number;
  children: number;
  infants: number;
}

/**
 * Package Pricing Result Interface
 */
export interface PricingResult {
  totalPrice: number;
  breakdown: {
    adults: {
      count: number;
      pricePerPerson: number;
      total: number;
    };
    children: {
      count: number;
      pricePerPerson: number;
      total: number;
    };
    infants: {
      count: number;
      pricePerPerson: number;
      total: number;
    };
  };
}

/**
 * Package Statistics Interface
 */
export interface PackageStatistics {
  totalPackages: number;
  featuredPackages: number;
  categoryDistribution: {
    category: PackageCategory;
    count: number;
  }[];
}

/**
 * Package Recommendation Preferences Interface
 */
export interface RecommendationPreferences {
  category?: PackageCategory;
  priceRange?: {
    min: number;
    max: number;
  };
  duration?: {
    min: number;
    max: number;
  };
  difficulty?: PackageDifficulty;
  location?: string;
}

/**
 * Package Document Interface (extends Mongoose Document)
 */
export interface IPackageDocument extends Document {
  title: string;
  description: string;
  shortDescription: string;
  destination: string;
  duration: PackageDuration;
  price: PackagePricing;
  groupSize: GroupSize;
  category: PackageCategory;
  difficulty: PackageDifficulty;
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
  images: PackageImage[];
  location: PackageLocation;
  availability: AvailabilitySlot[];
  features: string[];
  transportation: Transportation;
  accommodation: Accommodation;
  meals: MealsInfo;
  guide: GuideInfo;
  cancellationPolicy: CancellationPolicy;
  rating: PackageRating;
  tags: string[];
  isActive: boolean;
  isFeatured: boolean;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
  
  // Virtual properties
  totalDuration: string;
  priceRange: string;
  
  // Instance methods
  isAvailableForDates(startDate: Date, endDate: Date): boolean;
  getAvailableSlots(): AvailabilitySlot[];
}

/**
 * Package Model Static Methods Interface
 */
export interface IPackageModel {
  findByCategory(category: PackageCategory): Promise<IPackageDocument[]>;
  findFeatured(): Promise<IPackageDocument[]>;
}
