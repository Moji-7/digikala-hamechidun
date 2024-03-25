import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./apiBaseQuery";



export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth({ baseUrl: "http://localhost:3222/eye/" }),

  endpoints: (build) => ({
    getEye: build.query({ 
      query: () => `?page=1&length=10`, 
      providesTags: ["Eye"],
      transformResponse: (response) => response.eyeProducts,//.data,
      refetchOnMountOrArgChange: true, 
    }),

    SubmitEyeProducts: build.mutation({
      query: (items) => ({
        url: "submitProducts", 
        method: "POST", 
        body: items, 
      }),
      transformResponse: (response) => {
        // Log the raw response
        console.log('Raw response: ', response);
        // If you want to debug, you can add a breakpoint here
        // Then return the response to let the mutation proceed as normal
        return response;
      },
     // invalidatesTags: ["Eye"], // Invalidate the getEye query after the mutation succeeds
      transformErrorResponse: (error) => {
        // You can modify the error object here to suit your needs
        return { message: error.data.message, status: error.status };
      },

    }),
    deleteItem: build.mutation<void, number>({
      query: (productId) => ({
          url: `${productId}`, 
          method: "DELETE",
      }),
  }),


  }),
});
export const {  useGetEyeQuery ,useSubmitEyeProductsMutation ,useDeleteItemMutation } = api;



