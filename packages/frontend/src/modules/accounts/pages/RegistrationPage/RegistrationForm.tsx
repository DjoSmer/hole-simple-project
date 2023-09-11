import React, { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useFormikSelector } from 'formik2nd';
import {
  FormControlLabel,
  FormGroup,
  Grid,
  Link,
  SvgIcon,
  Typography,
  Checkbox,
} from '@mui/material';
import { CountryField, PasswordField, FormikTextField, FormikField, TextField } from '~/components';
import { SocialLayout } from 'ms/accounts/layouts';
import { routes } from 'ms/accounts/types';
import { LoadingButton } from '@mui/lab';

const RegistrationForm = () => {
  const { t: tt } = useTranslation(['accounts/accounts']);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const isSubmitting = useFormikSelector(({ isSubmitting }) => isSubmitting);

  return (
    <SocialLayout
      heading={tt('getStartedNowText')}
      headerProps={{
        right: {
          to: routes.LOGIN,
          label: tt('signInButton'),
        },
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <FormikTextField
            name="firstName"
            as={TextField}
            fullWidth
            required
            InputProps={{
              autoFocus: true,
            }}
            label={tt('firstNameInput')}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <FormikTextField name="lastName" required fullWidth label={tt('lastNameInput')} />
        </Grid>
        <Grid item xs={12}>
          <CountryField
            name="countryAlpha2"
            textProps={{
              required: true,
              label: tt('countryInput', 'Land'),
              name: 'countryAlpha2',
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormikTextField name="email" type="email" fullWidth required label="E-Mail" />
        </Grid>
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
        <Grid item xs={12}>
          <FormGroup>
            <FormControlLabel
              control={<FormikField type="checkbox" name="subscribeNews" as={Checkbox} />}
              label={
                <Trans i18nKey="acceptSendMeNewsText" t={tt}>
                  I would like to receive news.
                </Trans>
              }
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            <Trans i18nKey="legalText" t={tt}>
              By creating an account, I agree to the{' '}
              <Link href="#" color="textPrimary">
                Terms of Use
              </Link>{' '}
              and{' '}
              <Link href="#" color="textPrimary">
                Privacy Policy
              </Link>
              .
            </Trans>
          </Typography>
        </Grid>
        <Grid item xs={12} textAlign="right">
          <LoadingButton
            loading={isSubmitting}
            variant="contained"
            size="large"
            loadingPosition={isSubmitting ? 'start' : undefined}
            startIcon={isSubmitting ? <SvgIcon /> : null}
            type="submit"
          >
            {tt('createAccountButton')}
          </LoadingButton>
        </Grid>
      </Grid>
    </SocialLayout>
  );
};

export default RegistrationForm;
