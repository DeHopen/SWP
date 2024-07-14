import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice/userSlice';
import {topicsApi} from "@/store/api/topicsApi";
import {tasksApi} from "@/store/api/taskApi";


export const store = configureStore({
  reducer: {
    user: userReducer,
    [topicsApi.reducerPath]: topicsApi.reducer,
    [tasksApi.reducerPath]: topicsApi.reducer,
  },
// @ts-ignore
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(topicsApi.middleware, tasksApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
