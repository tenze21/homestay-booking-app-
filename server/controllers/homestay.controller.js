import pool from "../server.js";
import { getHomestaysQuery, getHomestayDetailQuery, addHomestayQuery } from "../models/homestay.model.js";
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

// @desc Create homestay 
// @route POST /api/homestays
// @access Private/user
const createHomestay= asyncHandler(async (req, res)=>{
    const {userId, serviceName, dzongkhag, gewog, latitude, longitude, facilities, rules, accomodation, checkIn, checkOut, description, rate, images}= req.body;
    const homestay= await pool.query(addHomestayQuery, [userId, serviceName, dzongkhag, gewog, latitude, longitude, JSON.stringify(facilities), JSON.stringify(rules), accomodation, checkIn, checkOut, description, rate, JSON.stringify(images)]);
    if(homestay){
        res.json(homestay.rows[0]);
    }else{
        res.status(400);
        throw new Error("Invalid homestay data");
    }
});

export {getHomestays, getHomestayById, createHomestay};