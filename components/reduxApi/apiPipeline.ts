
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiPipeline = createApi({
    reducerPath: "pipeline",
    baseQuery: fetchBaseQuery({
      baseUrl: "http://localhost:3222/pipeline/",
    }),

    endpoints: (build) => ({
        getAll: build.query({
            query: () => "pipelines", // Assuming the endpoint URL is just "pipelines"
            providesTags: ["Pipelines"], // Invalidate "Pipelines" tag on success
            transformResponse: (response) => response.data as Pipeline[], // Assuming data array
          }),
      
          get: build.query({
            query: (pipelineId) => `${pipelineId}`,
            providesTags: (result, error) =>
              error ? [] : ["Pipelines", result.id] // Invalidate both tags
          }),
          getPipeline: build.query({
            query: (pipelineId) => `${pipelineId}`,
          }),
    }),
    })

    export const { useGetAllQuery, useGetQuery,useGetPipelineQuery } = apiPipeline;
  
  
  
  