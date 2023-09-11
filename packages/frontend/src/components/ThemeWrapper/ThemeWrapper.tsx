import React, { FC, useMemo, PropsWithChildren } from 'react';
import { ThemeProvider } from '@mui/material';
import { useAppSelector } from '~/hooks';
import { createTheme } from '~/themes';

export const ThemeWrapper: FC<PropsWithChildren> = ({ children }) => {
  const paletteMode = useAppSelector(({ app }) => app.paletteMode);
  const theme = useMemo(() => createTheme(paletteMode), [paletteMode]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
