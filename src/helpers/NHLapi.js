// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const NHLApi = createApi({
  reducerPath: 'NHLApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://statsapi.web.nhl.com/api/v1/',
  }),
  endpoints: (builder) => ({
    getNHLStats: builder.query({
      query: (arry) => `${arry[0]}/?${arry[1]}=${arry[2]}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetNHLStatsQuery } = NHLApi;