import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userApi } from "./UserApi";


export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://apac-server.onrender.com/api' }),

    endpoints: (builder) => ({
    
        
        register: builder.mutation({
            query(body) {
              return {
                url: '/register',
                method: 'POST',
                body,
              };
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
              try {
                await queryFulfilled;
                await dispatch(userApi.endpoints.profile.initiate()); 
              } catch (error) {
                console.error('Error in onQueryStarted:', error.message, error);
              }
            },
          }),


          login : builder.mutation({
            query(body){
               return {
                url : "/login",
                method : "POST",
                body
               }
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
              try {
               await queryFulfilled;          
               await dispatch(userApi.endpoints.profile.initiate());      
              } catch (error) {
                console.error('Error during login or fetching profile:', error);
                console.error('Detailed error info:', error.response || error);
              }
            }
          }),


        logout : builder.query({
            query : () => "/logout",
        }),

    })
})
export const {useLoginMutation,useRegisterMutation,useLazyLogoutQuery } = authApi