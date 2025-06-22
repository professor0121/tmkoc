import { Router } from "express";
import {
  createNewDestination,
  getDestinationById,
  getAllDestinations,
  getDestinationsByCategory,
  getFeaturedDestinations,
  getPopularDestinations,
  searchDestinationsController,
  getDestinationsByLocation,
  getNearbyDestinationsController,
  updateDestination,
  deleteDestination,
  addReview,
  getDestinationStatisticsController,
  toggleFeaturedStatusController
} from "../controllers/destination.controller";
import { authMiddleware, checkRole } from "../middleware/auth.middleware";

const router = Router();

// Public routes (no authentication required)
/**
 * @route GET /api/destinations
 * @desc Get all destinations with optional filters
 * @access Public
 */
router.get("/", getAllDestinations);

/**
 * @route GET /api/destinations/search
 * @desc Search destinations by text
 * @access Public
 */
router.get("/search", searchDestinationsController);

/**
 * @route GET /api/destinations/featured
 * @desc Get featured destinations
 * @access Public
 */
router.get("/featured", getFeaturedDestinations);

/**
 * @route GET /api/destinations/popular
 * @desc Get popular destinations
 * @access Public
 */
router.get("/popular", getPopularDestinations);

/**
 * @route GET /api/destinations/statistics
 * @desc Get destination statistics
 * @access Public
 */
router.get("/statistics", getDestinationStatisticsController);

/**
 * @route GET /api/destinations/location
 * @desc Get destinations by location (country, state, city)
 * @access Public
 */
router.get("/location", getDestinationsByLocation);

/**
 * @route GET /api/destinations/category/:category
 * @desc Get destinations by category
 * @access Public
 */
router.get("/category/:category", getDestinationsByCategory);

/**
 * @route GET /api/destinations/:id/nearby
 * @desc Get nearby destinations
 * @access Public
 */
router.get("/:id/nearby", getNearbyDestinationsController);

/**
 * @route GET /api/destinations/:id
 * @desc Get destination by ID
 * @access Public
 */
router.get("/:id", getDestinationById);

// Protected routes (authentication required)
/**
 * @route POST /api/destinations
 * @desc Create a new destination
 * @access Private (Admin only)
 */
router.post("/", checkRole("admin"), createNewDestination);

/**
 * @route PUT /api/destinations/:id
 * @desc Update destination by ID
 * @access Private (Admin only)
 */
router.put("/:id", checkRole("admin"), updateDestination);

/**
 * @route DELETE /api/destinations/:id
 * @desc Delete destination by ID (soft delete)
 * @access Private (Admin only)
 */
router.delete("/:id", checkRole("admin"), deleteDestination);

/**
 * @route POST /api/destinations/:id/reviews
 * @desc Add a review to a destination
 * @access Private (Authenticated users)
 */
router.post("/:id/reviews", authMiddleware, addReview);

/**
 * @route PATCH /api/destinations/:id/featured
 * @desc Toggle featured status of a destination
 * @access Private (Admin only)
 */
router.patch("/:id/featured", checkRole("admin"), toggleFeaturedStatusController);

export default router;
