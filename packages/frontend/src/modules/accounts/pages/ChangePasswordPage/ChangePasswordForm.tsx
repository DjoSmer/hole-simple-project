import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormikSelector } from 'formik2nd';
import { LoadingButton } from '@mui/lab';
import { Grid, SvgIcon } from '@mui/material';
import { PasswordField, FormikTextField } from '~/components';
import { CenterLayout } from 'ms/accounts/layouts';
import { routes } from 'ms/accounts/types';

export const ChangePasswordForm = () => {
  const isSubmitting = useFormikSelector(({ isSubmitting }) => isSubmitting);
  const { t } = useTranslation('accounts/changePasswordPage');
  const { t: tt } = useTranslation('accounts/accounts');
  const [visiblePassword, setVisiblePassword] = useState(false);

  return (
    <CenterLayout
      heading={t('changePasswordHeadingText')}
      headerProps={{
        right: {
          to: routes.LOGIN,
          label: tt('signInButton'),
        },
      }}
    >
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12}>
          <FormikTextField
            name="password"
            as={PasswordField}
            fullWidth
            InputProps={{
              autoFocus: true,
            }}
            label={tt('passwordInput')}
            visiblePassword={visiblePassword}
            onVisiblePassword={setVisiblePassword}
          />
        </Grid>
        <Grid item xs={12}>
          <FormikTextField
            name="passwordConfirm"
            as={PasswordField}
            fullWidth
            label={tt('passwordConfirmInput')}
            visiblePassword={visiblePassword}
            onVisiblePassword={setVisiblePassword}
          />
        </Grid>
        <Grid item xs={12}>
          <LoadingButton
            fullWidth
            loading={isSubmitting}
            variant="contained"
            size="large"
            loadingPosition={isSubmitting ? 'start' : undefined}
            startIcon={isSubmitting ? <SvgIcon /> : null}
            type="submit"
          >
            {t('changePasswordButton')}
          </LoadingButton>
        </Grid>
      </Grid>
    </CenterLayout>
  );
};
