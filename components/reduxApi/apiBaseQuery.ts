import { BaseQueryFn, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const baseQueryWithAuth: BaseQueryFn<string, unknown, unknown, unknown, { auth: AuthHeaderType | null }> = 
async ({ url, method, body }, { signal, dispatch, getState, extraOptions }, endpointDefinition, baseQueryApi) => {
    const obj = {
      auth: {
        access_token: 'your_access_token_here'
      }
    };
   // const token0 = await useTokenStorage().getToken();
    const token = obj.auth?.access_token;
    const token2 =getState().token.value
    // const { getToken } = useTokenStorage();
    // const token = await getToken();
    let headers = {};
    if (token) {
      headers = {
        authorization: `Bearer ${token}`,
        ...extraOptions?.headers,
      };
    }
  
    return fetchBaseQuery({
      baseUrl: 'http://localhost:3222/eye/',
      prepareHeaders: (headers, { getState }) => {
        headers.set('authorization', `Bearer ${token2}`);
        return headers;
      },
    })({ url, method, body, headers }, { signal, dispatch, getState, extraOptions }, endpointDefinition, baseQueryApi);
  };
  