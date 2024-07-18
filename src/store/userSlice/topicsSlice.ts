// src/redux/slices/topicsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TopicState {
  topics: string[];
}

const initialState: TopicState = {
  topics: [],
};

const topicsSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {
    addTopic(state, action: PayloadAction<string>) {
      state.topics.push(action.payload);
    },
    removeTopic(state, action: PayloadAction<number>) {
      state.topics.splice(action.payload, 1);
    },
  },
});

export const { addTopic, removeTopic } = topicsSlice.actions;
export default topicsSlice.reducer;
