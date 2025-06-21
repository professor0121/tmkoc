import Package, { IPackage } from "../models/Package";
import mongoose from "mongoose";

/**
 * Create a new package
 */
export const createPackage = async (packageData: Partial<IPackage>): Promise<IPackage> => {
  const newPackage = new Package(packageData);
  return await newPackage.save();
};

/**
 * Find package by ID
 */
export const findPackageById = async (id: string): Promise<IPackage | null> => {
  return await Package.findById(id).populate('createdBy updatedBy', 'name email');
};

/**
 * Find all packages with optional filters
 */
export const findPackages = async (filters: any = {}, options: any = {}): Promise<IPackage[]> => {
  const {
    page = 1,
    limit = 10,
    sort = { createdAt: -1 },
    populate = 'createdBy updatedBy'
  } = options;

  const skip = (page - 1) * limit;

  return await Package.find(filters)
    .populate(populate, 'name email')
    .sort(sort)
    .skip(skip)
    .limit(limit);
};

/**
 * Find packages by category
 */
export const findPackagesByCategory = async (category: string): Promise<IPackage[]> => {
  return await Package.find({ category, isActive: true })
    .populate('createdBy', 'name email');
};

/**
 * Find featured packages
 */
export const findFeaturedPackages = async (): Promise<IPackage[]> => {
  return await Package.find({ isFeatured: true, isActive: true })
    .populate('createdBy', 'name email')
    .sort({ 'rating.average': -1 });
};

/**
 * Find packages by destination
 */
export const findPackagesByDestination = async (destination: string): Promise<IPackage[]> => {
  return await Package.find({ 
    destination: new RegExp(destination, 'i'), 
    isActive: true 
  }).populate('createdBy', 'name email');
};

/**
 * Find packages by price range
 */
export const findPackagesByPriceRange = async (minPrice: number, maxPrice: number): Promise<IPackage[]> => {
  return await Package.find({
    'price.adult': { $gte: minPrice, $lte: maxPrice },
    isActive: true
  }).populate('createdBy', 'name email');
};

/**
 * Search packages by text
 */
export const searchPackages = async (searchText: string): Promise<IPackage[]> => {
  return await Package.find({
    $text: { $search: searchText },
    isActive: true
  }).populate('createdBy', 'name email');
};

/**
 * Update package by ID
 */
export const updatePackageById = async (
  id: string, 
  updateData: Partial<IPackage>
): Promise<IPackage | null> => {
  return await Package.findByIdAndUpdate(
    id, 
    { ...updateData, updatedAt: new Date() },
    { new: true, runValidators: true }
  ).populate('createdBy updatedBy', 'name email');
};

/**
 * Delete package by ID (soft delete by setting isActive to false)
 */
export const deletePackageById = async (id: string): Promise<IPackage | null> => {
  return await Package.findByIdAndUpdate(
    id,
    { isActive: false, updatedAt: new Date() },
    { new: true }
  );
};

/**
 * Hard delete package by ID
 */
export const hardDeletePackageById = async (id: string): Promise<IPackage | null> => {
  return await Package.findByIdAndDelete(id);
};

/**
 * Get package count with optional filters
 */
export const getPackageCount = async (filters: any = {}): Promise<number> => {
  return await Package.countDocuments(filters);
};

/**
 * Find packages by location
 */
export const findPackagesByLocation = async (
  country?: string, 
  state?: string, 
  city?: string
): Promise<IPackage[]> => {
  const locationFilter: any = { isActive: true };
  
  if (country) locationFilter['location.country'] = new RegExp(country, 'i');
  if (state) locationFilter['location.state'] = new RegExp(state, 'i');
  if (city) locationFilter['location.city'] = new RegExp(city, 'i');

  return await Package.find(locationFilter).populate('createdBy', 'name email');
};

/**
 * Find packages by duration
 */
export const findPackagesByDuration = async (minDays: number, maxDays: number): Promise<IPackage[]> => {
  return await Package.find({
    'duration.days': { $gte: minDays, $lte: maxDays },
    isActive: true
  }).populate('createdBy', 'name email');
};

