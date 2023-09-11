import { configureStore } from '@reduxjs/toolkit';
import appSlice from '~/store/app/appSlice';
import { dictionaryAPI } from '~/services/api';

export const index = configureStore({
  reducer: {
    app: appSlice,
    [dictionaryAPI.reducerPath]: dictionaryAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(dictionaryAPI.middleware),
});

export type RootState = ReturnType<typeof index.getState>;
export type AppDispatch = typeof index.dispatch;
export type DispatchThink<RT = void> = (dispatch: AppDispatch, getState: () => RootState) => RT;
