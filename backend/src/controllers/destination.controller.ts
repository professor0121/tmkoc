import { Request, Response, NextFunction } from 'express';
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

/**
 * Create a new destination
 */
export const createNewDestination = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const destinationData = {
      ...req.body,
      createdBy: req.user?.id,
      updatedBy: req.user?.id
    };

    const newDestination = await createDestination(destinationData);

    res.status(201).json({
      success: true,
      message: "Destination created successfully",
      data: newDestination
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Error creating destination",
      error: error.message
    });
  }
};

/**
 * Get destination by ID
 */
export const getDestinationById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const destination = await findDestinationById(id);

    if (!destination) {
      res.status(404).json({
        success: false,
        message: "Destination not found"
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Destination retrieved successfully",
      data: destination
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Error retrieving destination",
      error: error.message
    });
  }
};

/**
 * Get all destinations with optional filters
 */
export const getAllDestinations = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const {
      page = 1,
      limit = 10,
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
      sort = 'createdAt'
    } = req.query;

    // Build sort options
    const sortOptions: any = {};
    if (sort === 'rating') sortOptions['rating.average'] = -1;
    else if (sort === 'popularity') sortOptions.popularityScore = -1;
    else if (sort === 'name') sortOptions.name = 1;
    else sortOptions.createdAt = -1;

    const filters = {
      category: category as string,
      country: country as string,
      state: state as string,
      city: city as string,
      climateType: climateType as string,
      minRating: minRating ? Number(minRating) : undefined,
      maxRating: maxRating ? Number(maxRating) : undefined,
      tags: tags ? (Array.isArray(tags) ? tags as string[] : [tags as string]) : undefined,
      isPopular: isPopular ? isPopular === 'true' : undefined,
      isFeatured: isFeatured ? isFeatured === 'true' : undefined,
      page: Number(page),
      limit: Number(limit),
      sort: sortOptions
    };

    const result = await getDestinationsWithFilters(filters);

    res.status(200).json({
      success: true,
      message: "Destinations retrieved successfully",
      data: {
        destinations: result.destinations,
        pagination: {
          currentPage: result.page,
          totalPages: result.totalPages,
          totalItems: result.total,
          itemsPerPage: Number(limit)
        }
      }
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Error retrieving destinations",
      error: error.message
    });
  }
};

/**
 * Get destinations by category
 */
export const getDestinationsByCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { category } = req.params;
    const destinations = await findDestinationsByCategory(category);

    res.status(200).json({
      success: true,
      message: `Destinations in ${category} category retrieved successfully`,
      data: destinations
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Error retrieving destinations by category",
      error: error.message
    });
  }
};

/**
 * Get featured destinations
 */
export const getFeaturedDestinations = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const destinations = await findFeaturedDestinations();

    res.status(200).json({
      success: true,
      message: "Featured destinations retrieved successfully",
      data: destinations
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Error retrieving featured destinations",
      error: error.message
    });
  }
};

/**
 * Get popular destinations
 */
export const getPopularDestinations = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const destinations = await findPopularDestinations();

    res.status(200).json({
      success: true,
      message: "Popular destinations retrieved successfully",
      data: destinations
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Error retrieving popular destinations",
      error: error.message
    });
  }
};

/**
 * Search destinations
 */
export const searchDestinationsController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { q } = req.query;

    if (!q) {
      res.status(400).json({
        success: false,
        message: "Search query is required"
      });
      return;
    }

    const destinations = await searchDestinations(q as string);

    res.status(200).json({
      success: true,
      message: "Search results retrieved successfully",
      data: destinations
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Error searching destinations",
      error: error.message
    });
  }
};

/**
 * Get destinations by location
 */
export const getDestinationsByLocation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { country, state, city } = req.query;
    const destinations = await findDestinationsByLocation(
      country as string,
      state as string,
      city as string
    );

    res.status(200).json({
      success: true,
      message: "Destinations by location retrieved successfully",
      data: destinations
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Error retrieving destinations by location",
      error: error.message
    });
  }
};

/**
 * Get nearby destinations
 */
export const getNearbyDestinationsController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { maxDistance = 100 } = req.query;
    
    const destinations = await getNearbyDestinations(id, Number(maxDistance));

    res.status(200).json({
      success: true,
      message: "Nearby destinations retrieved successfully",
      data: destinations
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Error retrieving nearby destinations",
      error: error.message
    });
  }
};

/**
 * Update destination
 */
export const updateDestination = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = {
      ...req.body,
      updatedBy: req.user?.id
    };

    const updatedDestination = await updateDestinationById(id, updateData);

    if (!updatedDestination) {
      res.status(404).json({
        success: false,
        message: "Destination not found"
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Destination updated successfully",
      data: updatedDestination
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Error updating destination",
      error: error.message
    });
  }
};

/**
 * Delete destination (soft delete)
 */
export const deleteDestination = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedDestination = await deleteDestinationById(id);

    if (!deletedDestination) {
      res.status(404).json({
        success: false,
        message: "Destination not found"
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Destination deleted successfully",
      data: deletedDestination
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Error deleting destination",
      error: error.message
    });
  }
};

/**
 * Add review to destination
 */
export const addReview = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Authentication required"
      });
      return;
    }

    const updatedDestination = await addDestinationReview(id, userId, rating, comment);

    if (!updatedDestination) {
      res.status(404).json({
        success: false,
        message: "Destination not found"
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Review added successfully",
      data: updatedDestination
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Error adding review",
      error: error.message
    });
  }
};

/**
 * Get destination statistics
 */
export const getDestinationStatisticsController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const statistics = await getDestinationStatistics();

    res.status(200).json({
      success: true,
      message: "Destination statistics retrieved successfully",
      data: statistics
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Error retrieving destination statistics",
      error: error.message
    });
  }
};

/**
 * Toggle featured status
 */
export const toggleFeaturedStatusController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { featured } = req.body;

    const updatedDestination = await toggleFeaturedStatus(id, featured);

    if (!updatedDestination) {
      res.status(404).json({
        success: false,
        message: "Destination not found"
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: `Destination ${featured ? 'added to' : 'removed from'} featured successfully`,
      data: updatedDestination
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Error updating featured status",
      error: error.message
    });
  }
};
