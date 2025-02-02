import express from "express";
const router = express.Router();
import {
  loginUser,
  registerUser,
  logoutUser,
  createHost,
  updateUserRole,
  getUserDetails,
  updateUserDetails,
  updateHostDetails,
  updateUserPassword,
  getUserReservations,
  deleteHost
} from "../controllers/user.controller.js";
import { protect, admin, host } from "../middleware/authMiddleware.js";

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/logout", protect, logoutUser);
router.route('/host').post(protect, createHost);
router.route('/:id').put(protect, updateUserRole).get(protect, getUserDetails);
router.route('/update/:id').put(protect, updateUserDetails);
router.route('/host/:id').put(protect, host, updateHostDetails).delete(protect, host, deleteHost);
router.route('/:id/updatepassword').put(protect, updateUserPassword);
router.get('/:id/reservations', protect, getUserReservations);

export default router;
