import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./apiBaseQuery";

export const apiIncredibles = createApi({
  reducerPath: "apiincredibles",
  baseQuery: baseQueryWithAuth({ baseUrl: "http://localhost:3222/incredibles" }),


   
  endpoints: (build) => ({
    getAll: build.query({ 
      query: (param) => `/all/?param=${param}`, 
     // providesTags: ["incredibles"],
      transformResponse: (response) => response,
     refetchOnMountOrArgChange: true, 
    }),


  }),
});
export const {
  useGetAllQuery,
} = apiIncredibles;
