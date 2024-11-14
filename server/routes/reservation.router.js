import express from "express";
const router= express.Router();
import { createReservation, insertPaymentDetails, updateReservationToPaid, getReservationById, getHomestayReservations, updateReservationStatus  } from "../controllers/reservation.controller.js";
import { protect, admin, host } from "../middleware/authMiddleware.js";

router.route("/").post(protect, createReservation);
router.route("/:id/pay").post(protect, insertPaymentDetails);
router.route("/:id").put(protect, updateReservationToPaid).get(protect, getReservationById);
router.get("/homestay/:id", protect, host, getHomestayReservations);
router.put("/status/:id", protect, host, updateReservationStatus);

export default router;