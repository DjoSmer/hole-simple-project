import { FC, RefObject, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFormikContext } from 'formik2nd';
import { useSnackbar } from 'notistack';
import { ConfirmEmailData, routes } from 'ms/accounts/types';
import { accountsAPI } from 'ms/accounts/services/api';
import { ReCAPTCHA, SuccessPage, WarningPage } from 'ms/accounts/components';
import { ConfirmEmailForm } from './ConfirmEmailForm';

interface ConfirmEmailValidateProps {
  captchaRef: RefObject<ReCAPTCHA>;
}

export type ActionConfirmEmail =
  | 'validate'
  | 'invalid'
  | 'activated'
  | 'active'
  | 'email'
  | 'email-password';

export const ConfirmEmailValidate: FC<ConfirmEmailValidateProps> = ({ captchaRef }) => {
  const [action, setAction] = useState<ActionConfirmEmail>('validate');
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  const { submitForm, setValues, initialValues, getState, setSubmitting } =
    useFormikContext<ConfirmEmailData>();
  const { t } = useTranslation(['accounts/confirmEmailPage']);
  const { t: tt } = useTranslation(['accounts/accounts']);
  const { enqueueSnackbar } = useSnackbar();

  useLayoutEffect(() => {
    if (!initialValues.type || !initialValues.value) {
      navigate(`../${routes.LOGIN}`);
      return;
    }

    const confirmEmailValidate = async () => {
      if (!captchaRef.current) {
        return;
      }

      const recaptchaToken = (await captchaRef.current.executeAsync()) || '';
      const confirmData = { ...initialValues, recaptchaToken };
      const {
        data: { success, needVerify, needPassword },
      } = await accountsAPI.confirmEmailValidate(confirmData);

      if (success) {
        const action = needVerify ? (needPassword ? 'email-password' : 'email') : 'activated';
        setAction(action);

        setValues(confirmData);
        if (confirmData.code && action === 'email') {
          await submitForm();
        }
      }

      setLoaded(true);
    };

    confirmEmailValidate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickSendCodeAgain = async () => {
    if (!captchaRef.current) {
      return;
    }

    setSubmitting(true);

    const recaptchaToken = (await captchaRef.current.executeAsync()) || '';
    const confirmData = getState().values;

    const {
      data: { success },
    } = await accountsAPI.confirmEmailSendCodeAgain({ ...confirmData, recaptchaToken });

    if (success) {
      enqueueSnackbar(t('sendCodeToEmailSuccessText'), { variant: 'success' });
    } else {
      enqueueSnackbar(t('sendCodeToEmailErrorText'), { variant: 'warning' });
    }

    setSubmitting(false);
  };

  let component;

  if (action === 'validate') {
    component = (
      <SuccessPage
        heading={tt('validatePageHeadingText')}
        message={tt('validatePageMessageText')}
        loading={!loaded}
      />
    );
  } else if (action === 'email' || action === 'email-password') {
    component = (
      <ConfirmEmailForm action={action} onClickSendCodeAgain={handleClickSendCodeAgain} />
    );
  } else if (action === 'activated' || action === 'active') {
    component = (
      <SuccessPage
        heading={t('successPageHeadingText')}
        message={t('successPageMessageText')}
        loading={action === 'active'}
      />
    );
  } else {
    component = (
      <WarningPage heading={t('warningPageHeadingText')} message={t('warningPageMessageText')} />
    );
  }

  return component;
};
