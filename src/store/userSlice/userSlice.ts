import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  id: string;
  task: string;
}

interface UserState {
  selection: 'participant' | 'group';
  id_user_list: string[];
  id_group_list: string[];
  id_user: string | null;
  id_group: string | null;
  topics_user: { [key: string]: { [key: string]: Task[] } };
  topics_group: { [key: string]: { [key: string]: Task[] } };
}

const initialState: UserState = {
  selection: 'participant',
  id_user_list: ['1', '2', '3', '4', '5'],
  id_group_list: ['100', '101', '102', '103', '104'],
  id_user: null,
  id_group: null,
  topics_user: {},
  topics_group: {},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSelection: (state, action: PayloadAction<'participant' | 'group'>) => {
      state.selection = action.payload;
    },
    setIdUser: (state, action: PayloadAction<string>) => {
      state.id_user = action.payload;
    },
    setIdGroup: (state, action: PayloadAction<string>) => {
      state.id_group = action.payload;
    },
    addTopicUser: (state, action: PayloadAction<{ id: string, topic: string }>) => {
      const { id, topic } = action.payload;
      if (!state.topics_user[id]) {
        state.topics_user[id] = {};
      }
      if (!state.topics_user[id][topic]) {
        state.topics_user[id][topic] = [];
      }
    },
    removeTopicUser: (state, action: PayloadAction<{ id: string, topic: string }>) => {
      const { id, topic } = action.payload;
      if (state.topics_user[id]) {
        delete state.topics_user[id][topic];
      }
    },
    addTaskToTopicUser: (state, action: PayloadAction<{ id: string, topic: string, task: string }>) => {
      const { id, topic, task } = action.payload;
      if (state.topics_user[id] && state.topics_user[id][topic]) {
        state.topics_user[id][topic].push({ id: new Date().toISOString(), task });
      }
    },
    removeTaskFromTopicUser: (state, action: PayloadAction<{ id: string, topic: string, taskId: string }>) => {
      const { id, topic, taskId } = action.payload;
      if (state.topics_user[id] && state.topics_user[id][topic]) {
        state.topics_user[id][topic] = state.topics_user[id][topic].filter(task => task.id !== taskId);
      }
    },
    addTopicGroup: (state, action: PayloadAction<{ id: string, topic: string }>) => {
      const { id, topic } = action.payload;
      if (!state.topics_group[id]) {
        state.topics_group[id] = {};
      }
      if (!state.topics_group[id][topic]) {
        state.topics_group[id][topic] = [];
      }
    },
    removeTopicGroup: (state, action: PayloadAction<{ id: string, topic: string }>) => {
      const { id, topic } = action.payload;
      if (state.topics_group[id]) {
        delete state.topics_group[id][topic];
      }
    },
    addTaskToTopicGroup: (state, action: PayloadAction<{ id: string, topic: string, task: string }>) => {
      const { id, topic, task } = action.payload;
      if (state.topics_group[id] && state.topics_group[id][topic]) {
        state.topics_group[id][topic].push({ id: new Date().toISOString(), task });
      }
    },
    removeTaskFromTopicGroup: (state, action: PayloadAction<{ id: string, topic: string, taskId: string }>) => {
      const { id, topic, taskId } = action.payload;
      if (state.topics_group[id] && state.topics_group[id][topic]) {
        state.topics_group[id][topic] = state.topics_group[id][topic].filter(task => task.id !== taskId);
      }
    },
  },
});

export const {
  setSelection,
  setIdUser,
  setIdGroup,
  addTopicUser,
  removeTopicUser,
  addTaskToTopicUser,
  removeTaskFromTopicUser,
  addTopicGroup,
  removeTopicGroup,
  addTaskToTopicGroup,
  removeTaskFromTopicGroup
} = userSlice.actions;
export default userSlice.reducer;
