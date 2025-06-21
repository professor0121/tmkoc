import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import authRoutes from "./routes/auth.routes";
import packageRoutes from "./routes/package.routes";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.get("/", (_req: Request, res: Response) => {
  res.json({
    message: "✅ TMKOC Backend API",
    status: "running",
    mongodb: "connected"
  });
});

// Test route to create a user
app.use("/api/auth", authRoutes);

// Package routes
app.use("/api/packages", packageRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
