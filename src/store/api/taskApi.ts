// src/services/tasksApi.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://10.100.30.73/api/' }),
  endpoints: (builder) => ({
    createTask: builder.mutation<void, { desc: string; name: string; topic_id: string; user_id: string }>({
      query: ({ desc, name, topic_id, user_id }) => ({
        url: `topics/create_task`,
        method: 'GET',
        params: { desc, name, topic_id, user_id },
      }),
    }),
    deleteTask: builder.mutation<void, { user_id: string; task_id: string | null }>({
      query: ({ user_id, task_id }) => ({
        url: `topics/delete_task`,
        method: 'GET',
        params: { user_id, task_id },
      }),
    }),
    getTasks: builder.query<Array<{ description: string; id: string; name: string; topic_id: string, topic_name: string }> , { user_id: string; topic_id: string | string[] }>({
      query: ({ user_id, topic_id }) => ({
        url: 'topics/tasks',
        method: 'GET',
        params: { user_id, topic_id },
      }),
    }),
  }),
});

export const { useCreateTaskMutation, useGetTasksQuery, useDeleteTaskMutation } = tasksApi;
