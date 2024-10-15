import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants.JS";

const baseQuery= fetchBaseQuery({baseUrl: BASE_URL});

export const apiSlice= createApi({
    baseQuery,
    tagTypes: ['Homestay', 'Reservation', 'User'],
    endpoints: (builder)=>({}),
});