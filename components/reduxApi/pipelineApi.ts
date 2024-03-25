import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./apiBaseQuery";

export const apiPipeline = createApi({
  reducerPath: "apipipeline",
  baseQuery: baseQueryWithAuth({ baseUrl: "http://localhost:3222/pipeline" }),


   
  endpoints: (build) => ({
    getAll: build.query({ 
      query: () => `/`, 
     // providesTags: ["pipeline"],
      transformResponse: (response) => response,
     refetchOnMountOrArgChange: true, 
    }),
      getPipelineStatusAll: build.query({ 
      query: () => `/pipelineStatusAll`, 
     // providesTags: ["pipeline"],
      transformResponse: (response) => response,
     refetchOnMountOrArgChange: true, 
    }),
     getPipelineStatusSummery: build.query({ 
      query: (eyeProductId) => `/pipelineStatusSummery/${eyeProductId}`,
      // providesTags: ["pipeline"],
      transformResponse: (response) => response,
     refetchOnMountOrArgChange: true, 
    }),
    submit: build.mutation({
      query: (pipelineDetail) => ({
        url: "submit",
        method: "POST",
        body: pipelineDetail,
      }),
      transformResponse: (response) => {
        // Log the raw response
        console.log("Raw response: ", response);
        return response;
      },
    }),
    submitProccess: build.mutation({
      query: (pipeLineStatus) => ({
        url: "submitStatus", // Replace with your actual endpoint URL
        method: "POST",
        body: pipeLineStatus,
      }),
      transformResponse: (response) => {
        console.log("Raw response for newSubmit: ", response);
        // Handle the response as needed (e.g., return specific data)
        return response.data; // Assuming response.data holds relevant information
      },
    }),
  }),
});
export const {
  useSubmitMutation,
  useSubmitProccessMutation,
  useGetAllQuery,
  useGetPipelineStatusAllQuery,
  useGetPipelineStatusSummeryQuery
} = apiPipeline;
