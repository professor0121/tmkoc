import {
  createDestination,
  findDestinationById,
  findDestinations,
  findDestinationsByCategory,
  findFeaturedDestinations,
  findPopularDestinations,
  searchDestinations,
  findDestinationsByLocation,
  findDestinationsByClimate,
  findDestinationsInBounds,
  findDestinationsByRating,
  updateDestinationById,
  deleteDestinationById,
  getDestinationCount,
  addDestinationReview,
  getDestinationsWithFilters,
  getDestinationStatistics,
  getNearbyDestinations,
  toggleFeaturedStatus,
  togglePopularStatus
} from '../dao/destination.dao';
import { IDestination } from '../models/Destination';

/**
 * Destination Service - Business logic layer for destination operations
 */

/**
 * Create a new destination with validation
 */
export const createDestinationService = async (destinationData: Partial<IDestination>, userId: string): Promise<IDestination> => {
  // Validate required fields
  if (!destinationData.name || !destinationData.description || !destinationData.country) {
    throw new Error('Name, description, and country are required');
  }

  // Validate coordinates
  if (!destinationData.coordinates?.latitude || !destinationData.coordinates?.longitude) {
    throw new Error('Valid coordinates (latitude and longitude) are required');
  }

  // Validate temperature range
  if (destinationData.climate?.averageTemperature) {
    const { min, max } = destinationData.climate.averageTemperature;
    if (min >= max) {
      throw new Error('Minimum temperature must be less than maximum temperature');
    }
  }

  // Set default values
  const destinationToCreate = {
    ...destinationData,
    createdBy: userId,
    updatedBy: userId,
    isActive: true,
    isFeatured: false,
    isPopular: false,
    popularityScore: 0,
    rating: {
      average: 0,
      totalReviews: 0,
      breakdown: {
        attractions: 0,
        accommodation: 0,
        food: 0,
        transportation: 0,
        value: 0
      }
    }
  };

  return await createDestination(destinationToCreate);
};

/**
 * Get destination by ID with additional business logic
 */
export const getDestinationByIdService = async (id: string): Promise<IDestination | null> => {
  const destination = await findDestinationById(id);
  
  if (!destination) {
    throw new Error('Destination not found');
  }

  // Check if destination is active
  if (!destination.isActive) {
    throw new Error('Destination is not available');
  }

  return destination;
};

/**
 * Update destination with validation
 */
export const updateDestinationService = async (
  id: string,
  updateData: Partial<IDestination>,
  userId: string
): Promise<IDestination | null> => {
  const existingDestination = await findDestinationById(id);
  
  if (!existingDestination) {
    throw new Error('Destination not found');
  }

  // Validate temperature range if being updated
  if (updateData.climate?.averageTemperature) {
    const { min, max } = updateData.climate.averageTemperature;
    if (min >= max) {
      throw new Error('Minimum temperature must be less than maximum temperature');
    }
  }

  // Validate coordinates if being updated
  if (updateData.coordinates) {
    const { latitude, longitude } = updateData.coordinates;
    if (latitude < -90 || latitude > 90) {
      throw new Error('Latitude must be between -90 and 90');
    }
    if (longitude < -180 || longitude > 180) {
      throw new Error('Longitude must be between -180 and 180');
    }
  }

  const dataToUpdate = {
    ...updateData,
    updatedBy: userId
  };

  return await updateDestinationById(id, dataToUpdate);
};

/**
 * Get destinations with advanced filtering and business logic
 */
export const getDestinationsWithFiltersService = async (filters: any) => {
  // Apply business rules
  const businessFilters = {
    ...filters,
    isActive: true // Only show active destinations
  };

  // If no sort specified, default to featured first, then by rating
  if (!filters.sort) {
    businessFilters.sort = { isFeatured: -1, 'rating.average': -1, popularityScore: -1 };
  }

  return await getDestinationsWithFilters(businessFilters);
};

/**
 * Search destinations with enhanced logic
 */
export const searchDestinationsService = async (searchText: string, filters: any = {}) => {
  if (!searchText || searchText.trim().length < 2) {
    throw new Error('Search text must be at least 2 characters long');
  }

  // Combine text search with filters
  const searchFilters = {
    ...filters,
    isActive: true
  };

  // First try text search
  let destinations = await searchDestinations(searchText);

  // If no results from text search, try partial matching
  if (destinations.length === 0) {
    destinations = await findDestinations({
      ...searchFilters,
      $or: [
        { name: new RegExp(searchText, 'i') },
        { city: new RegExp(searchText, 'i') },
        { state: new RegExp(searchText, 'i') },
        { country: new RegExp(searchText, 'i') },
        { tags: new RegExp(searchText, 'i') }
      ]
    });
  }

  return destinations;
};

/**
 * Get destination recommendations based on user preferences
 */
