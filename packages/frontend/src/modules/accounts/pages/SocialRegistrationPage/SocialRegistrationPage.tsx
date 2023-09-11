import { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik2nd';
import authService from '~/services/authService';
import { routes, SocialData, SocialRegister } from 'ms/accounts/types';
import { accountsAPI } from 'ms/accounts/services/api';
import SocialRegistrationForm from './SocialRegistrationForm';

export const SocialRegistrationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { socialProfile, socialAuth } = (location.state as SocialData) || {
    socialProfile: { fullName: 'asdasd', email: '' },
    socialAuth: { name: 'Test' },
  };

  const initialValues = useMemo<SocialRegister>(() => {
    const socialRegister = {
      fullName: '',
      firstName: '',
      lastName: '',
      email: '',
      countryAlpha2: '',
      subscribeNews: false,
      accept: true,
    };
    return {
      ...socialRegister,
      ...socialProfile,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!socialAuth) {
      navigate(`../${routes.LOGIN}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (socialProfile, { setErrors }) => {
        const {
          data: { success, needVerify, errors },
        } = await accountsAPI.socialSignUp(socialProfile, socialAuth);

        if (success) {
          if (needVerify) {
            navigate(`../${routes.CONFIRM_EMAIL}`, {
              state: {
                type: socialAuth.type,
                value: socialAuth.id,
              },
            });
          } else {
            const {
              data: { success },
            } = await accountsAPI.socialSignIn(socialAuth);
            if (success) {
              authService.login();
            }
          }
        } else if (errors) {
          setErrors(errors);
        }
      }}
    >
      <Form>
        <SocialRegistrationForm socialAuth={socialAuth} />
      </Form>
    </Formik>
  );
};
