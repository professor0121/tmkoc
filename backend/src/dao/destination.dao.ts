import Destination, { IDestination } from "../models/Destination";
import mongoose from "mongoose";

/**
 * Create a new destination
 */
export const createDestination = async (destinationData: Partial<IDestination>): Promise<IDestination> => {
  const newDestination = new Destination(destinationData);
  return await newDestination.save();
};

/**
 * Find destination by ID
 */
export const findDestinationById = async (id: string): Promise<IDestination | null> => {
  return await Destination.findById(id)
    .populate('createdBy updatedBy', 'name email')
    .populate('packages', 'title price duration')
    .populate('reviews.user', 'name email');
};

/**
 * Find all destinations with optional filters
 */
export const findDestinations = async (filters: any = {}, options: any = {}): Promise<IDestination[]> => {
  const {
    page = 1,
    limit = 10,
    sort = { createdAt: -1 },
    populate = 'createdBy updatedBy'
  } = options;

  const skip = (page - 1) * limit;

  return await Destination.find(filters)
    .populate(populate, 'name email')
    .sort(sort)
    .skip(skip)
    .limit(limit);
};

/**
 * Find destinations by category
 */
export const findDestinationsByCategory = async (category: string): Promise<IDestination[]> => {
  return await Destination.find({ category, isActive: true });
};

/**
 * Find featured destinations
 */
export const findFeaturedDestinations = async (): Promise<IDestination[]> => {
  return await Destination.find({ isFeatured: true, isActive: true });
};

/**
 * Find popular destinations
 */
export const findPopularDestinations = async (): Promise<IDestination[]> => {
  return await Destination.find({ isPopular: true, isActive: true }).sort({ popularityScore: -1 });
};

/**
 * Search destinations by text
 */
export const searchDestinations = async (searchText: string): Promise<IDestination[]> => {
  return await Destination.find({
    $text: { $search: searchText },
    isActive: true
  }).sort({ score: { $meta: 'textScore' } });
};

/**
 * Find destinations by location
 */
export const findDestinationsByLocation = async (
  country?: string,
  state?: string,
  city?: string
): Promise<IDestination[]> => {
  const locationFilter: any = { isActive: true };
  
  if (country) locationFilter.country = new RegExp(country, 'i');
  if (state) locationFilter.state = new RegExp(state, 'i');
  if (city) locationFilter.city = new RegExp(city, 'i');

  return await Destination.find(locationFilter)
    .populate('createdBy', 'name email');
};

/**
 * Find destinations by climate type
 */
export const findDestinationsByClimate = async (climateType: string): Promise<IDestination[]> => {
  return await Destination.find({
    'climate.type': climateType,
    isActive: true
  }).populate('createdBy', 'name email');
};

/**
 * Find destinations within coordinate bounds
 */
export const findDestinationsInBounds = async (
  northEast: { lat: number; lng: number },
  southWest: { lat: number; lng: number }
): Promise<IDestination[]> => {
  return await Destination.find({
    isActive: true,
    'coordinates.latitude': {
      $gte: southWest.lat,
      $lte: northEast.lat
    },
    'coordinates.longitude': {
      $gte: southWest.lng,
      $lte: northEast.lng
    }
  });
};

/**
 * Find destinations by rating range
 */
export const findDestinationsByRating = async (minRating: number, maxRating: number = 5): Promise<IDestination[]> => {
  return await Destination.find({
    'rating.average': { $gte: minRating, $lte: maxRating },
    isActive: true
  }).populate('createdBy', 'name email');
};

/**
 * Update destination by ID
 */
export const updateDestinationById = async (
  id: string,
  updateData: Partial<IDestination>
): Promise<IDestination | null> => {
  return await Destination.findByIdAndUpdate(
    id,
    { ...updateData, updatedAt: new Date() },
    { new: true, runValidators: true }
  ).populate('createdBy updatedBy', 'name email');
};

/**
 * Delete destination by ID (soft delete)
 */
export const deleteDestinationById = async (id: string): Promise<IDestination | null> => {
  return await Destination.findByIdAndUpdate(
    id,
    { isActive: false, updatedAt: new Date() },
    { new: true }
  );
};

/**
 * Hard delete destination by ID
 */
