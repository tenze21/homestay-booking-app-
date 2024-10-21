import { USER_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice= apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        login: builder.mutation({
            query: (data)=>({
                url: `${USER_URL}/login`,
                method: 'POST',
                body: data,
            }),
        }),
        register: builder.mutation({
            query: (data)=>({
                url: `${USER_URL}/register`,
                method: 'POST',
                body: data,
            }),
        }),
        logout: builder.mutation({
            query: ()=>({
                url: `${USER_URL}/logout`,
                method: 'POST',
            }),
        }),
    })
});

export const {useLoginMutation, useRegisterMutation, useLogoutMutation}= usersApiSlice;