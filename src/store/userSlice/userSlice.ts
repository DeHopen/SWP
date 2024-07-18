// src/redux/slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TopicsTasks {
  topics: string[];
  tasks: string[];
}

interface UserState {
  type: 'participant' | 'group';
  participantData: Record<string, TopicsTasks>;
  groupData: Record<string, TopicsTasks>;
  selectedId: string | null;
}

const initialState: UserState = {
  type: 'participant',
  participantData: {
    '1': { topics: [], tasks: [] },
    '2': { topics: [], tasks: [] },
    '3': { topics: [], tasks: [] },
    '4': { topics: [], tasks: [] },
    '5': { topics: [], tasks: [] },
  },
  groupData: {
    '10': { topics: [], tasks: [] },
    '20': { topics: [], tasks: [] },
    '30': { topics: [], tasks: [] },
    '40': { topics: [], tasks: [] },
    '50': { topics: [], tasks: [] },
  },
  selectedId: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setType(state, action: PayloadAction<'participant' | 'group'>) {
      state.type = action.payload;
      state.selectedId = null;
    },
    setSelectedId(state, action: PayloadAction<string>) {
      state.selectedId = action.payload;
    },
    addTopic(state, action: PayloadAction<string>) {
      const id = state.selectedId;
      if (id) {
        if (state.type === 'participant') {
          state.participantData[id].topics.push(action.payload);
        } else {
          state.groupData[id].topics.push(action.payload);
        }
      }
    },
    removeTopic(state, action: PayloadAction<number>) {
      const id = state.selectedId;
      if (id) {
        if (state.type === 'participant') {
          state.participantData[id].topics.splice(action.payload, 1);
        } else {
          state.groupData[id].topics.splice(action.payload, 1);
        }
      }
    },
    addTask(state, action: PayloadAction<string>) {
      const id = state.selectedId;
      if (id) {
        if (state.type === 'participant') {
          state.participantData[id].tasks.push(action.payload);
        } else {
          state.groupData[id].tasks.push(action.payload);
        }
      }
    },
    removeTask(state, action: PayloadAction<number>) {
      const id = state.selectedId;
      if (id) {
        if (state.type === 'participant') {
          state.participantData[id].tasks.splice(action.payload, 1);
        } else {
          state.groupData[id].tasks.splice(action.payload, 1);
        }
      }
    },
  },
});

export const { setType, setSelectedId, addTopic, removeTopic, addTask, removeTask } = userSlice.actions;
export default userSlice.reducer;
