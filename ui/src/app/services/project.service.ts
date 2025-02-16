import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from './queryUtils';

export const projectAPI = createApi({
  reducerPath: 'projectAPI',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    createProject: builder.mutation<any, any>({
      query: (form) => ({
        url: 'projects/',
        method: 'POST',
        body: form,
      }),
    }),
    updateProject: builder.mutation<any, any>({
      query: (form) => ({
        url: 'projects/',
        method: 'PUT',
        body: form,
      }),
    }),

    getProjects: builder.query<any, void>({
      query: () => ({
        url: 'projects/',
        method: 'GET',
      }),
    }),
  }),
});

export const { useCreateProjectMutation, useGetProjectsQuery, useUpdateProjectMutation } =
  projectAPI;
