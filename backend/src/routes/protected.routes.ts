import { Router, Request, Response } from "express";
import { authMiddleware, checkRole, checkRoles, optionalAuth } from "../middleware/auth.middleware";

const router = Router();

/**
 * Example protected route - requires authentication
 */
router.get("/profile", authMiddleware, (req: Request, res: Response): void => {
  res.json({
    success: true,
    message: "Protected profile data",
    user: req.user
  });
});

/**
 * Example admin-only route - requires admin role
 */
router.get("/admin", checkRole("admin"), (req: Request, res: Response): void => {
  res.json({
    success: true,
    message: "Admin-only data",
    user: req.user
  });
});

/**
 * Example route for multiple roles - requires admin or moderator role
 */
router.get("/moderator", checkRoles(["admin", "moderator"]), (req: Request, res: Response): void => {
  res.json({
    success: true,
    message: "Moderator or admin data",
    user: req.user
  });
});

/**
 * Example public route with optional authentication
 * Shows different content based on whether user is logged in
 */
router.get("/public", optionalAuth, (req: Request, res: Response): void => {
  if (req.user) {
    res.json({
      success: true,
      message: "Public content for authenticated user",
      user: req.user,
      personalizedContent: "Welcome back!"
    });
  } else {
    res.json({
      success: true,
      message: "Public content for anonymous user",
      generalContent: "Please log in for personalized experience"
    });
  }
});

/**
 * Example user-only route - requires user role
 */
router.get("/user-dashboard", checkRole("user"), (req: Request, res: Response): void => {
  res.json({
    success: true,
    message: "User dashboard data",
    user: req.user
  });
});

export default router;
