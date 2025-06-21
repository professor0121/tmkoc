import { Request, Response, NextFunction } from 'express';
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

/**
 * Create a new package
 */
export const createNewPackage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const packageData = {
      ...req.body,
      createdBy: req.user?.id,
      updatedBy: req.user?.id
    };

    const newPackage = await createPackage(packageData);

    res.status(201).json({
      success: true,
      message: "Package created successfully",
      data: newPackage
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Error creating package",
      error: error.message
    });
  }
};

/**
 * Get package by ID
 */
export const getPackageById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const package_ = await findPackageById(id);

    if (!package_) {
      res.status(404).json({
        success: false,
        message: "Package not found"
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Package retrieved successfully",
      data: package_
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Error retrieving package",
      error: error.message
    });
  }
};

/**
 * Get all packages with optional filters
 */
export const getAllPackages = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const {
      page = 1,
      limit = 10,
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
      sort = 'createdAt'
    } = req.query;

    // Build filters
    const filters: any = { isActive: true };
    
    if (category) filters.category = category;
    if (destination) filters.destination = new RegExp(destination as string, 'i');
    if (difficulty) filters.difficulty = difficulty;
    
    if (minPrice || maxPrice) {
      filters['price.adult'] = {};
      if (minPrice) filters['price.adult'].$gte = Number(minPrice);
      if (maxPrice) filters['price.adult'].$lte = Number(maxPrice);
    }
    
    if (minDays || maxDays) {
      filters['duration.days'] = {};
      if (minDays) filters['duration.days'].$gte = Number(minDays);
      if (maxDays) filters['duration.days'].$lte = Number(maxDays);
    }
    
    if (features) {
      const featuresArray = Array.isArray(features) ? features : [features];
      filters.features = { $in: featuresArray };
    }
    
    if (tags) {
      const tagsArray = Array.isArray(tags) ? tags : [tags];
      filters.tags = { $in: tagsArray };
    }
    
    if (rating) {
      filters['rating.average'] = { $gte: Number(rating) };
    }

    // Build sort options
    const sortOptions: any = {};
    if (sort === 'price-low') sortOptions['price.adult'] = 1;
    else if (sort === 'price-high') sortOptions['price.adult'] = -1;
    else if (sort === 'rating') sortOptions['rating.average'] = -1;
    else if (sort === 'duration') sortOptions['duration.days'] = 1;
    else sortOptions.createdAt = -1;

    const options = {
      page: Number(page),
      limit: Number(limit),
      sort: sortOptions
    };

    const packages = await findPackages(filters, options);
    const total = await getPackageCount(filters);
    const totalPages = Math.ceil(total / Number(limit));

    res.status(200).json({
      success: true,
      message: "Packages retrieved successfully",
      data: {
        packages,
        pagination: {
          currentPage: Number(page),
          totalPages,
          totalItems: total,
          itemsPerPage: Number(limit)
        }
      }
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Error retrieving packages",
      error: error.message
    });
  }
};

/**
 * Get packages by category
 */
export const getPackagesByCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { category } = req.params;
    const packages = await findPackagesByCategory(category);

    res.status(200).json({
      success: true,
      message: `Packages in ${category} category retrieved successfully`,
      data: packages
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Error retrieving packages by category",
      error: error.message
    });
  }
};

/**
 * Get featured packages
 */
export const getFeaturedPackages = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const packages = await findFeaturedPackages();

    res.status(200).json({
      success: true,
      message: "Featured packages retrieved successfully",
      data: packages
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Error retrieving featured packages",
      error: error.message
    });
  }
};

/**
 * Search packages
 */
export const searchPackagesController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { q } = req.query;

    if (!q) {
      res.status(400).json({
        success: false,
        message: "Search query is required"
      });
      return;
    }

    const packages = await searchPackages(q as string);

    res.status(200).json({
      success: true,
      message: "Search results retrieved successfully",
      data: packages
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Error searching packages",
      error: error.message
    });
  }
};

/**
 * Update package
 */
export const updatePackage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = {
      ...req.body,
      updatedBy: req.user?.id
    };

    const updatedPackage = await updatePackageById(id, updateData);

    if (!updatedPackage) {
      res.status(404).json({
        success: false,
        message: "Package not found"
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Package updated successfully",
      data: updatedPackage
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Error updating package",
      error: error.message
    });
  }
};

/**
 * Delete package (soft delete)
 */
export const deletePackage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedPackage = await deletePackageById(id);

    if (!deletedPackage) {
      res.status(404).json({
        success: false,
        message: "Package not found"
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Package deleted successfully",
      data: deletedPackage
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Error deleting package",
      error: error.message
    });
  }
};

/**
 * Get popular packages
 */
export const getPopularPackagesController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { limit = 10 } = req.query;
    const packages = await getPopularPackages(Number(limit));

    res.status(200).json({
      success: true,
      message: "Popular packages retrieved successfully",
      data: packages
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Error retrieving popular packages",
      error: error.message
    });
  }
};

/**
 * Toggle featured status
 */
export const toggleFeaturedStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { featured } = req.body;

    const updatedPackage = featured 
      ? await addToFeatured(id)
      : await removeFromFeatured(id);

    if (!updatedPackage) {
      res.status(404).json({
        success: false,
        message: "Package not found"
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: `Package ${featured ? 'added to' : 'removed from'} featured successfully`,
      data: updatedPackage
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Error updating featured status",
      error: error.message
    });
  }
};
