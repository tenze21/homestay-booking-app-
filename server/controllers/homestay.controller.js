import pool from "../server.js";
import { getHomestaysQuery, getHomestayDetailQuery } from "../models/homestay.model.js";
import asyncHandler from '../middleware/asyncHandler.js';

// @desc get homestays
// @route GET /api/homestays
// @access Public
const getHomestays =asyncHandler(async (req, res) => {
    const homestays= await pool.query(getHomestaysQuery);
    res.json(homestays.rows);
});

// @desc get homestay by Id
// @route GET /api/homestays/:id
// @access Public
const getHomestayById =asyncHandler(async (req, res) => {
    const homestay= await pool.query(getHomestayDetailQuery, [req.params.id]);
    res.json(homestay.rows[0]);
});

export {getHomestays, getHomestayById};