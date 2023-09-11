import React from 'react';
import { Link as RouteLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFormikSelector } from 'formik2nd';
import { LoadingButton } from '@mui/lab';
import { Link, Grid, SvgIcon } from '@mui/material';
import { PasswordField, FormikTextField } from '~/components';
import { SocialLayout } from 'ms/accounts/layouts';
import { LoginData, routes, TFormErrors } from 'ms/accounts/types';

export interface LoginFormProps {
  loading: boolean;
  loginData: LoginData;
  errors: TFormErrors<LoginData>;
  onSubmit: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLFormElement | HTMLInputElement>) => void;
  onChangeEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoginForm = () => {
  const { t } = useTranslation('accounts/loginPage');
  const { t: tt } = useTranslation('accounts/accounts');
  const isSubmitting = useFormikSelector(({ isSubmitting }) => isSubmitting);

  return (
    <SocialLayout
      heading={t('loginHeadingText')}
      headerProps={{
        right: {
          to: routes.REGISTRATION,
          label: tt('signUpButton'),
        },
      }}
    >
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12}>
          <FormikTextField
            name="email"
            fullWidth
            InputProps={{
              autoFocus: true,
            }}
            label="E-Mail"
          />
        </Grid>
        <Grid item xs={12}>
          <FormikTextField
            name="password"
            as={PasswordField}
            fullWidth
            label={tt('passwordInput')}
          />
        </Grid>
        <Grid item xs={6} alignSelf="center">
          <Link
            component={RouteLink}
            to={routes.LOGIN_RECOVERY}
            color="secondary"
            underline="hover"
          >
            {t('forgotPasswordButton')}
          </Link>
        </Grid>
        <Grid item xs={6} textAlign="right">
          <LoadingButton
            loading={isSubmitting}
            variant="contained"
            size="large"
            loadingPosition={isSubmitting ? 'start' : undefined}
            startIcon={isSubmitting ? <SvgIcon /> : null}
            type="submit"
          >
            {tt('signInButton')}
          </LoadingButton>
        </Grid>
      </Grid>
    </SocialLayout>
  );
};

export default LoginForm;
