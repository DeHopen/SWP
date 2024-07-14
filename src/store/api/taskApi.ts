// src/services/tasksApi.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://10.100.30.73/api/' }),
  endpoints: (builder) => ({
    createTask: builder.mutation({
      query: ({ description, name, topic_id, user_id }) => ({
        url: 'topics/tasks',
        method: 'POST',
        body: { description, name, topic_id, user_id },
      }),
    }),
    getTasks: builder.query({
      query: ({ topic_id, user_id }) => ({
        url: 'topics/tasks',
        method: 'GET',
        params: { topic_id, user_id },
      }),
    }),
  }),
});

export const { useCreateTaskMutation, useGetTasksQuery } = tasksApi;
