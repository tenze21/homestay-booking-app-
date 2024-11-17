import pool from "../server.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { createReviewQuery, getReviewsQuery } from "../models/review.model.js";

// @desc create review
// @route POST /api/reviews/?homestayId=
// @access Private
const createReview=asyncHandler(async (req, res, next)=>{
    const userId=req.user.user_id;
    const homestayId=req.query.homestayId;
    const {review, rating}= req.body;
    const newReview= await pool.query(createReviewQuery, [userId, homestayId, review, rating]);

    if(newReview.rows.length>0){
        next();
    }else{
        res.status(400);
        throw new Error("There was an error adding review, please try again.");
    }
});

// @desc get review
// @route GET /api/reviews/:id
// @access Public
const getReviews= asyncHandler(async (req, res)=>{
    const homestayId=req.params.id;
    const reviews= await pool.query(getReviewsQuery, [homestayId]);
    res.json(reviews.rows);
});

export {createReview, getReviews}