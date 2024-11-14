import { apiSlice } from "./apiSlice.js";
import {
  RESERVATION_URL,
  PAYPAL_URL,
  CURRENCY_EXCHANGE_URL,
} from "../constants.js";

export const reservationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createReservation: builder.mutation({
      query: (data) => ({
        url: RESERVATION_URL,
        method: "POST",
        body: { ...data },
      }),
    }),
    insertPaymentDetails: builder.mutation({
      query: ({ reservationId, details }) => ({
        url: `${RESERVATION_URL}/${reservationId}/pay`,
        method: "POST",
        body: { ...details },
      }),
    }),
    getReservationDetails: builder.query({
      query: (reservationId) => ({
        url: `${RESERVATION_URL}/${reservationId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Reservation"],
    }),
    payReservation: builder.mutation({
      query: (reservationId) => ({
        url: `${RESERVATION_URL}/${reservationId}`,
        method: "PUT",
      }),
      invalidatesTags: ["Reservation"],
    }),
    getExchangeRate: builder.query({
      query: () => ({
        url: CURRENCY_EXCHANGE_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getPaypalClientId: builder.query({
      query: () => ({
        url: PAYPAL_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getHomestayReservation: builder.query({
      query: (homestayId) => ({
        url: `${RESERVATION_URL}/homestay/${homestayId}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Reservation"],
    }),
    updateReservationStatus: builder.mutation({
      query: ({homestayId, rId, data}) => ({
        url: `${RESERVATION_URL}/status/${rId._id}?homestayId=${homestayId._id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateReservationMutation,
  useInsertPaymentDetailsMutation,
  usePayReservationMutation,
  useGetExchangeRateQuery,
  useGetPaypalClientIdQuery,
  useGetReservationDetailsQuery,
  useGetHomestayReservationQuery,
  useUpdateReservationStatusMutation,
} = reservationApiSlice;
