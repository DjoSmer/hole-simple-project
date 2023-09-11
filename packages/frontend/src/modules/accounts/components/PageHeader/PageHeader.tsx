import React, { FC } from 'react';
import { Link as RouteLink, generatePath } from 'react-router-dom';
import { Box, Link, styled } from '@mui/material';
import { Logo } from './Logo';
import { routes } from 'ms/accounts/types';

interface PageHeaderProps {
  right?: {
    to: string;
    label: string;
  };
}

const PageHeaderRoot = styled('header')({
  display: 'flex',
  paddingTop: '2rem',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'relative',
});

export const PageHeader: FC<PageHeaderProps> = ({ right }) => {
  return (
    <PageHeaderRoot>
      <Box>
        <RouteLink to={generatePath(routes.LOGIN)}>
          <Logo />
        </RouteLink>
      </Box>
      <Box>
        {right ? (
          <Link
            component={RouteLink}
            to={right.to}
            underline="hover"
            color="textPrimary"
            sx={{
              margin: 1,
              typography: {
                xl: 'h4',
                xs: 'h5',
              },
            }}
          >
            {right.label}
          </Link>
        ) : null}
      </Box>
    </PageHeaderRoot>
  );
};
