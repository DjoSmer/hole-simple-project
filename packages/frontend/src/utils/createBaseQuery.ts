import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { getHttpHeaders } from '~/services/api/http';

export const createBaseQuery = (baseUrl: string, tokenCheck: boolean = true) =>
  fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const httpHeaders = getHttpHeaders(tokenCheck);

      Object.keys(httpHeaders).forEach((key) => {
        headers.set(key, httpHeaders[key]);
      });

      return headers;
    },
  });
