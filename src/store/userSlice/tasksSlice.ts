// src/redux/slices/tasksSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TaskState {
  tasks: string[];
}

const initialState: TaskState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<string>) {
      state.tasks.push(action.payload);
    },
    removeTask(state, action: PayloadAction<number>) {
      state.tasks.splice(action.payload, 1);
    },
  },
});

export const { addTask, removeTask } = tasksSlice.actions;
export default tasksSlice.reducer;
