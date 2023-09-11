import { PaletteMode } from '@mui/material';
import storageService from '~/services/storageService';

const THEME_STORAGE_KEY = 'paletteMode';

const browserThemeDetector = (): PaletteMode => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

const save = (paletteMode: PaletteMode) => {
  storageService.set(THEME_STORAGE_KEY, paletteMode);
};

const get = (): PaletteMode => {
  return (storageService.get(THEME_STORAGE_KEY) as PaletteMode | null) || browserThemeDetector();
};

export const themeService = {
  browserThemeDetector,
  save,
  get,
};

export default themeService;
