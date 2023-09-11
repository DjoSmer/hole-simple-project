import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import FacebookLogin, { LoginResponse } from '@greatsumini/react-facebook-login';
import { FACEBOOK_APP_ID } from '~/constant';
import { FacebookIcon } from './FacebookIcon';
import { FacebookButtonRoot } from './FacebookButtonRoot';
import { SocialAuth, SocialProfile, socialAuthType, SocialButtonProps } from 'ms/accounts/types';

const socialAuthData: SocialAuth = {
  id: 0,
  token: '',
  type: socialAuthType.FACEBOOK,
  url: '/authorize',
  name: 'facebook',
};

interface ProfileResponse {
  email: string;
  name: string;
  first_name: string;
  last_name: string;
  error: string | null;
}

export const FacebookButton: FC<SocialButtonProps> = ({ onSuccess, onFail }) => {
  const { t } = useTranslation('accounts/socialButtons');

  const handleProfileSuccess = (response: ProfileResponse | unknown) => {
    const {
      email,
      name = '',
      first_name = '',
      last_name = '',
      error = null,
    } = response as ProfileResponse;

    if (error) {
      return onFail({ code: 'FS1000', error });
    }

    const socialProfile: SocialProfile = {
      email,
      fullName: name,
      firstName: first_name,
      lastName: last_name,
    };

    onSuccess(socialProfile, socialAuthData);
  };

  const handleSuccess = (response: LoginResponse['authResponse']) => {
    if (!response) return;
    socialAuthData.id = response.userID;
    socialAuthData.token = response.accessToken;
  };

  const handleFail = (error: { status: string }) => {
    onFail({ code: 'FS1000', error: error.status });
  };

  return (
    <FacebookLogin
      appId={FACEBOOK_APP_ID}
      fields="name,email,first_name,last_name"
      onSuccess={handleSuccess}
      onFail={handleFail}
      onProfileSuccess={handleProfileSuccess}
      render={({ onClick }) => (
        <FacebookButtonRoot
          fullWidth
          variant="outlined"
          startIcon={<FacebookIcon />}
          size="large"
          onClick={onClick}
        >
          {t('signInFacebookButton')}
        </FacebookButtonRoot>
      )}
    />
  );
};
