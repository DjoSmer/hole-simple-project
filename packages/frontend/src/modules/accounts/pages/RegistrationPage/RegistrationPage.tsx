import { useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik2nd';
import { ManualRegisterData, routes } from 'ms/accounts/types';
import RegistrationForm from './RegistrationForm';
import { accountsAPI } from 'ms/accounts/services/api';
import { ReCAPTCHA, ReCaptcha } from 'ms/accounts/components';

export const RegistrationPage = () => {
  const captchaRef = useRef<ReCAPTCHA>(null);
  const navigate = useNavigate();
  const initialValues = useMemo<ManualRegisterData>(
    () => ({
      firstName: '',
      lastName: '',
      email: '',
      countryAlpha2: '',
      password: '',
      passwordConfirm: '',
      accept: true,
      subscribeNews: false,
      recaptchaToken: '',
    }),
    []
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { setErrors }) => {
        const recaptchaToken = (await captchaRef.current?.executeAsync()) || '';

        const {
          data: { success, needVerify, errors },
        } = await accountsAPI.signUp({ ...values, recaptchaToken });

        if (success) {
          if (needVerify) {
            navigate(`../${routes.CONFIRM_EMAIL}`, {
              state: {
                type: 'email',
                value: values.email,
              },
            });
          } else {
            navigate(`../${routes.LOGIN}`);
          }
        }
        if (errors) {
          if (captchaRef.current) captchaRef.current.reset();
          setErrors(errors);
        }
      }}
    >
      <Form>
        <RegistrationForm />
      </Form>
      <ReCaptcha ref={captchaRef} />
    </Formik>
  );
};
