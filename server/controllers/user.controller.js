import asyncHandler from '../middleware/asyncHandler.js';
import { getUserByEmailQuery, createUserQuery } from '../models/user.model.js';
import pool from "../server.js";
import generateToken from '../utils/generateToken.js';
import matchPassword from '../utils/matchPassword.js';

// @desc Authorize user and get token
// @route POST /api/users/login
// @access Public
const loginUser= asyncHandler(async(req,res)=>{
    const {email, password}= req.body;
    const user= await pool.query(getUserByEmailQuery, [email]);
    if(user && (await matchPassword(password, user.rows[0].password))){
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
    }else{
        res.status(402);
        throw new Error("Invalid email or password");
    }
});

// @desc Register user
// @route POST /api/users/register
// @access Public
const registerUser= asyncHandler(async(req, res)=>{
    const {name, email, contactNumber, gender, userCountry, userState, password}= req.body;

    const userExist= await pool.query(getUserByEmailQuery, [email]);
    if(userExist.rows.length > 0){
        res.status(400);
        throw new Error("User already exists");
    };
    const user= await pool.query(createUserQuery, [name, email, contactNumber, gender, userCountry, userState, password]);

    if(user){
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
    }else{
        res.status(400);
        throw new Error("Invalid user data");
    }
});

// @desc Logout user/clear cookie
// @route POST /api/users/logout
// @access Private
const logoutUser=asyncHandler(async(req, res)=>{
    res.cookie('jwt', '',{
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({message: 'Logged out successfully'});
})
export {loginUser, registerUser, logoutUser};