import { USER_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
      }),
    }),
    createHost: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/host`,
        method: "POST",
        body: data,
      }),
    }),
    updateUserRole: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/${data.userId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    getUserDetails: builder.query({
      query: (userId) => ({
        url: `${USER_URL}/${userId}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["User"],
    }),
    updateUserDetail: builder.mutation({
      query: ({userId, data}) => ({
        url: `${USER_URL}/update/${userId._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    updateHostDetail: builder.mutation({
      query: ({userId, data}) => ({
        url: `${USER_URL}/host/${userId._id}`,
        method: "PUT",
        body: data,
      }),
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `/api/user/upload`,
        method: "POST",
        body: data,
      }),
    })
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useCreateHostMutation,
  useUpdateUserRoleMutation,
  useGetUserDetailsQuery,
  useUpdateUserDetailMutation,
  useUpdateHostDetailMutation,
  useUpdateProfileMutation
} = usersApiSlice;
