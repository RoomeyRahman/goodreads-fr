"use client";

import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { currentUserApi } from "./features/apis/current-user-api";
import { authApi } from "./features/apis/auth-api";
import { bookApi } from "./features/apis/book-api";
import { reviewApi } from "./features/apis/review-api";

const store = configureStore({
  reducer: {
    [currentUserApi.reducerPath]: currentUserApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [bookApi.reducerPath]:bookApi.reducer,
    [reviewApi.reducerPath]:reviewApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      currentUserApi.middleware,
      authApi.middleware,
      bookApi.middleware,
      reviewApi.middleware
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
setupListeners(store.dispatch);
