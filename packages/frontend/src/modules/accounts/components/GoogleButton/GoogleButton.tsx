import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  useGoogleLogin,
} from 'react-google-login';
import { Box, CircularProgress } from '@mui/material';
import { socialAuthType, SocialButtonProps } from 'ms/accounts/types';
import { GOOGLE_CLIENT_ID } from '~/constant';
import { GoogleButtonRoot } from './GoogleButtonRoot';
import { GoogleIcon } from './GoogleIcon';

//TODO Google auth don't work now. They create a new version.
export const GoogleButton: FC<SocialButtonProps> = ({ onSuccess, onFail }) => {
  const { t } = useTranslation('accounts/socialButtons');

  const handleSuccess = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    const googleLoginResponse = response as GoogleLoginResponse;

    if (!googleLoginResponse.googleId) {
      return onFail({ code: 'GB1000', error: response });
    }

    const {
      googleId,
      tokenId,
      profileObj: { email, name, givenName, familyName },
    } = googleLoginResponse;

    onSuccess(
      {
        email,
        fullName: name,
        firstName: givenName,
        lastName: familyName,
      },
      {
        id: googleId,
        token: tokenId,
        type: socialAuthType.GOOGLE,
        url: '/authorize',
        name: 'google',
      }
    );
  };

  const handleFailure = (error: any) => {
    onFail({ code: 'GB1000', error });
  };

  const { signIn, loaded } = useGoogleLogin({
    clientId: GOOGLE_CLIENT_ID,
    onSuccess: handleSuccess,
    onFailure: handleFailure,
  });

  return (
    <GoogleButtonRoot
      variant="outlined"
      startIcon={<GoogleIcon />}
      fullWidth
      size="large"
      disableElevation
      onClick={signIn}
      endIcon={
        !loaded ? (
          <Box sx={{ position: 'absolute', top: 11, right: 25 }}>
            <CircularProgress size={20} />
          </Box>
        ) : undefined
      }
    >
      {t('signInGoogleButton')}
    </GoogleButtonRoot>
  );
};
