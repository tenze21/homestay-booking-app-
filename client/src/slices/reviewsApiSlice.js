import { REVIEWS_URL } from "../constants.js";
import { apiSlice } from "./apiSlice.js";

export const reviewsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: ({ homestayId, data }) => ({
        url: `${REVIEWS_URL}/?homestayId=${homestayId._id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Review"],
    }),
    getReviews: builder.query({
      query: (homestayId) => ({
        url: `${REVIEWS_URL}/${homestayId}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useCreateReviewMutation, useGetReviewsQuery } = reviewsApiSlice;
