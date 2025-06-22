import { Request, Response, NextFunction } from "express";
import { cookieName } from "../config/cookieConfig";
import { verifyToken } from "../utils/helper";
import { findUserByEmail } from "../dao/user.dao";
import { JwtPayload, User } from "../types/jwt.paylod";
import { IUser } from "../models/User";

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

/**
 * Basic authentication middleware
 * Verifies JWT token and attaches user to request
 */
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies?.[cookieName];
    console.log("auth tokne from teh cookie", token)
    if (!token) {
      res.status(401).json({
        success: false,
        message: "Access token required"
      });
      return;
    }

    const decoded = verifyToken(token) as JwtPayload;
    console.log("decoded token", decoded)
    if (!decoded?.email) {
      res.status(401).json({
        success: false,
        message: "Invalid token"
      });
      return;
    }

    const user = await findUserByEmail(decoded.email) as IUser;

    if (!user) {
      res.status(401).json({
        success: false,
        message: "User not found"
      });
      return;
    }

    // Attach user to request (excluding password)
    req.user = user;

    next();
  } catch (error: any) {
    console.log(error)
    res.status(401).json({
      success: false,
      message: "Invalid token",
      error: error.message
    });
  }
};

// /**
//  * Role-based access control middleware
//  * Requires authentication first, then checks user role
//  */
export const checkRole = (requiredRole: string) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const token = req.cookies?.[cookieName];
      console.log(token)
      if (!token) {
        res.status(401).json({
          success: false,
          message: "Access token required"
        });
        return;
      }

      const decoded = verifyToken(token) as JwtPayload;
      console.log(decoded)
      if (!decoded?.email) {
        res.status(401).json({
          success: false,
          message: "Invalid token"
        });
        return;
      }

      const user = await findUserByEmail(decoded.email) as IUser;

      if (!user) {
        res.status(401).json({
          success: false,
          message: "User not found"
        });
        return;
      }

      if (user.role !== requiredRole) {
        res.status(403).json({
          success: false,
          message: `Access denied. Required role: ${requiredRole}`
        });
        return;
      }

      // Attach user to request (excluding password)
      req.user = user;

      next();
    } catch (error: any) {
      res.status(401).json({
        success: false,
        message: "Authentication failed",
        error: error.message
      });
    }
  };
};

// /**
//  * Multiple roles access control middleware
//  * Allows access if user has any of the specified roles
//  */
export const checkRoles = (allowedRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const token = req.cookies?.[cookieName];

      if (!token) {
        res.status(401).json({
          success: false,
          message: "Access token required"
        });
        return;
      }

      const decoded = verifyToken(token) as JwtPayload;

      if (!decoded?.email) {
        res.status(401).json({
          success: false,
          message: "Invalid token"
        });
        return;
      }

      const user = await findUserByEmail(decoded.email) as IUser;

      if (!user) {
        res.status(401).json({
          success: false,
          message: "User not found"
        });
        return;
      }

      if (!allowedRoles.includes(user.role)) {
        res.status(403).json({
          success: false,
          message: `Access denied. Required roles: ${allowedRoles.join(", ")}`
        });
        return;
      }

      // Attach user to request (excluding password)
      req.user =user;

      next();
    } catch (error: any) {
      res.status(401).json({
        success: false,
        message: "Authentication failed",
        error: error.message
      });
    }
  };
};

// /**
//  * Optional authentication middleware
//  * Attaches user to request if token is valid, but doesn't require authentication
//  */
export const optionalAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies?.[cookieName];

    if (!token) {
      next();
      return;
    }

    const decoded = verifyToken(token) as JwtPayload;

    if (!decoded?.email) {
      next();
      return;
    }

    const user = await findUserByEmail(decoded.email) as IUser;

    if (user) {
      // Attach user to request (excluding password)
      req.user =user;
    }

    next();
  } catch (error) {
    // If token is invalid, just continue without user
    next();
  }
};