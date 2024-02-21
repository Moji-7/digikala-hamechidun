import { BaseQueryFn, fetchBaseQuery } from '@reduxjs/toolkit/dist/query';


const fetchBaseQueryWithHeaders: BaseQueryFn<{ auth: AuthHeaderType | null }, unknown, never> = async (args, api, extraOptions) => {
  const auth = api.getState().authReducer.auth; // Replace 'authReducer' with your own auth slices' name and update the interface below
  const token = auth ? auth.access_token : undefined;

  if (token) {
    extraOptions = {
      ...extraOptions,
      headers: {
        authorization: `Bearer ${token}`,
        ...extraOptions?.headers,
      },
    };
  }

  return fetchBaseQuery(args, extraOptions)(args, api, extraOptions);
};

export default fetchBaseQueryWithHeaders;