import express from 'express';
const router=express.Router();
import { createReview, getReviews } from '../controllers/review.controller.js';
import { protect } from '../middleware/authMiddleware.js';
import { updateRatingAndReview } from '../controllers/homestay.controller.js';

router.post("/", protect, createReview, updateRatingAndReview);
router.get("/:id", getReviews);

export default router;