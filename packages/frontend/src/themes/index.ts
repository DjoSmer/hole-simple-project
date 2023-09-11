import { createTheme as createThemeBase, PaletteMode } from '@mui/material';
import { dark } from '~/themes/dark';
import { light } from '~/themes/light';

export const createTheme = (mode: PaletteMode) => {
  const theme = mode === 'dark' ? dark : light;
  return createThemeBase(theme);
};