export const getDestinationRecommendations = async (
  userPreferences: {
    category?: string;
    climateType?: string;
    country?: string;
    minRating?: number;
    tags?: string[];
  },
  limit: number = 5
): Promise<IDestination[]> => {
  const filters: any = { isActive: true };

  // Build recommendation filters
  if (userPreferences.category) {
    filters.category = userPreferences.category;
  }

  if (userPreferences.climateType) {
    filters['climate.type'] = userPreferences.climateType;
  }

  if (userPreferences.country) {
    filters.country = new RegExp(userPreferences.country, 'i');
  }

  if (userPreferences.minRating) {
    filters['rating.average'] = { $gte: userPreferences.minRating };
  }

  if (userPreferences.tags && userPreferences.tags.length > 0) {
    filters.tags = { $in: userPreferences.tags };
  }

  const options = {
    limit,
    sort: { 'rating.average': -1, popularityScore: -1, isFeatured: -1 }
  };

  return await findDestinations(filters, options);
};

/**
 * Add review with business logic
 */
export const addDestinationReviewService = async (
  destinationId: string,
  userId: string,
  rating: number,
  comment: string
): Promise<IDestination | null> => {
  // Validate rating
  if (rating < 1 || rating > 5) {
    throw new Error('Rating must be between 1 and 5');
  }

  // Validate comment
  if (!comment || comment.trim().length < 10) {
    throw new Error('Comment must be at least 10 characters long');
  }

  if (comment.length > 1000) {
    throw new Error('Comment cannot be more than 1000 characters');
  }

  const destination = await findDestinationById(destinationId);
  if (!destination) {
    throw new Error('Destination not found');
  }

  // Check if user has already reviewed this destination
  const existingReview = destination.reviews.find(
    review => review.user.toString() === userId
  );

  if (existingReview) {
    throw new Error('You have already reviewed this destination');
  }

  return await addDestinationReview(destinationId, userId, rating, comment.trim());
};

/**
 * Get trending destinations based on recent activity
 */
export const getTrendingDestinations = async (limit: number = 10): Promise<IDestination[]> => {
  // Get destinations with high recent activity (reviews, ratings)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const destinations = await findDestinations(
    {
      isActive: true,
      'reviews.date': { $gte: thirtyDaysAgo }
    },
    {
      limit,
      sort: { popularityScore: -1, 'rating.average': -1 }
    }
  );

  return destinations;
};

/**
 * Get destinations by weather preference
 */
export const getDestinationsByWeather = async (
  weatherPreference: 'hot' | 'moderate' | 'cold',
  month?: string
): Promise<IDestination[]> => {
  const filters: any = { isActive: true };

  // Filter by temperature preference
  switch (weatherPreference) {
    case 'hot':
      filters['climate.averageTemperature.max'] = { $gte: 30 };
      break;
    case 'moderate':
      filters['climate.averageTemperature.max'] = { $gte: 20, $lte: 30 };
      break;
    case 'cold':
      filters['climate.averageTemperature.max'] = { $lte: 20 };
      break;
  }

  // Filter by best visit month if provided
  if (month) {
    filters['climate.bestVisitMonths'] = month;
  }

  return await findDestinations(filters);
};

/**
 * Get destination insights and analytics
 */
export const getDestinationInsights = async (destinationId: string) => {
  const destination = await findDestinationById(destinationId);
  if (!destination) {
    throw new Error('Destination not found');
  }

  // Get nearby destinations
  const nearbyDestinations = await getNearbyDestinations(destinationId, 50);

  // Calculate review sentiment (simplified)
  const recentReviews = destination.reviews
    .filter(review => {
      const reviewDate = new Date(review.date);
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      return reviewDate >= sixMonthsAgo;
    })
    .slice(0, 10);

  const averageRecentRating = recentReviews.length > 0
    ? recentReviews.reduce((sum, review) => sum + review.rating, 0) / recentReviews.length
    : 0;

  // Get category comparison
  const categoryDestinations = await findDestinationsByCategory(destination.category);
  const categoryAverageRating = categoryDestinations.length > 0
    ? categoryDestinations.reduce((sum, dest) => sum + dest.rating.average, 0) / categoryDestinations.length
    : 0;

  return {
    destination,
    nearbyDestinations: nearbyDestinations.slice(0, 5),
    insights: {
      recentRating: Number(averageRecentRating.toFixed(1)),
      categoryAverageRating: Number(categoryAverageRating.toFixed(1)),
      isAboveAverage: destination.rating.average > categoryAverageRating,
      totalNearbyDestinations: nearbyDestinations.length,
      recentReviewsCount: recentReviews.length
    }
  };
};

/**
 * Get destination statistics with business insights
 */
export const getDestinationStatisticsService = async () => {
  const baseStats = await getDestinationStatistics();
  
  // Add business insights
  const trendingDestinations = await getTrendingDestinations(5);
  const topRatedDestinations = await findDestinations(
    { isActive: true, 'rating.totalReviews': { $gte: 5 } },
    { limit: 5, sort: { 'rating.average': -1 } }
  );

  return {
    ...baseStats,
    trending: trendingDestinations,
    topRated: topRatedDestinations
  };
};
