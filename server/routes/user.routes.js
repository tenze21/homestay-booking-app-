import express from "express";
const router = express.Router();
import {
  loginUser,
  registerUser,
  logoutUser,
  createHost,
  updateUserRole,
} from "../controllers/user.controller.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/logout", protect, logoutUser);
router.route('/host').post(protect, createHost);
router.route('/:id').put(protect, updateUserRole);

export default router;
