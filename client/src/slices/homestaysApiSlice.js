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
    getHostHomestay: builder.query({
      query: (hostId) => ({
        url: `${HOMESTAYS_URL}/host/${hostId}`,
      }),
    }),
    updateHomestayImage: builder.mutation({
      query: ({homestayId, data})=>({
        url: `/api/homestay/${homestayId._id}/updateImage`,
        method: "POST",
        body: data.formData
      })
    }),
    updateHomestay: builder.mutation({
      query: ({homestayId, data})=>({
        url: `${HOMESTAYS_URL}/${homestayId._id}`,
        method: "PUT",
        body: data
      })
    }),
    deleteHomestay: builder.mutation({
      query: (homestayId)=>({
        url: `${HOMESTAYS_URL}/${homestayId}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Homestay"],
    }),
    updateAvailability: builder.mutation({
      query: (data)=>({
        url: `${HOMESTAYS_URL}`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["Homestay"]
    }),
  }),
});

export const {
  useGetHomestaysQuery,
  useGetHomestayDetailsQuery,
  useCreateHomestayMutation,
  useUploadHomestayImageMutation,
  useGetHostHomestayQuery,
  useUpdateHomestayImageMutation,
  useUpdateHomestayMutation,
  useDeleteHomestayMutation,
  useUpdateAvailabilityMutation
} = productsApiSlice;
