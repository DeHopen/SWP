import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const modelApi = createApi({
  reducerPath: 'modelApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://10.100.30.73/api/' }),
  endpoints: (builder) => ({
    getModel: builder.query({
      query: (prompt) => ({
        url: `llm`,
        method: 'GET',
        params: { prompt },
      }),
    }),
  }),
});

export const { useGetModelQuery, useLazyGetModelQuery } = modelApi;
