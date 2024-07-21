import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Topic {
  id: string;
  topic: string;
  tasks?: Task[];
}

interface Task {
  id: string;
  task: string;
}

interface UserState {
  type: 'participant' | 'group';
  selectedId: string | null;
  selectedTopicId: string | null;
  selectedTopicData: Topic | null;
  participantData: Record<string, { topics: Topic[]; tasks: Task[] }>;
  groupData: Record<string, { topics: Topic[]; tasks: Task[] }>;
}

const initialState: UserState = {
  type: 'participant',
  selectedTopicId: null,
  selectedTopicData: null,
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
    },
    setSelectedId(state, action: PayloadAction<string>) {
      state.selectedId = action.payload;
    },
    setSelectedTopicId(state, action: PayloadAction<string | null>) {
      state.selectedTopicId = action.payload;
    },
    saveSelectedTopic(state, action: PayloadAction<Topic>) {
      state.selectedTopicData = action.payload;
    },
    addTopic(state, action: PayloadAction<string>) {
      if (state.selectedId) {
        const data = state.type === 'participant' ? state.participantData : state.groupData;
        if (data[state.selectedId]) {
          data[state.selectedId].topics.push({ id: new Date().toISOString(), topic: action.payload });
        } else {
          data[state.selectedId] = { topics: [{ id: new Date().toISOString(), topic: action.payload }], tasks: [] };
        }
      }
    },
    removeTopic(state, action: PayloadAction<string | null>) {
      if (state.selectedId && action.payload) {
        const data = state.type === 'participant' ? state.participantData : state.groupData;
        if (data[state.selectedId]) {
          data[state.selectedId].topics = data[state.selectedId].topics.filter(topic => topic.id !== action.payload);
        }
      }
    },
    addTask(state, action: PayloadAction<{ topicId: string; task: string }>) {
      if (state.selectedId) {
        const data = state.type === 'participant' ? state.participantData : state.groupData;
        const topic = data[state.selectedId].topics.find(topic => topic.id === action.payload.topicId);
        if (topic) {
          if (!topic.tasks) {
            topic.tasks = [];
          }
          topic.tasks.push({ id: new Date().toISOString(), task: action.payload.task });
        }
      }
    },
    removeTask(state, action: PayloadAction<string>) {
      if (state.selectedId && state.selectedTopicId) {
        const data = state.type === 'participant' ? state.participantData : state.groupData;
        const topic = data[state.selectedId].topics.find(topic => topic.id === state.selectedTopicId);
        if (topic && topic.tasks) {
          topic.tasks = topic.tasks.filter(task => task.id !== action.payload);
        }
      }
    },
  },
});

export const { setType, setSelectedId, addTopic, removeTopic, addTask, removeTask, setSelectedTopicId, saveSelectedTopic } = userSlice.actions;

export default userSlice.reducer;
