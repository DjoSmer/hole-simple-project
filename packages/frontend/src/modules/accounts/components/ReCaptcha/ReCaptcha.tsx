import React, { forwardRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { RECAPTCHA_KEY } from '~/constant';

interface ReCaptchaProps {
  onChange?: (token: string) => void;
  verifyCallback?: (token: string) => void;
}
export type { ReCAPTCHA };

export const ReCaptcha = forwardRef<ReCAPTCHA, ReCaptchaProps>(
  ({ verifyCallback, onChange }, ref) => {
    const handleChange = (token: string | null) => {
      const cb = verifyCallback || onChange;
      if (cb) cb(token as string);
    };

    return (
      //@ts-ignore sometimes show an error, because @types/react-google-recaptcha is an old version and in conflict with @types/react
      <ReCAPTCHA
        ref={ref || undefined}
        size="invisible"
        sitekey={RECAPTCHA_KEY}
        onChange={onChange ? handleChange : undefined}
        badge="bottomright"
      />
    );
  }
);
