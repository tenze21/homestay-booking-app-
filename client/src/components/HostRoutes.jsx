import React from 'react'
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function HostRoutes() {
    const {userInfo}= useSelector((state)=>state.auth);

    return userInfo.isHost? <Outlet/> : <Navigate to='/' replace/>
}

export default HostRoutes;
