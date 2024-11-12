import express from "express";
const router = express.Router();
import {
  getHomestays,
  getHomestayById,
  createHomestay,
  updateHomestay,
  getHostHomestay,
  deleteHomestay,
} from "../controllers/homestay.controller.js";
import { user, host, protect } from "../middleware/authMiddleware.js";

router.route("/").get(getHomestays).post(protect, user, createHomestay);
router
  .route("/:id")
  .get(getHomestayById)
  .put(protect, host, updateHomestay)
  .delete(protect, host, deleteHomestay);
router.get("/host/:id", protect, host, getHostHomestay);

export default router;
