import { useMemo, useRef } from 'react';
import { Form, Formik } from 'formik2nd';
import { ChangePasswordData } from 'ms/accounts/types';
import { ReCAPTCHA, ReCaptcha } from 'ms/accounts/components';
import { accountsAPI } from 'ms/accounts/services/api';
import { ChangePasswordValidate } from './ChangePasswordValidate';

export const ChangePasswordPage = () => {
  const captchaRef = useRef<ReCAPTCHA>(null);

  const initialValues = useMemo<ChangePasswordData>(() => {
    return {
      email: '',
      password: '',
      passwordConfirm: '',
      recaptchaToken: '',
      code: '',
    };
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      initialStatus={'validate'}
      onSubmit={async (changePasswordData, { setErrors, setStatus }) => {
        if (!captchaRef.current) {
          return;
        }

        const recaptchaToken = (await captchaRef.current.executeAsync()) || '';

        const {
          data: { success, errors = {} },
        } = await accountsAPI.changePassword({ ...changePasswordData, recaptchaToken });

        if (success) {
          setStatus('done');
        } else {
          setErrors(errors);
        }
      }}
    >
      <ReCaptcha ref={captchaRef} />
      <Form>
        <ChangePasswordValidate />
      </Form>
    </Formik>
  );
};
