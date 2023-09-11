import React, { useState, FC } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import {
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  SvgIcon,
  Typography,
  Checkbox,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { CountryField, FormikField, FormikTextField } from '~/components';
import { MainLayout } from 'ms/accounts/layouts';
import { SocialAuth, routes, SocialRegister } from 'ms/accounts/types';
import { LoadingButton } from '@mui/lab';
import { useFormikSelector, useFormikContext } from 'formik2nd';

interface SocialRegistrationFormProps {
  socialAuth: SocialAuth;
}

const SocialRegistrationForm: FC<SocialRegistrationFormProps> = ({ socialAuth }) => {
  const { initialValues } = useFormikContext<SocialRegister>();
  const isSubmitting = useFormikSelector(({ isSubmitting }) => isSubmitting);
  const [isManualEdit, setIsManualEdit] = useState(initialValues.fullName === '');
  const disabledChangeEmail = initialValues.email !== '';

  const { t } = useTranslation('accounts/socialRegistrationPage');
  const { t: tt } = useTranslation('accounts/accounts');

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleManualEdit = () => {
    setIsManualEdit(!isManualEdit);
  };

  const renderEditFieldOff = () => (
    <Grid item xs={12}>
      <FormikTextField
        name="fullName"
        label={tt('fullNameInput')}
        disabled={true}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleManualEdit}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                <EditIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Grid>
  );

  const renderEditFieldOn = () => (
    <>
      <Grid item xs={12}>
        <FormikTextField
          name="firstName"
          InputProps={{
            autoFocus: true,
          }}
          label={tt('firstNameInput')}
        />
      </Grid>
      <Grid item xs={12}>
        <FormikTextField name="lastName" label={tt('lastNameInput')} />
      </Grid>
    </>
  );

  return (
    <MainLayout
      heading={tt('getStartedNowText')}
      headerProps={{
        right: {
          to: routes.LOGIN,
          label: tt('signInButton'),
        },
      }}
    >
      <Grid item xs={false} lg={3} />
      <Grid item xs={12} lg={5} sx={{ flexGrow: 1, alignSelf: 'center' }}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12}>
            <Typography>
              {t('weUseSocialProfileText', {
                name: socialAuth.name,
              })}
            </Typography>
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
            <FormikTextField
              name="email"
              InputProps={{
                autoFocus: !disabledChangeEmail,
              }}
              label="E-Mail"
            />
          </Grid>
          {isManualEdit ? renderEditFieldOn() : renderEditFieldOff()}
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
          *
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
              {tt('createAccountButton')}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={false} lg={3} />
    </MainLayout>
  );
};

export default SocialRegistrationForm;
