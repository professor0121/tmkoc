import { Request, Response, NextFunction } from 'express';
import { registerUser,loginUser ,getAllUsersServices} from '../services/auth.services';
import { cookieName, cookieOptions } from '../config/cookieConfig';
import { signToken } from '../utils/helper';


export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password, role } = req.body;
        // console.log("Registering user:", { name, email,password,role});
        const {newUser, token} = await registerUser(name, email, password, role);
        res.cookie(cookieName, token, cookieOptions);
        res.status(201).json({
            newUser,
            success: true,
            message: "User registered successfully"
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: "Error registering user",
            error: error.message
        });
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        console.log("Login request received:", { email, password });
        console.log("Logging in user:", { email });
        const {user, token} = await loginUser(email, password);
        if (!user) {
            throw new Error("Invalid credentials");
        }
        res.cookie(cookieName, token, cookieOptions);
        res.status(200).json({
            user,
            success: true,
            message: "User logged in successfully"
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: "Error logging in user",
            error: error.message
        });
    }
}

export const logout = (req: Request, res: Response) => {
    try {
        res.clearCookie(cookieName, cookieOptions);
        res.status(200).json({
            success: true,
            message: "User logged out successfully"
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: "Error logging out user",
            error: error.message
        });
    }
}

export const profile = (req: Request, res: Response, next: NextFunction): void => {
    try {
        res.status(200).json({
            success: true,
            message: "User profile",
            user: req.user
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: "Error fetching user profile",
            error: error.message
        });
    }
}

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await getAllUsersServices();
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: users
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: "Error fetching users",
            error: error.message
        });
    }
}