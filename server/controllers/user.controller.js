import asyncHandler from "../middleware/asyncHandler.js";
import bcrypt from "bcryptjs";
import {
  getUserByEmailQuery,
  createUserQuery,
  createHostQuery,
  updateUserRoleQuery,
  getUserDetailsQuery,
  updateUserDetailQuery,
  updateHostDetailQuery,
  getUserPasswordQuery,
  updatePasswordQuery,
  getUserReservationsQuery,
  deleteHostQuery
} from "../models/user.model.js";
import pool from "../server.js";
import generateToken from "../utils/generateToken.js";
import matchPassword from "../utils/matchPassword.js";

// @desc Authorize user and get token
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  // console.log(req.body);

  const { email, password } = req.body;
  const user = await pool.query(getUserByEmailQuery, [email]);
  if (user.rows.length === 0) {
    res.status(401);
    throw new Error(
      "The system couldn't find any user associated with this email"
    );
  }
  if (user && (await matchPassword(password, user.rows[0].password))) {
    generateToken(res, user.rows[0].user_id);

    res.status(200).json({
      _id: user.rows[0].user_id,
      fullName: user.rows[0].full_name,
      email: user.rows[0].email,
      contactNumber: user.rows[0].contact_number,
      profile: user.rows[0].profile,
      country: user.rows[0].country,
      region: user.rows[0].region,
      isHost: user.rows[0].ishost,
    });
  } else {
    res.status(402);
    throw new Error("Invalid email or password");
  }
});

// @desc Register user
// @route POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    contactNumber,
    gender,
    userCountry,
    userState,
    password,
  } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const userExist = await pool.query(getUserByEmailQuery, [email]);
  if (userExist.rows.length > 0) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await pool.query(createUserQuery, [
    name,
    email,
    contactNumber,
    gender,
    userCountry,
    userState,
    hashedPassword,
  ]);

  if (user) {
    generateToken(res, user.rows[0].user_id);
    res.status(201).json({
      _id: user.rows[0].user_id,
      fullName: user.rows[0].full_name,
      email: user.rows[0].email,
      contactNumber: user.rows[0].contact_number,
      profile: user.rows[0].profile,
      country: user.rows[0].country,
      region: user.rows[0].region,
      isHost: user.rows[0].ishost,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Logout user/clear cookie
// @route POST /api/users/logout
// @access Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

// @desc create Host
// @route POST /api/users/host
// @access Private
const createHost = asyncHandler(async (req, res) => {
  const {
    userId,
    education,
    spokenLanguages,
    profession,
    dateOfBirth,
    accountNumber,
    accountHolderName,
    bankName,
    bio,
  } = req.body;
  const host = await pool.query(createHostQuery, [
    userId,
    education,
    JSON.stringify(spokenLanguages),
    profession,
    dateOfBirth,
    accountNumber,
    accountHolderName,
    bankName,
    bio,
  ]);
  if (host) {
    res.status(201).json({ message: "Details successfully added" });
  } else {
    res.status(400);
    throw new Error("Invalid host data");
  }
});

// @desc update user role
// @route PUT /api/users/host
// @access Private
const updateUserRole = asyncHandler(async (req, res) => {
  const { userId, isHost } = req.body;
  const updatedUser = await pool.query(updateUserRoleQuery, [isHost, userId]);
  if (updatedUser) {
    res.status(200).json({ message: "User role updated successfully" });
  } else {
    res.status(400);
    throw new Error("Error updating user role");
  }
});

// @desc Get user details
// @route GET /api/user/:id
// @access Private
const getUserDetails = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await pool.query(getUserDetailsQuery, [userId]);
  if (user && user.rows.length > 0) {
    res.status(200).json(user.rows[0]);
  } else {
    res.status(400);
    throw new Error("Error getting user details");
  }
});

// @desc Update user details
// @route PUT /api/user/:id
// @access Private
const updateUserDetails = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const { fullName, profile, email, contactNumber, gender, country, region } =
    req.body;
  const updatedUser = await pool.query(updateUserDetailQuery, [
    fullName,
    profile,
    email,
    contactNumber,
    gender,
    country,
    region,
    userId,
  ]);
  if (updatedUser) {
    res
      .status(200)
      .json({
        fullName: updatedUser.rows[0].full_name,
        profile: updatedUser.rows[0].profile,
        email: updatedUser.rows[0].email,
        contactNumber: updatedUser.rows[0].contact_number,
        country: updatedUser.rows[0].country,
        region: updatedUser.rows[0].region,
      });
  } else {
    res.status(400);
    throw new Error("Error updating user details");
  }
});

// @desc Update host details
// @route PUT /api/host/:id
// @access Private
const updateHostDetails = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const {
    education,
    spokenLanguages,
    profession,
    dateOfBirth,
    accountNumber,
    accountHolderName,
    bankName,
    bio,
  } = req.body;
  const updatedHost = await pool.query(updateHostDetailQuery, [
    education,
    JSON.stringify(spokenLanguages),
    profession,
    dateOfBirth,
    accountNumber,
    accountHolderName,
    bankName,
    bio,
    userId,
  ]);
  if (updatedHost) {
    res.status(200).json({ message: "Host details updated successfully" });
  } else {
    res.status(400);
    throw new Error("Error updating host details");
  }
});

// @desc Update password
// @route PUT /api/users/:id/updatepassword
// @access Private
const updateUserPassword = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const { currentPassword, newPassword } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPasswordnew = await bcrypt.hash(newPassword, salt);
  const pass = await pool.query(getUserPasswordQuery, [userId]);
  const isMatch = await matchPassword(currentPassword, pass.rows[0].password);

  if (!isMatch) {
    throw new Error("Wrong password");
  }
  const updatedPassword = await pool.query(updatePasswordQuery, [
    hashedPasswordnew,
    userId,
  ]);
  if (updatedPassword) {
    res.status(200).json({ message: "Password updated successfully" });
  } else {
    res.status(400);
    throw new Error("Error updating password");
  }
});

// @desc GET user reservations
// @route GET /api/users/:id/reservations
// @access Private
const getUserReservations= asyncHandler(async (req, res)=>{
  const userId = req.params.id;
  const reservations= await pool.query(getUserReservationsQuery, [userId]);
  res.json(reservations.rows);
});

// @desc delete host
// @route DELETE /api/host/:id
// @access Private/host
const deleteHost= asyncHandler(async (req, res)=>{
  const hostId= req.params.id;
  
  if(Number(hostId) !== req.user.user_id){
    throw new Error('Unauthorized');
  }
  await pool.query(deleteHostQuery, [hostId]);
  res.status(200).json({message: 'Host deleted successfully'});
});

export {
  loginUser,
  registerUser,
  logoutUser,
  createHost,
  updateUserRole,
  getUserDetails,
  updateUserDetails,
  updateHostDetails,
  updateUserPassword,
  getUserReservations,
  deleteHost
};
