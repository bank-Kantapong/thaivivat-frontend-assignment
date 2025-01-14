import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type StoriesItemType = {
  _id: string;
  name: string;
  imageUrl: string;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.disneyapi.dev' }),
  endpoints: (builder) => ({
    getCharacter: builder.query({
      query: () => '/character',
    }),
  }),
});

export const { useGetCharacterQuery } = apiSlice;
