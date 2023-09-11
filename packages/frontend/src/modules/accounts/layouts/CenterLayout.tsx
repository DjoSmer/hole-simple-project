import React, { FC } from 'react';
import { Grid } from '@mui/material';
import { MainLayout, MainLayoutProps } from './MainLayout';

export const CenterLayout: FC<MainLayoutProps> = ({ children, ...props }) => {
  return (
    <MainLayout {...props}>
      <Grid item xs={false} lg={3} />
      <Grid item xs={12} lg={5} sx={{ flexGrow: 1, alignSelf: 'center' }}>
        {children}
      </Grid>
      <Grid item xs={false} lg={3} />
    </MainLayout>
  );
};
