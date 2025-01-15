import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type UserItemType = {
  _id: string;
  name: string;
  imageUrl: string;
  videoGames?: string[];
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.disneyapi.dev' }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => '/character',
    }),
  }),
});

export const { useGetUserQuery } = apiSlice;
