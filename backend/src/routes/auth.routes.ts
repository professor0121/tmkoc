import { Router } from "express";
import { register, login ,logout,profile,getAllUsers} from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", authMiddleware, profile)
router.get("/allusers",authMiddleware,getAllUsers)

export default router;
