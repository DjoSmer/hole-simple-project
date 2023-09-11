import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { SocialButtons } from './SocialButtons';
import { APP_DEBUG } from '~/constant';
import { accountsAPI } from 'ms/accounts/services/api';
import authService from '~/services/authService';
import { routes, SocialButtonProps } from 'ms/accounts/types';

export const SocialButtonsContainer: FC = () => {
  const navigate = useNavigate();

  const onSuccess: SocialButtonProps['onSuccess'] = async (socialProfile, socialAuth) => {
    const {
      data: { success, needVerify },
    } = await accountsAPI.socialSignIn(socialAuth);

    if (success) {
      authService.login();
    } else {
      if (needVerify) {
        navigate(`../${routes.CONFIRM_EMAIL}`, {
          state: {
            type: socialAuth.type,
            value: socialAuth.id,
          },
        });
      } else {
        navigate(
          `../${routes.SOCIAL_REGISTRATION.replace(
            ':socialName',
            socialAuth.name.toLocaleLowerCase()
          )}`,
          {
            state: {
              socialProfile,
              socialAuth,
            },
          }
        );
      }
    }
  };

  const onFail = (error: any) => {
    log('failed social login', error);
  };

  const log = (...args: any) => {
    if (APP_DEBUG) console.log('useSocialLogin', ...args);
  };

  return <SocialButtons onSuccess={onSuccess} onFail={onFail} />;
};
