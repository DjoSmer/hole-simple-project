import { useFormikSelector } from 'formik2nd';
import { SuccessPage, WarningPage } from 'ms/accounts/components';
import { useTranslation } from 'react-i18next';
import { RecoveryForm } from './RecoveryForm';

export const RecoveryRoutes = () => {
  const { t } = useTranslation('accounts/recoveryPage');
  const status = useFormikSelector(({ status }) => status);
  const errors = useFormikSelector(({ errors }) => errors);

  let component;

  if (status === 'success') {
    component = (
      <SuccessPage heading={t('successPageHeadingText')} message={t('successPageMessageText')} />
    );
  } else if (status === 'error') {
    component = (
      <WarningPage heading={t('recoveryHeadingText')} message={errors.message as string} />
    );
  } else {
    component = <RecoveryForm />;
  }

  return component;
};
