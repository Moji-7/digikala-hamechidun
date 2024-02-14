import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3222",
  }),
  endpoints: (build) => ({
    getEye: build.query({
      query: (params) => `/eye/?${params}`,
      transformResponse: (response) => response.data,
    }),
  }),
});


