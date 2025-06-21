
import { Request, Response, NextFunction } from 'express';
import { cookieName } from '../config/cookieConfig';
import { verifyToken } from '../utils/helper';
import { findUserByEmail } from '../dao/user.dao';

export const checkRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token= req.cookies[cookieName];
        if (!token) {
            throw new Error("Not authenticated");
        }
        const decoded = await import('../utils/helper').then(m => m.verifyToken(token));
        if (!decoded || !decoded.email) {
            throw new Error("Not authenticated");
        }
        const user = await import('../dao/user.dao').then(m => m.findUserByEmail(decoded.email));
        if (!user) {
            throw new Error("Not authenticated");
        }
        if (user.role !== req.params.role) {
            throw new Error("Forbidden");
        }
        next();
    } catch (error: any) {
        res.status(403).json({
            success: false,
            message: "Forbidden",
            error: error.message
        });
    }
}