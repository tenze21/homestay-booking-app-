import express from "express";
const router= express.Router();
import { createReservation, insertPaymentDetails, updateReservationToPaid, getReservationById } from "../controllers/reservation.controller.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, createReservation);
router.route("/:id/pay").post(protect, insertPaymentDetails);
router.route("/:id").put(protect, updateReservationToPaid).get(protect, getReservationById);

export default router;