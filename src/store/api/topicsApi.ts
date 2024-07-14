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
    createTopic: builder.mutation({
      query: ({ topic, user_id }) => ({
        url: 'topics',
        method: 'POST',
        body: { topic, user_id },
      }),
    }),
    deleteTopic: builder.mutation({
      query: ({ topic_id, user_id }) => ({
        url: 'topics',
        method: 'DELETE',
        body: { topic_id, user_id },
      }),
    }),
  }),
});

export const { useGetTopicsQuery, useCreateTopicMutation, useDeleteTopicMutation } = topicsApi;
