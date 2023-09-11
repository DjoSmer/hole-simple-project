import { useMemo, useRef } from 'react';
import { Form, Formik } from 'formik2nd';
import { AxiosResponse } from 'axios';
import { RecoveryData } from 'ms/accounts/types';
import { ReCAPTCHA, ReCaptcha } from 'ms/accounts/components';
import { accountsAPI } from 'ms/accounts/services/api';
import { RecoveryRoutes } from './RecoveryRoutes';

export const RecoveryPage = () => {
  const captchaRef = useRef<ReCAPTCHA>(null);

  const initialValues = useMemo<RecoveryData>(() => {
    return {
      email: '',
      recaptchaToken: '',
    };
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      initialStatus={'recovery'}
      onSubmit={async (recoveryData, { setErrors, setStatus }) => {
        if (!captchaRef.current) {
          return;
        }

        const recaptchaToken = (await captchaRef.current.executeAsync()) || '';

        try {
          const {
            data: { success, errors = {} },
          } = await accountsAPI.requestResetPassword({ ...recoveryData, recaptchaToken });

          if (success) {
            setStatus('success');
          } else {
            setStatus('error');
            setErrors(errors);
          }
        } catch (e) {
          if ((e as AxiosResponse).data) {
            const data = (e as AxiosResponse).data;
            setStatus('error');
            setErrors(data.errors);
          }
        }
      }}
    >
      <ReCaptcha ref={captchaRef} />
      <Form>
        <RecoveryRoutes />
      </Form>
    </Formik>
  );
};
