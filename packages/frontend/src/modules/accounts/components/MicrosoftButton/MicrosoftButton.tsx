import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { SocialAuth, SocialProfile, socialAuthType, SocialButtonProps } from 'ms/accounts/types';
import { AzureApi } from './AzureApi';
import { MicrosoftIcon } from './MicrosoftIcon';
import { MicrosoftButtonRoot } from './MicrosoftButtonRoot';

const ua = window.navigator.userAgent;
const msie = ua.indexOf('MSIE ');
const msie11 = ua.indexOf('Trident/');
const isIE = msie > 0 || msie11 > 0;

export const MicrosoftButton: FC<SocialButtonProps> = ({ onSuccess, onFail }) => {
  const { t } = useTranslation('accounts/socialButtons');
  const azureApi: AzureApi = new AzureApi();

  const handleClick = async (): Promise<void> => {
    try {
      const { uniqueId, accessToken, idTokenClaims, profile } = await azureApi.login();
      const socialAuth: SocialAuth = {
        id: uniqueId,
        token: accessToken,
        type: socialAuthType.MICROSOFT,
        url: '/authorizeMicrosoft',
        name: 'Microsoft',
      };

      const socialProfile: SocialProfile = {
        email: idTokenClaims?.preferred_username || '',
        firstName: profile?.givenName || '',
        lastName: profile?.surname || '',
        fullName: profile?.displayName || '',
      };

      onSuccess(socialProfile, socialAuth);
    } catch (error) {
      onFail({ code: 'MS1000', error });
    }
  };

  if (isIE) {
    return null;
  }

  return (
    <MicrosoftButtonRoot
      variant="outlined"
      startIcon={<MicrosoftIcon />}
      fullWidth
      size="large"
      disableElevation
      onClick={handleClick}
    >
      {t('signInMicrosoftButton')}
    </MicrosoftButtonRoot>
  );
};
