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
        createHost: builder.mutation({
            query: (data)=>({
                url: `${USER_URL}/host`,
                method: 'POST',
                body: data,
            }),
        }),
        updateUserRole: builder.mutation({
            query: (data)=>({
                url: `${USER_URL}/${data.userId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ["User"],
        }),
    })
});

export const {useLoginMutation, useRegisterMutation, useLogoutMutation, useCreateHostMutation, useUpdateUserRoleMutation}= usersApiSlice;