export const hardDeleteDestinationById = async (id: string): Promise<IDestination | null> => {
  return await Destination.findByIdAndDelete(id);
};

/**
 * Get destination count with optional filters
 */
export const getDestinationCount = async (filters: any = {}): Promise<number> => {
  return await Destination.countDocuments(filters);
};

/**
 * Add review to destination
 */
export const addDestinationReview = async (
  id: string,
  userId: string,
  rating: number,
  comment: string
): Promise<IDestination | null> => {
  const destination = await Destination.findById(id);
  if (!destination) return null;
  
  return await destination.addReview(userId, rating, comment);
};

/**
 * Get destinations with advanced filters
 */
export const getDestinationsWithFilters = async (filters: {
  category?: string;
  country?: string;
  state?: string;
  city?: string;
  climateType?: string;
  minRating?: number;
  maxRating?: number;
  tags?: string[];
  isPopular?: boolean;
  isFeatured?: boolean;
  page?: number;
  limit?: number;
  sort?: any;
}): Promise<{ destinations: IDestination[], total: number, page: number, totalPages: number }> => {
  const {
    category,
    country,
    state,
    city,
    climateType,
    minRating,
    maxRating,
    tags,
    isPopular,
    isFeatured,
    page = 1,
    limit = 10,
    sort = { createdAt: -1 }
  } = filters;

  const query: any = { isActive: true };

  // Apply filters
  if (category) query.category = category;
  if (country) query.country = new RegExp(country, 'i');
  if (state) query.state = new RegExp(state, 'i');
  if (city) query.city = new RegExp(city, 'i');
  if (climateType) query['climate.type'] = climateType;
  if (minRating || maxRating) {
    query['rating.average'] = {};
    if (minRating) query['rating.average'].$gte = minRating;
    if (maxRating) query['rating.average'].$lte = maxRating;
  }
  if (tags && tags.length > 0) {
    query.tags = { $in: tags };
  }
  if (isPopular !== undefined) query.isPopular = isPopular;
  if (isFeatured !== undefined) query.isFeatured = isFeatured;

  const skip = (page - 1) * limit;
  const total = await Destination.countDocuments(query);
  const totalPages = Math.ceil(total / limit);

  const destinations = await Destination.find(query)
    .populate('createdBy', 'name email')
    .sort(sort)
    .skip(skip)
    .limit(limit);

  return {
    destinations,
    total,
    page,
    totalPages
  };
};

/**
 * Get destination statistics
 */
export const getDestinationStatistics = async () => {
  const totalDestinations = await getDestinationCount({ isActive: true });
  const featuredDestinations = await getDestinationCount({ isActive: true, isFeatured: true });
  const popularDestinations = await getDestinationCount({ isActive: true, isPopular: true });
  
  // Get category distribution
  const categories = ['adventure', 'cultural', 'religious', 'wildlife', 'beach', 'hill-station', 'heritage', 'urban', 'rural'];
  const categoryStats = await Promise.all(
    categories.map(async (category) => ({
      category,
      count: await getDestinationCount({ category, isActive: true })
    }))
  );

  // Get country distribution
  const countryStats = await Destination.aggregate([
    { $match: { isActive: true } },
    { $group: { _id: '$country', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 10 }
  ]);

  return {
    totalDestinations,
    featuredDestinations,
    popularDestinations,
    categoryDistribution: categoryStats,
    topCountries: countryStats
  };
};

/**
 * Get nearby destinations
 */
export const getNearbyDestinations = async (
  destinationId: string,
  maxDistance: number = 100
): Promise<IDestination[]> => {
  const destination = await Destination.findById(destinationId);
  if (!destination) return [];
  
  return await destination.getNearbyDestinations(maxDistance);
};

/**
 * Toggle featured status
 */
export const toggleFeaturedStatus = async (id: string, featured: boolean): Promise<IDestination | null> => {
  return await Destination.findByIdAndUpdate(
    id,
    { isFeatured: featured, updatedAt: new Date() },
    { new: true }
  );
};

/**
 * Toggle popular status
 */
export const togglePopularStatus = async (id: string, popular: boolean): Promise<IDestination | null> => {
  return await Destination.findByIdAndUpdate(
    id,
    { isPopular: popular, updatedAt: new Date() },
    { new: true }
  );
};
