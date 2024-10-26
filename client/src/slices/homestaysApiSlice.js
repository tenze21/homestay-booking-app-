import { HOMESTAYS_URL } from "../constants.js";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHomestays: builder.query({
      query: () => ({
        url: HOMESTAYS_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Homestay"],
    }),
    getHomestayDetails: builder.query({
      query: (homestayId) => ({
        url: `${HOMESTAYS_URL}/${homestayId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createHomestay: builder.mutation({
      query: (data) => ({
        url: HOMESTAYS_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Homestay"],
    }),
    uploadHomestayImage: builder.mutation({
      query: (data) => ({
        url: `/api/homestay/upload`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetHomestaysQuery,
  useGetHomestayDetailsQuery,
  useCreateHomestayMutation,
  useUploadHomestayImageMutation,
} = productsApiSlice;
