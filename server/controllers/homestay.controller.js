import pool from "../server.js";
import {
  getHomestaysQuery,
  getHomestayDetailQuery,
  addHomestayQuery,
  updateHomestayQuery,
  getHostHomeStayQuery,
  deleteHomestayQuery,
  updateAvailabilityQuery,
} from "../models/homestay.model.js";
import asyncHandler from "../middleware/asyncHandler.js";

// @desc get homestays
// @route GET /api/homestays
// @access Public
const getHomestays = asyncHandler(async (req, res) => {
  const homestays = await pool.query(getHomestaysQuery);
  res.json(homestays.rows);
});

// @desc get homestay by Id
// @route GET /api/homestays/:id
// @access Public
const getHomestayById = asyncHandler(async (req, res) => {
  const homestay = await pool.query(getHomestayDetailQuery, [req.params.id]);
  res.json(homestay.rows[0]);
});

// @desc get host homestay
// @route GET /api/homestays/host/:id
// @access private/host
const getHostHomestay = asyncHandler(async (req, res) => {
  const homestay = await pool.query(getHostHomeStayQuery, [req.params.id]);
  res.json(homestay.rows[0]);
});

// @desc Create homestay
// @route POST /api/homestays
// @access Private/user
const createHomestay = asyncHandler(async (req, res) => {
  const {
    userId,
    serviceName,
    dzongkhag,
    gewog,
    latitude,
    longitude,
    facilities,
    rules,
    accomodation,
    checkIn,
    checkOut,
    description,
    rate,
    images,
  } = req.body;
  const homestay = await pool.query(addHomestayQuery, [
    userId,
    serviceName,
    dzongkhag,
    gewog,
    latitude,
    longitude,
    JSON.stringify(facilities),
    JSON.stringify(rules),
    accomodation,
    checkIn,
    checkOut,
    description,
    rate,
    JSON.stringify(images),
  ]);
  if (homestay) {
    res.json(homestay.rows[0]);
  } else {
    res.status(400);
    throw new Error("Invalid homestay data");
  }
});

// @desc update homestay
// @route PUT /api/homestays/:id
// @access Private/host
const updateHomestay = asyncHandler(async (req, res) => {
  const homestayId = req.params.id;
  const {
    title,
    images,
    facilities,
    checkIn,
    checkOut,
    rate,
    rules,
    accomodation,
    description,
  } = req.body;
  const updatedHomestay = await pool.query(updateHomestayQuery, [
    title,
    JSON.stringify(images),
    JSON.stringify(facilities),
    checkIn,
    checkOut,
    rate,
    JSON.stringify(rules),
    accomodation,
    description,
    homestayId,
  ]);
  if (updatedHomestay) {
    res.status(200).json({ message: "Homestay details updated successfully" });
  } else {
    res.status(400);
    throw new Error("Error updating homestay details");
  }
});

// @desc delete homestay
// @route PUT /api/homestays/:id
// @access Private/host
const deleteHomestay = asyncHandler(async (req, res) => {
  const homestayId = req.params.id;
  await pool.query(deleteHomestayQuery, [homestayId]);
  res.status(200).json({ message: "Homestay deleted successfully" });
});

// @desc update homestay availability
// @route PUT /api/homestays
// @access Private/host
const updateAvailability = asyncHandler(async (req, res) => {
  const { homestayId, isAvailable } = req.body;
  const updatedHomestay=await pool.query(updateAvailabilityQuery, [isAvailable, homestayId]);
  if(updatedHomestay){
    res.status(200).json({message: "Homestay availability updated successfully"});
  }else{
    res.status(400);
    throw new Error("Couldn't find homestay");
  }
});

export {
  getHomestays,
  getHomestayById,
  createHomestay,
  updateHomestay,
  getHostHomestay,
  deleteHomestay,
  updateAvailability
};
