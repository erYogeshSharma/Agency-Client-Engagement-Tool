import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '@/@types/auth';
import { RootState } from '@/app/store';
import { BASE_API_URL } from '@/config';
import { authActions } from '@/features/auth/auth.slice';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.tokens?.accessToken;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

// 🔄 Function to handle token refresh

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  {},
  FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = (api.getState() as RootState).auth.tokens?.refreshToken;

    if (!refreshToken) {
      api.dispatch(authActions.logout());
      return result;
    }

    // Request new tokens
    const refreshResult = await baseQuery(
      {
        url: '/auth/refresh-token',
        method: 'POST',
        body: { refresh_token: refreshToken },
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      api.dispatch(authActions.setAccessToken({ ...refreshResult.data, refreshToken }));

      // Retry the failed request with the new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(authActions.logout());
    }
  }

  return result;
};

// 🔗 Create API service with enhanced base query
export const api = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getUser: builder.query<User, void>({
      query: () => '/user',
    }),
  }),
});

export const { useGetUserQuery } = api;

export default baseQueryWithReauth;
