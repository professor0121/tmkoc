import {
  createPackage,
  findPackageById,
  findPackages,
  findPackagesByCategory,
  findFeaturedPackages,
  findPackagesByDestination,
  findPackagesByPriceRange,
  searchPackages,
  updatePackageById,
  deletePackageById,
  getPackageCount,
  findPackagesByLocation,
  findPackagesByDuration,
  findPackagesByDifficulty,
  findAvailablePackages,
  updatePackageRating,
  addToFeatured,
  removeFromFeatured,
  getPackagesWithFilters,
  getPopularPackages
} from '../dao/package.dao';
import { IPackage } from '../models/Package';

/**
 * Package Service - Business logic layer for package operations
 */

/**
 * Create a new package with validation
 */
export const createPackageService = async (packageData: Partial<IPackage>, userId: string): Promise<IPackage> => {
  // Validate required fields
  if (!packageData.title || !packageData.description || !packageData.destination) {
    throw new Error('Title, description, and destination are required');
  }

  // Validate price structure
  if (!packageData.price?.adult || packageData.price.adult <= 0) {
    throw new Error('Valid adult price is required');
  }

  // Validate duration
  if (!packageData.duration?.days || packageData.duration.days <= 0) {
    throw new Error('Valid duration in days is required');
  }

  // Validate group size
  if (!packageData.groupSize?.min || !packageData.groupSize?.max) {
    throw new Error('Group size min and max are required');
  }

  if (packageData.groupSize.min > packageData.groupSize.max) {
    throw new Error('Minimum group size cannot be greater than maximum group size');
  }

  // Set default values
  const packageToCreate = {
    ...packageData,
    createdBy: userId,
    updatedBy: userId,
    isActive: true,
    isFeatured: false,
    rating: {
      average: 0,
      totalReviews: 0
    }
  };

  return await createPackage(packageToCreate);
};

/**
 * Get package by ID with additional business logic
 */
export const getPackageByIdService = async (id: string): Promise<IPackage | null> => {
  const package_ = await findPackageById(id);
  
  if (!package_) {
    throw new Error('Package not found');
  }

  // Check if package is active
  if (!package_.isActive) {
    throw new Error('Package is not available');
  }

  return package_;
};

/**
 * Update package with validation
 */
export const updatePackageService = async (
  id: string, 
  updateData: Partial<IPackage>, 
  userId: string
): Promise<IPackage | null> => {
  const existingPackage = await findPackageById(id);
  
  if (!existingPackage) {
    throw new Error('Package not found');
  }

  // Validate price if being updated
  if (updateData.price?.adult && updateData.price.adult <= 0) {
    throw new Error('Valid adult price is required');
  }

  // Validate duration if being updated
  if (updateData.duration?.days && updateData.duration.days <= 0) {
    throw new Error('Valid duration in days is required');
  }

  // Validate group size if being updated
  if (updateData.groupSize) {
    if (updateData.groupSize.min && updateData.groupSize.max && 
        updateData.groupSize.min > updateData.groupSize.max) {
      throw new Error('Minimum group size cannot be greater than maximum group size');
    }
  }

  const dataToUpdate = {
    ...updateData,
    updatedBy: userId
  };

  return await updatePackageById(id, dataToUpdate);
};

/**
 * Get packages with advanced filtering and business logic
 */
export const getPackagesWithFiltersService = async (filters: any) => {
  // Apply business rules
  const businessFilters = {
    ...filters,
    isActive: true // Only show active packages
  };

  // If no sort specified, default to featured first, then by rating
  if (!filters.sort) {
    businessFilters.sort = { isFeatured: -1, 'rating.average': -1, createdAt: -1 };
  }

  return await getPackagesWithFilters(businessFilters);
};

/**
 * Search packages with enhanced logic
 */
export const searchPackagesService = async (searchText: string, filters: any = {}) => {
  if (!searchText || searchText.trim().length < 2) {
    throw new Error('Search text must be at least 2 characters long');
  }

  // Combine text search with filters
  const searchFilters = {
    ...filters,
    isActive: true
  };

  // First try text search
  let packages = await searchPackages(searchText);

  // If no results from text search, try partial matching on destination and title
  if (packages.length === 0) {
    packages = await findPackages({
      ...searchFilters,
      $or: [
        { title: new RegExp(searchText, 'i') },
        { destination: new RegExp(searchText, 'i') },
        { tags: new RegExp(searchText, 'i') }
      ]
    });
  }

  return packages;
};

