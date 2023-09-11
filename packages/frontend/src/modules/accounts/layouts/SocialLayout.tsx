import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Divider, Grid } from '@mui/material';
import { SocialButtonsContainer } from 'ms/accounts/components';
import { MainLayout, MainLayoutProps } from 'ms/accounts/layouts';

export const SocialLayout: FC<MainLayoutProps> = ({ children, ...props }) => {
  const { t } = useTranslation('accounts/socialButtons');
  return (
    <MainLayout {...props}>
      <Grid item md={12} lg={5} sx={{ flexGrow: 1, alignSelf: 'center' }}>
        {children}
      </Grid>
      <Grid item md={12} lg={2} sx={{ flexGrow: 1, display: { xs: 'block', lg: 'flex' } }}>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ flexGrow: 1, display: { xs: 'none', lg: 'flex' } }}
        >
          {t('dividerNameText')}
        </Divider>
        <Divider sx={{ flexGrow: 1, my: 4, display: { xs: 'flex', lg: 'none' } }}>
          {t('dividerNameText')}
        </Divider>
      </Grid>

      <Grid item md={12} lg={5} sx={{ flexGrow: 1, alignSelf: 'center', width: '100%' }}>
        <SocialButtonsContainer />
      </Grid>
    </MainLayout>
  );
};
