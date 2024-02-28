import { BaseQueryFn, fetchBaseQuery } from "@reduxjs/toolkit/query";
// Define the baseQueryWithAuth function
export const  baseQueryWithAuth=({ baseUrl })=> {
  return fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token2 = getState().token.value; // Access token from store
      headers.set('authorization', `Bearer ${token2}`);
      return headers;
    },
  });
}