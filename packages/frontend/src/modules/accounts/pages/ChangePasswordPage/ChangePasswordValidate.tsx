import { useLayoutEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFormikContext, useFormikSelector } from 'formik2nd';
import { AxiosResponse } from 'axios';
import { ChangePasswordData, routes } from 'ms/accounts/types';
import { accountsAPI } from 'ms/accounts/services/api';
import { SuccessPage, WarningPage } from 'ms/accounts/components';
import { ChangePasswordForm } from './ChangePasswordForm';

export type ActionChangePassword = 'validate' | 'valid' | 'invalid' | 'done';

export const ChangePasswordValidate = () => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const params = useParams();
  const { setValues, initialValues, setStatus } = useFormikContext<ChangePasswordData>();
  const status = useFormikSelector<ChangePasswordData, ActionChangePassword>(
    ({ status }) => status
  );
  const { t } = useTranslation(['accounts/changePasswordPage']);
  const { t: tt } = useTranslation(['accounts/accounts']);

  useLayoutEffect(() => {
    const code = params.token as string;

    if (!code) {
      navigate(`../${routes.LOGIN}`);
      return;
    }

    const tokenValidate = async () => {
      try {
        const {
          data: { success, email, errors = {} },
        } = await accountsAPI.changePasswordTokenValidate(code);

        setLoaded(true);

        if (success) {
          setStatus('valid');
          setValues({ ...initialValues, email, code });
        } else {
          setStatus('invalid');
          setError(errors?.code || '');
        }
      } catch (e) {
        if ((e as AxiosResponse).data) {
          const data = (e as AxiosResponse).data;
          setStatus('invalid');
          setError(data.errors.message || '');
        }
      }
    };

    tokenValidate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let component;

  if (status === 'validate') {
    component = (
      <SuccessPage
        heading={tt('validatePageHeadingText')}
        message={tt('validatePageMessageText')}
        loading={!loaded}
      />
    );
  } else if (status === 'valid') {
    component = <ChangePasswordForm />;
  } else if (status === 'done') {
    component = (
      <SuccessPage
        heading={t('successPageHeadingText')}
        //message={t('successPageMessageText')}
      />
    );
  } else {
    component = <WarningPage heading={t('changePasswordHeadingText')} message={error} />;
  }

  return component;
};
