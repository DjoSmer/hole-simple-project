import { useEffect } from 'react';
import authService from '~/services/authService';
import { useNavigate } from 'react-router-dom';
import { routes } from 'ms/accounts/types';

export const LogoutPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    authService.clearToken();
    navigate(`../${routes.LOGIN}`);
  });

  return null;
};
