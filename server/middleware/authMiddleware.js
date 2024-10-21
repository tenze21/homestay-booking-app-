import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import pool from '../server.js';
import { getUserByIdQuery } from '../models/user.model.js';

// Protected routes
const protect = asyncHandler(async(req, res,next)=>{
    let token;
    // Read the JWT from the cookie
    token=req.cookies.jwt;
    console.log(process.env.JWT_SECRET);
    

    if(token){
        try {
            const decoded= jwt.verify(token, process.env.JWT_SECRET);
            const user= await pool.query(getUserByIdQuery, [decoded.userId]);
            req.user= user.rows[0];
            next();
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }else{
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

// Admin middleware
const admin= (req, res, next)=>{
    if(req.user && req.user.isAdmin){
        next();
    }else{
        res.status(401);
        throw new Error('Not authorized as admin');
    }
};

export {protect, admin};