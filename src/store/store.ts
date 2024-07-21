import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice/userSlice';
import taskReducer from './userSlice/taskSlice';
import {topicsApi} from "@/store/api/topicsApi";
import {tasksApi} from "@/store/api/taskApi";
import {modelApi} from "@/store/api/modelApi";

export const store = configureStore({
  reducer: {
    user: userReducer,
    task: taskReducer,
    [topicsApi.reducerPath]: topicsApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
    [modelApi.reducerPath]: modelApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(topicsApi.middleware, tasksApi.middleware, modelApi.middleware),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
