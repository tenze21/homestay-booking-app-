import express from "express";
const router = express.Router();
import {
  loginUser,
  registerUser,
  logoutUser,
} from "../controllers/user.controller.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/logout", protect, logoutUser);

export default router;
