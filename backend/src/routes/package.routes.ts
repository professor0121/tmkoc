import { Router } from "express";
import {
  createNewPackage,
  getPackageById,
  getAllPackages,
  getPackagesByCategory,
  getFeaturedPackages,
  searchPackagesController,
  updatePackage,
  deletePackage,
  getPopularPackagesController,
  toggleFeaturedStatus
} from "../controllers/package.controller";
import { authMiddleware, checkRole, checkRoles } from "../middleware/auth.middleware";

const router = Router();

// Public routes (no authentication required)
/**
 * @route GET /api/packages
 * @desc Get all packages with optional filters
 * @access Public
 */
router.get("/", getAllPackages);

/**
 * @route GET /api/packages/search
 * @desc Search packages by text
 * @access Public
 */
router.get("/search", searchPackagesController);

/**
 * @route GET /api/packages/featured
 * @desc Get featured packages
 * @access Public
 */
router.get("/featured", getFeaturedPackages);

/**
 * @route GET /api/packages/popular
 * @desc Get popular packages
 * @access Public
 */
router.get("/popular", getPopularPackagesController);

/**
 * @route GET /api/packages/category/:category
 * @desc Get packages by category
 * @access Public
 */
router.get("/category/:category", getPackagesByCategory);

/**
 * @route GET /api/packages/:id
 * @desc Get package by ID
 * @access Public
 */
router.get("/:id", getPackageById);

// Protected routes (authentication required)
/**
 * @route POST /api/packages
 * @desc Create a new package
 * @access Private (Admin only)
 */
router.post("/", checkRole("admin"), createNewPackage);

/**
 * @route PUT /api/packages/:id
 * @desc Update package by ID
 * @access Private (Admin only)
 */
router.put("/:id", checkRole("admin"), updatePackage);

/**
 * @route DELETE /api/packages/:id
 * @desc Delete package by ID (soft delete)
 * @access Private (Admin only)
 */
router.delete("/:id", checkRole("admin"), deletePackage);

/**
 * @route PATCH /api/packages/:id/featured
 * @desc Toggle featured status of a package
 * @access Private (Admin only)
 */
router.patch("/:id/featured", checkRole("admin"), toggleFeaturedStatus);

export default router;
