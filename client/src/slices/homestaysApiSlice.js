import { HOMESTAYS_URL } from "../constants.js";
import {apiSlice} from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getHomestays: builder.query({
            query: () => ({
                url: HOMESTAYS_URL
            }),
            keepUnusedDataFor: 5
        }),
        getHomestayDetails: builder.query({
            query: (homestayId) => ({
                url: `${HOMESTAYS_URL}/${homestayId}`,
            }),
            keepUnusedDataFor: 5
        }),
    }),
});

export const {useGetHomestaysQuery, useGetHomestayDetailsQuery} = productsApiSlice;