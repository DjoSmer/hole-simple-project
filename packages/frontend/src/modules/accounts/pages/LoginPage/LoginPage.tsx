import React, { useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReCaptcha, ReCAPTCHA } from 'ms/accounts/components';
import authService from '~/services/authService';
import { LoginData, routes } from 'ms/accounts/types';
import { accountsAPI } from 'ms/accounts/services/api';
import LoginForm from './LoginForm';
import { Form, Formik } from 'formik2nd';

export const LoginPage = () => {
  const captchaRef = useRef<ReCAPTCHA>(null);

  const initialValues = useMemo<LoginData>(
    () => ({
      email: '',
      password: '',
      recaptchaToken: '',
    }),
    []
  );

  const navigate = useNavigate();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { setErrors }) => {
        const recaptchaToken = (await captchaRef.current?.executeAsync()) || '';
        const loginData = { ...values, recaptchaToken };

        const {
          data: { success, errors, needVerify },
        } = await accountsAPI.signIn(loginData);

        if (success) {
          authService.login();
        } else if (errors) {
          if (needVerify) {
            navigate(`../${routes.CONFIRM_EMAIL}`, {
              state: {
                type: 'email',
                value: loginData.email,
              },
            });
          } else {
            setErrors(errors);
          }
        }
      }}
    >
      <Form>
        <LoginForm />
      </Form>
      <ReCaptcha ref={captchaRef} />
    </Formik>
  );
};

export default LoginPage;
