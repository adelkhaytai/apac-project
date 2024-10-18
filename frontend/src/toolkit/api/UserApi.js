import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setIsAuthenticated, setLoading, setUser } from "../features/UserSlice";


export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["User", "AdminUsers"],
  endpoints: (builder) => ({

    profile: builder.query({
      query: () => ({
        url: '/profile',
        method: 'GET',
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data.user));
          dispatch(setIsAuthenticated(true));
          dispatch(setLoading(false));
        } catch (error) {
          dispatch(setLoading(false));
          console.log(error);
        }
      },
      providesTags: ["User"],
    }),
    

    updateProfile: builder.mutation({
      query(body) {
        return {
          url: "/profile/update",
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["User"],
    }),

   

  }),
});
export const {
  useProfileQuery,
  useUpdateProfileMutation,
} = userApi;
