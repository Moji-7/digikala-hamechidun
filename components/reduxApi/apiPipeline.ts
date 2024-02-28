import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./apiBaseQuery";

export const apiPipeline = createApi({
  reducerPath: "apiPipeline",
  baseQuery: baseQueryWithAuth({ baseUrl: "http://localhost:3222/pipeline/" }),

  endpoints: (build) => ({
    submit: build.mutation({
      query: (userRequest) => ({
        url: "submit",
        method: "POST",
        body: userRequest,
      }),
      transformResponse: (response) => {
        // Log the raw response
        console.log("Raw response: ", response);
        return response;
      },
    }),
  }),
});
export const {
  useSubmitMutation,
} = apiPipeline;
