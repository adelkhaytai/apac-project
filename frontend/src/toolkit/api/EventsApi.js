import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const eventApi = createApi({
  reducerPath: "eventApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://apac-server.onrender.com/api" }),
  tagTypes: ["Event", "User", "AdminUser"],
  endpoints: (builder) => ({
    createEvent: builder.mutation({
      query(body) {
        return {
          url: "/eventsNew",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["User"],
    }),

    // getEvents: builder.query({
    //   query: (params) => `/getAllEvents`,
    // }),

    getEvents: builder.query({
      query: ({ page = 1, limit = 4 }) => `/getAllEvents?page=${page}&limit=${limit}`,
      providesTags: ['Event'], // Optional: Tag to manage cache
    }),



    getEventDetails: builder.query({
      query: (id) => `/event/${id}`,
      providesTags: ["Event"],
    }),

    getMyEvent: builder.query({
      query: () => ({
        url: "/myEvents",
        method: "POST",
        // credentials: 'include',
      }),
    }),

    updateEvent: builder.mutation({
      query({ id, body }) {
        return {
          url: `/updateEvent/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["event"],
    }),

    deleteEvent: builder.mutation({
      query(id) {
        return {
          url: `/deleteEvent/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["event"],
    }),

    getEventsFilter: builder.query({
      query: (params) => ({
        url: "/eventsFilter",
        params: {
          page: params?.page,
          keyword: params?.keyword,
        },
      }),
      keepUnusedDataFor: 30,
    }),

    //admin api edit and delete events :

    updateEventAdmin: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin_updateEvent/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["AdminUser", "event"],
    }),

    deleteEventAdmin: builder.mutation({
      query(id) {
        return {
          url: `/admin_deleteEvent/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AdminUser", "event"],
    }),
  }),
});

export const {
  //users
  useCreateEventMutation,
  useGetEventsQuery,
  useUpdateEventMutation,
  useLazyGetMyEventQuery,
  useGetEventDetailsQuery,
  useDeleteEventMutation,
  useGetEventsFilterQuery,
  //admin
  useUpdateEventAdminMutation,
  useDeleteEventAdminMutation,
} = eventApi;
