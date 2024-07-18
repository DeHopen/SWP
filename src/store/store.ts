import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice/userSlice';
import taskReducer from './userSlice/taskSlice';
import topicsReducer from './userSlice/topicsSlice';
import tasksReducer from './userSlice/tasksSlice';
import {loadState, saveState} from "@/store/localStorage";
import throttle from 'lodash/throttle';

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    topics: topicsReducer,
    tasks: tasksReducer,
    user: userReducer,
    task: taskReducer,
    preloadedState,
  },
});

store.subscribe(throttle(() => {
  const currentState = store.getState();
  saveState(currentState);
  console.log("Saved state to localStorage:", currentState);
}, 1000));

console.log("Initial state:", store.getState());


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
