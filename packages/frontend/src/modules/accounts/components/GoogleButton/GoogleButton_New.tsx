import React, { FC, useEffect } from 'react';
import { GOOGLE_CLIENT_ID } from '~/constant';
import { socialAuthType, SocialButtonProps } from 'ms/accounts/types';

const GoogleButton: FC<SocialButtonProps> = ({ onSuccess, onFail }) => {
  const handleSuccess = (response: any) => {
    const googleLoginResponse = response;

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
        url: '/authorizeGoogle',
        name: 'Google',
      }
    );
  };

  const handleFailure = (error: any) => {
    onFail({ code: 'GB1000', error });
  };

  useEffect(() => {
    // @ts-ignore
    window.googleCallback = (...args) => {
      console.log(args);
    };
    // @ts-ignore
    if (!window.gapi) {
      // @ts-ignore
      window.gapi = {};
      const script = document.createElement('script');
      script.async = true;
      script.defer = true;
      script.src = 'https://accounts.google.com/gsi/client';
      script.onload = () => {
        console.log('google auth loaded');
        // @ts-ignore
        window.google.accounts.id.initialize({
          client_id: 'YOUR_GOOGLE_CLIENT_ID',
          callback: handleSuccess,
        });
      };
      document.body.appendChild(script);
    }
  }, []);

  return (
    <>
      <div
        id="g_id_onload"
        data-client_id={GOOGLE_CLIENT_ID}
        data-context="signin"
        data-ux_mode="popup"
        data-callback="googleCallback"
        data-auto_prompt="false"
      ></div>

      <div
        className="g_id_signin"
        data-type="icon"
        data-shape="square"
        data-theme="outline"
        data-text="continue_with"
        data-size="large"
      ></div>
    </>
  );
};

export default GoogleButton;
