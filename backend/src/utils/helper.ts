import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { JwtPayload } from "../types/jwt.paylod";

config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export const signToken = (payload: Partial<JwtPayload>): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};

