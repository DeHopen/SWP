import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice/userSlice';
import tasksReducer from './userSlice/taskSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
