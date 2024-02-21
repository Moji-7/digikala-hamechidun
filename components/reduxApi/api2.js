import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiC = createApi({
  reducerPath: 'apiC',
  tagTypes: ['Items'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3222/eye' }),
  endpoints: (builder) => ({
    getItems: builder.query({
      query: () => '/?page=1&length=10',
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Items', id })), { type: 'Items', id: 'LIST' }]
          : [{ type: 'Items', id: 'LIST' }],
    }),
    addItem: builder.mutation({
      query: (item) => ({ url: '/?page=1&length=10', method: 'GET'}),
      invalidatesTags: [{ type: 'Items', id: 'LIST' }],
    }),
  }),
});
export const {  useAddItemMutation } = apiC