/**
 * Get package recommendations based on user preferences
 */
export const getPackageRecommendations = async (
  userPreferences: {
    category?: string;
    priceRange?: { min: number; max: number };
    duration?: { min: number; max: number };
    difficulty?: string;
    location?: string;
  },
  limit: number = 5
): Promise<IPackage[]> => {
  const filters: any = { isActive: true };

  // Build recommendation filters
  if (userPreferences.category) {
    filters.category = userPreferences.category;
  }

  if (userPreferences.priceRange) {
    filters['price.adult'] = {
      $gte: userPreferences.priceRange.min,
      $lte: userPreferences.priceRange.max
    };
  }

  if (userPreferences.duration) {
    filters['duration.days'] = {
      $gte: userPreferences.duration.min,
      $lte: userPreferences.duration.max
    };
  }

  if (userPreferences.difficulty) {
    filters.difficulty = userPreferences.difficulty;
  }

  if (userPreferences.location) {
    filters.$or = [
      { 'location.country': new RegExp(userPreferences.location, 'i') },
      { 'location.state': new RegExp(userPreferences.location, 'i') },
      { 'location.city': new RegExp(userPreferences.location, 'i') },
      { destination: new RegExp(userPreferences.location, 'i') }
    ];
  }

  const options = {
    limit,
    sort: { 'rating.average': -1, isFeatured: -1 }
  };

  return await findPackages(filters, options);
};

/**
 * Check package availability for booking
 */
export const checkPackageAvailability = async (
  packageId: string,
  startDate: Date,
  endDate: Date,
  groupSize: number
): Promise<{ available: boolean; message: string; availableSlots?: any[] }> => {
  const package_ = await findPackageById(packageId);

  if (!package_) {
    return { available: false, message: 'Package not found' };
  }

  if (!package_.isActive) {
    return { available: false, message: 'Package is not available' };
  }

  // Check group size constraints
  if (groupSize < package_.groupSize.min || groupSize > package_.groupSize.max) {
    return {
      available: false,
      message: `Group size must be between ${package_.groupSize.min} and ${package_.groupSize.max}`
    };
  }

  // Check availability slots
  const availableSlots = package_.availability.filter(slot =>
    slot.isAvailable &&
    startDate >= slot.startDate &&
    endDate <= slot.endDate &&
    slot.currentBookings < slot.maxBookings
  );

  if (availableSlots.length === 0) {
    return {
      available: false,
      message: 'No availability for the selected dates',
      availableSlots: package_.availability.filter(slot => 
        slot.isAvailable && slot.startDate > new Date()
      )
    };
  }

  return {
    available: true,
    message: 'Package is available for booking',
    availableSlots
  };
};

/**
 * Calculate package pricing for a group
 */
export const calculatePackagePricing = (
  package_: IPackage,
  adults: number,
  children: number,
  infants: number
): { totalPrice: number; breakdown: any } => {
  const breakdown = {
    adults: {
      count: adults,
      pricePerPerson: package_.price.adult,
      total: adults * package_.price.adult
    },
    children: {
      count: children,
      pricePerPerson: package_.price.child,
      total: children * package_.price.child
    },
    infants: {
      count: infants,
      pricePerPerson: package_.price.infant,
      total: infants * package_.price.infant
    }
  };

  const totalPrice = breakdown.adults.total + breakdown.children.total + breakdown.infants.total;

  return { totalPrice, breakdown };
};

/**
 * Get package statistics
 */
export const getPackageStatistics = async () => {
  const totalPackages = await getPackageCount({ isActive: true });
  const featuredPackages = await getPackageCount({ isActive: true, isFeatured: true });
  
  // Get category distribution
  const categories = ['adventure', 'cultural', 'religious', 'wildlife', 'beach', 'hill-station', 'heritage', 'honeymoon', 'family', 'business'];
  const categoryStats = await Promise.all(
    categories.map(async (category) => ({
      category,
      count: await getPackageCount({ category, isActive: true })
    }))
  );

  return {
    totalPackages,
    featuredPackages,
    categoryDistribution: categoryStats
  };
};
