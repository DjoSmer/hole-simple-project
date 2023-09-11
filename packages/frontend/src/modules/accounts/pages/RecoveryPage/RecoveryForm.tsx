import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFormikSelector } from 'formik2nd';
import { LoadingButton } from '@mui/lab';
import { Grid, SvgIcon } from '@mui/material';
import { FormikTextField } from '~/components';
import { CenterLayout } from 'ms/accounts/layouts';
import { routes } from 'ms/accounts/types';

export const RecoveryForm = () => {
  const isSubmitting = useFormikSelector(({ isSubmitting }) => isSubmitting);
  const { t } = useTranslation('accounts/recoveryPage');
  const { t: tt } = useTranslation('accounts/accounts');

  return (
    <CenterLayout
      heading={t('recoveryHeadingText')}
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
            name="email"
            fullWidth
            InputProps={{
              autoFocus: true,
            }}
            label="E-Mail"
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
            {t('requestResetPasswordButton')}
          </LoadingButton>
        </Grid>
      </Grid>
    </CenterLayout>
  );
};
