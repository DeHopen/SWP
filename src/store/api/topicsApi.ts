// src/services/topicsApi.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const topicsApi = createApi({
  reducerPath: 'topicsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://10.100.30.73/api/' }),
  endpoints: (builder) => ({
    getTopics: builder.query({
      query: (id) => ({
        url: `topics`,
        method: 'GET',
        params: { id },
      }),
    }),
    createTopic: builder.mutation<void, { id: string; topic: string }>({
      query: ({ id, topic }) => {
        console.log('Sending to server:', { id, topic });
        return {
          url: `create_topic`,
          method: 'GET',
          params: { id, topic },
        };
      },
    }),
    deleteTopic: builder.mutation<void, { user_id: string; topic_id: string }>({
      query: ({ user_id, topic_id }) => {
        console.log('Sending to server:', { user_id, topic_id });
        return {
          url: `delete_topic`,
          method: 'GET',
          params: { user_id, topic_id },
        };
      },
    }),
  }),
});

export const { useGetTopicsQuery, useCreateTopicMutation, useDeleteTopicMutation } = topicsApi;
