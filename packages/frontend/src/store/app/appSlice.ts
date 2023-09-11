import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PaletteMode } from '@mui/material';
import themeService from '~/services/themeService';

export interface AppState {
  paletteMode: PaletteMode;
}

const initialState: AppState = {
  paletteMode: themeService.get(),
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    togglePaletteMode: (state) => {
      state.paletteMode = state.paletteMode === 'dark' ? 'light' : 'dark';
      themeService.save(state.paletteMode);
    },
    setPaletteMode: (state, action: PayloadAction<PaletteMode>) => {
      state.paletteMode = action.payload;
      themeService.save(action.payload);
    },
  },
});

export const { actions } = appSlice;

export default appSlice.reducer;
