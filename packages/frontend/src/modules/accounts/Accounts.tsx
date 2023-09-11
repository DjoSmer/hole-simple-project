import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  LoginPage,
  SocialRegistrationPage,
  RegistrationPage,
  ConfirmEmailPage,
  LogoutPage,
  ChangePasswordPage,
  RecoveryPage,
} from './pages';
import { routes } from 'ms/accounts/types';
import { LinearProgress } from '@mui/material';

export const Accounts = () => {
  return (
    <Suspense fallback={<LinearProgress />}>
      <Routes>
        <Route path={routes.CONFIRM_EMAIL} element={<ConfirmEmailPage />} />
        <Route path={routes.REGISTRATION} element={<RegistrationPage />} />
        <Route path={routes.SOCIAL_REGISTRATION} element={<SocialRegistrationPage />} />
        <Route path={routes.CHANGE_PASSWORD_TOKEN} element={<ChangePasswordPage />} />
        <Route path={routes.LOGIN_RECOVERY} element={<RecoveryPage />} />
        <Route path={routes.LOGOUT} element={<LogoutPage />} />
        <Route index element={<LoginPage />} />
      </Routes>
    </Suspense>
  );
};
