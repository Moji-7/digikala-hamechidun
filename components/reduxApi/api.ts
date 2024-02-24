import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import useTokenStorage from "../../auth/components/hooks/useTokenStorage";
import { baseQueryWithAuth } from "./apiBaseQuery";
import { useFetchWithAuth } from "./useFetchWithAuth";


// const baseQueryWithAuth: BaseQueryFn<string, unknown, unknown, unknown, { auth: AuthHeaderType | null }> = async ({ url, method, body }, { signal, dispatch, getState, extraOptions }, endpointDefinition, baseQueryApi) => {
//   const obj = {
//     auth: {
//       access_token: 'your_access_token_here'
//     }
//   };
//   const token = obj.auth?.access_token;

//   // const { getToken } = useTokenStorage();
//   // const token = await getToken();
  

//   let headers = {};
//   if (token) {
//     headers = {
//       authorization: `Bearer ${token}`,
//       ...extraOptions?.headers,
//     };
//   }

//   return fetchBaseQuery({
//     baseUrl: 'http://localhost:3222/eye/',
//     prepareHeaders: (headers, { getState }) => {
//       headers.set('authorization', `Bearer ${token}`);
//       return headers;
//     },
//   })({ url, method, body, headers }, { signal, dispatch, getState, extraOptions }, endpointDefinition, baseQueryApi);
// };

export const api = createApi({
  reducerPath: "api",
  // baseQuery: fetchBaseQuery({
  //   baseUrl: "http://localhost:3222/eye/",
  // }),
  baseQuery: baseQueryWithAuth,
//  baseQuery: async (args, api, extraOptions) => {
//   // get the fetch function from the custom hook
//   const fetchWithAuth = useFetchWithAuth();

//   // use the fetch function to make the API call
//   const data = await fetchWithAuth(args.url, args.options);

//   // return the data
//   return data;
// },
  
  endpoints: (build) => ({
    getEye: build.query({
      query: (params) => `eye/?${stringify(params)}`, 
      providesTags: ["Eye"],
      transformResponse: (response) => response.data,
      refetchOnMountOrArgChange: true, 
    }),

    submitItems: build.mutation({
      query: (items) => ({
        url: "submitItems", 
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
          url: `/${productId}`, // Adjust the URL as needed
          method: "DELETE",
      }),
      // Other options...
  }),


  }),
});
export const {  useSubmitItemsMutation ,useDeleteItemMutation } = api;



