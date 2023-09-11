import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LoadingButton } from '@mui/lab';
import { useFormikSelector } from 'formik2nd';
import { Box, Link, Grid, SvgIcon } from '@mui/material';
import { PasswordField, FormikTextField } from '~/components';
import { CenterLayout } from 'ms/accounts/layouts';
import { routes } from 'ms/accounts/types';
import { ActionConfirmEmail } from './ConfirmEmailValidate';

export interface ConfirmEmailFormProps {
  action: ActionConfirmEmail;
  onClickSendCodeAgain: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const ConfirmEmailForm: FC<ConfirmEmailFormProps> = ({ action, onClickSendCodeAgain }) => {
  const isSubmitting = useFormikSelector(({ isSubmitting }) => isSubmitting);
  const { t } = useTranslation('accounts/confirmEmailPage');
  const { t: tt } = useTranslation('accounts/accounts');
  const [visiblePassword, setVisiblePassword] = useState(false);

  return (
    <CenterLayout
      heading={t('emailConfirmationText')}
      headerProps={{
        right: {
          to: routes.LOGIN,
          label: tt('signInButton'),
        },
      }}
    >
      <Grid container spacing={3} justifyContent="center">
        {action === 'email-password' && (
          <Grid item xs={12} lg={6}>
            <FormikTextField
              name="password"
              as={PasswordField}
              fullWidth
              required
              label={tt('passwordInput')}
              visiblePassword={visiblePassword}
              onVisiblePassword={setVisiblePassword}
            />
          </Grid>
        )}
        {action === 'email-password' && (
          <Grid item xs={12} lg={6}>
            <FormikTextField
              name="passwordConfirm"
              as={PasswordField}
              fullWidth
              required
              label={tt('passwordConfirmInput')}
              visiblePassword={visiblePassword}
              onVisiblePassword={setVisiblePassword}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <FormikTextField
            name="code"
            fullWidth
            InputProps={{
              autoFocus: true,
            }}
            label={t('codeInput')}
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
            {t('confirmEmailButton')}
          </LoadingButton>
        </Grid>
        <Grid item xs={12} textAlign="center">
          <Link
            component={Box}
            underline="hover"
            color="secondary"
            onClick={onClickSendCodeAgain}
            sx={{ cursor: 'pointer' }}
          >
            {t('sendCodeAgainButton')}
          </Link>
        </Grid>
      </Grid>
    </CenterLayout>
  );
};
