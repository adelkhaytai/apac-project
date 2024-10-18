import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./features/UserSlice";

import {eventApi} from "./api/EventsApi";
import { userApi } from "./api/UserApi";
import { authApi } from "./api/AuthApi";

export const store = configureStore({
  reducer: {
    [eventApi.reducerPath]: eventApi.reducer,
    auth: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      userApi.middleware,
      eventApi.middleware,
    ]),
});
