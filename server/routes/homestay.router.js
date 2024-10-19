import express from "express";
const router = express.Router();
import { getHomestays, getHomestayById } from "../controllers/homestay.controller.js";

router.route("/").get(getHomestays);
router.route("/:id").get(getHomestayById);

export default router;