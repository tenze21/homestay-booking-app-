import express from "express";
const router = express.Router();
import { getHomestays, getHomestayById, createHomestay } from "../controllers/homestay.controller.js";
import { user } from "../middleware/authMiddleware.js";

router.route("/").get(getHomestays).post(user, createHomestay);
router.route("/:id").get(getHomestayById);


export default router;