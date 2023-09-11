import React, { FC, PropsWithChildren, ReactChild } from 'react';
import { Grid, Typography, styled, Container } from '@mui/material';
import { PageHeader, PageFooter } from 'ms/accounts/components';

const MainLayoutRoot = styled(Grid)(({ theme }) => {
  return {
    marginBottom: 'auto',
    justifyContent: 'space-between',
    [theme.breakpoints.up('lg')]: {
      marginTop: 'auto',
    },
    [theme.breakpoints.down('lg')]: {
      marginTop: '12%',
    },
  };
});

const PageContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
});

const PageContent = styled('main')({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
});

export interface MainLayoutProps extends PropsWithChildren {
  heading: string | (() => ReactChild);
  headerProps?: {
    right: {
      to: string;
      label: string;
    };
  };
}

export const MainLayout: FC<MainLayoutProps> = (props) => {
  const { children, heading, headerProps = {} } = props;

  return (
    <PageContainer>
      <PageHeader {...headerProps} />

      <PageContent>
        <MainLayoutRoot container>
          <Grid item xs={12}>
            {typeof heading === 'string' ? (
              <Typography
                variant="h3"
                textAlign="center"
                sx={{
                  marginBottom: '8%',
                }}
              >
                {heading}
              </Typography>
            ) : (
              heading()
            )}
          </Grid>
          {children}
        </MainLayoutRoot>
      </PageContent>
      <PageFooter />
    </PageContainer>
  );
};
