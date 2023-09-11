import { useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Form, Formik } from 'formik2nd';
import { ConfirmEmailData } from 'ms/accounts/types';
import { ReCAPTCHA, ReCaptcha } from 'ms/accounts/components';
import { accountsAPI } from 'ms/accounts/services/api';
import authService from '~/services/authService';
import { ConfirmEmailValidate } from './ConfirmEmailValidate';

export const ConfirmEmailPage = () => {
  const location = useLocation();
  const captchaRef = useRef<ReCAPTCHA>(null);

  const initialValues = useMemo<ConfirmEmailData>(() => {
    const confirmData = location.state as ConfirmEmailData;
    return {
      ...confirmData,
      recaptchaToken: '',
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (confirmData, { setErrors }) => {
        if (!captchaRef.current) {
          return;
        }

        const recaptchaToken = (await captchaRef.current.executeAsync()) || '';

        const {
          data: { success, errors = {} },
        } = await accountsAPI.confirmEmail({ ...confirmData, recaptchaToken });

        if (success) {
          authService.login();
        } else {
          setErrors(errors);
        }
      }}
    >
      <ReCaptcha ref={captchaRef} />
      <Form>
        <ConfirmEmailValidate captchaRef={captchaRef} />
      </Form>
    </Formik>
  );
};