/**
 * Find packages by difficulty level
 */
export const findPackagesByDifficulty = async (difficulty: string): Promise<IPackage[]> => {
  return await Package.find({ difficulty, isActive: true })
    .populate('createdBy', 'name email');
};

/**
 * Find packages with availability in date range
 */
export const findAvailablePackages = async (startDate: Date, endDate: Date): Promise<IPackage[]> => {
  return await Package.find({
    isActive: true,
    'availability': {
      $elemMatch: {
        isAvailable: true,
        startDate: { $lte: startDate },
        endDate: { $gte: endDate },
        $expr: { $lt: ['$currentBookings', '$maxBookings'] }
      }
    }
  }).populate('createdBy', 'name email');
};

/**
 * Update package rating
 */
export const updatePackageRating = async (
  id: string, 
  newRating: number, 
  totalReviews: number
): Promise<IPackage | null> => {
  return await Package.findByIdAndUpdate(
    id,
    {
      'rating.average': newRating,
      'rating.totalReviews': totalReviews,
      updatedAt: new Date()
    },
    { new: true }
  );
};

/**
 * Add package to featured
 */
export const addToFeatured = async (id: string): Promise<IPackage | null> => {
  return await Package.findByIdAndUpdate(
    id,
    { isFeatured: true, updatedAt: new Date() },
    { new: true }
  );
};

/**
 * Remove package from featured
 */
export const removeFromFeatured = async (id: string): Promise<IPackage | null> => {
  return await Package.findByIdAndUpdate(
    id,
    { isFeatured: false, updatedAt: new Date() },
    { new: true }
  );
};

/**
 * Get packages with advanced filters
 */
export const getPackagesWithFilters = async (filters: {
  category?: string;
  destination?: string;
  minPrice?: number;
  maxPrice?: number;
  minDays?: number;
  maxDays?: number;
  difficulty?: string;
  features?: string[];
  tags?: string[];
  rating?: number;
  page?: number;
  limit?: number;
  sort?: any;
}): Promise<{ packages: IPackage[], total: number, page: number, totalPages: number }> => {
  const {
    category,
    destination,
    minPrice,
    maxPrice,
    minDays,
    maxDays,
    difficulty,
    features,
    tags,
    rating,
    page = 1,
    limit = 10,
    sort = { createdAt: -1 }
  } = filters;

  const query: any = { isActive: true };

  // Apply filters
  if (category) query.category = category;
  if (destination) query.destination = new RegExp(destination, 'i');
  if (difficulty) query.difficulty = difficulty;
  if (minPrice || maxPrice) {
    query['price.adult'] = {};
    if (minPrice) query['price.adult'].$gte = minPrice;
    if (maxPrice) query['price.adult'].$lte = maxPrice;
  }
  if (minDays || maxDays) {
    query['duration.days'] = {};
    if (minDays) query['duration.days'].$gte = minDays;
    if (maxDays) query['duration.days'].$lte = maxDays;
  }
  if (features && features.length > 0) {
    query.features = { $in: features };
  }
  if (tags && tags.length > 0) {
    query.tags = { $in: tags };
  }
  if (rating) {
    query['rating.average'] = { $gte: rating };
  }

  const skip = (page - 1) * limit;
  const total = await Package.countDocuments(query);
  const totalPages = Math.ceil(total / limit);

  const packages = await Package.find(query)
    .populate('createdBy', 'name email')
    .sort(sort)
    .skip(skip)
    .limit(limit);

  return {
    packages,
    total,
    page,
    totalPages
  };
};

/**
 * Get popular packages (by rating and reviews)
 */
export const getPopularPackages = async (limit: number = 10): Promise<IPackage[]> => {
  return await Package.find({ isActive: true })
    .sort({ 'rating.average': -1, 'rating.totalReviews': -1 })
    .limit(limit)
    .populate('createdBy', 'name email');
};
