import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  selection: 'participant' | 'group';
  id_user_list: string[];
  id_group_list: string[];
  id_user: string | null;
  id_group: string | null;
  topics_user: { [key: string]: string[] };
  topics_group: { [key: string]: string[] };
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
        state.topics_user[id] = [];
      }
      state.topics_user[id].push(topic);
    },
    removeTopicUser: (state, action: PayloadAction<{ id: string, index: number }>) => {
      const { id, index } = action.payload;
      if (state.topics_user[id]) {
        state.topics_user[id].splice(index, 1);
      }
    },
    addTopicGroup: (state, action: PayloadAction<{ id: string, topic: string }>) => {
      const { id, topic } = action.payload;
      if (!state.topics_group[id]) {
        state.topics_group[id] = [];
      }
      state.topics_group[id].push(topic);
    },
    removeTopicGroup: (state, action: PayloadAction<{ id: string, index: number }>) => {
      const { id, index } = action.payload;
      if (state.topics_group[id]) {
        state.topics_group[id].splice(index, 1);
      }
    },
  },
});

export const { setSelection, setIdUser, setIdGroup, addTopicUser, removeTopicUser, addTopicGroup, removeTopicGroup } = userSlice.actions;
export default userSlice.reducer;
