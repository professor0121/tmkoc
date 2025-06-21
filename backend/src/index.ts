import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import User from "./models/User.js";
import authRoutes from "./routes/auth.routes";

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
app.post("/api/users", async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    const user = new User({
      name,
      email,
      password,
      role
    });

    const savedUser = await user.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role,
        createdAt: savedUser.createdAt
      }
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Error creating user",
      error: error.message
    });
  }
});

// Get all users
app.get("/api/users", async (_req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password');

    res.json({
      success: true,
      count: users.length,
      users
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
