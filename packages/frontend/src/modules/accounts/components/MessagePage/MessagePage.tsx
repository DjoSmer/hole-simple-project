import React, { FC, ReactNode, PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Link, Button, Grid, Box, Typography, CircularProgress } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { MainLayout } from 'ms/accounts/layouts';
import { routes } from 'ms/accounts/types';

interface MessagePageProps extends PropsWithChildren {
  heading: string;
  headingIcon?: ReactNode;
  button?: MessageButton;
  loading?: boolean;
}

export interface MessageButton {
  icon?: ReactNode;
  label: string;
  onClick: () => void;
}

export const MessagePage: FC<MessagePageProps> = (props) => {
  const { children, heading, button: buttonProps, loading } = props;
  const navigate = useNavigate();
  const { t } = useTranslation('accounts/messagePage');
  const button: MessageButton = buttonProps || {
    icon: <ArrowBack />,
    label: t('goToLoginButton'),
    onClick: () => navigate(routes.LOGIN),
  };

  return (
    <MainLayout
      heading={() => (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '5%',
          }}
        >
          <Typography variant="h3" textAlign="center">
            {heading}
          </Typography>
        </Box>
      )}
    >
      {children ? (
        <Grid item xs={12} textAlign="center">
          <Typography typography="h5">{children}</Typography>
        </Grid>
      ) : null}
      <Grid item xs={12} textAlign="center">
        {loading ? (
          <CircularProgress
            color="secondary"
            sx={{
              marginTop: '4%',
            }}
          />
        ) : (
          <Link
            component={Button}
            underline="hover"
            startIcon={button.icon}
            color="secondary"
            sx={{
              marginTop: '4%',
            }}
            onClick={button.onClick}
          >
            {button.label}
          </Link>
        )}
      </Grid>
    </MainLayout>
  );
};
