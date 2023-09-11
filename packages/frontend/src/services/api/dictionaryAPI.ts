import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/query/react';
import { API_DICTIONARY_URL } from '~/constant';
import { ResponseList, Dictionary } from '~/types';
import { createBaseQuery } from '~/utils/createBaseQuery';

export type QueryParamsAlt = { label: string } & { [k: string]: string };

const dictionariesAdapter = createEntityAdapter<Dictionary>({
  selectId: (e) => e.code,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

export const dictionaryAPI = createApi({
  reducerPath: 'dictionaries',
  baseQuery: createBaseQuery(API_DICTIONARY_URL),
  keepUnusedDataFor: 600,
  endpoints: (build) => ({
    getList: build.query<EntityState<Dictionary>, string>({
      query: (label) => `/dictionary/getList?label=${label}`,
      transformResponse(data: ResponseList<Dictionary[]>) {
        return dictionariesAdapter.addMany(
          dictionariesAdapter.getInitialState(),
          data.list.filter((entity) => !!entity.name)
        );
      },
    }),
  }),
});
