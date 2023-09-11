import JSCookies from 'js-cookie';
import { ACCOUNTS_LOGOUT_URL, COOKIE_DOMAIN } from '~/constant';
import { goToDashboard } from '~/utils';

const cookies = JSCookies.withAttributes({ path: '/', domain: COOKIE_DOMAIN, secure: true });

const TOKEN_KEY = 'jwt';

const clearToken = (): void => {
  cookies.remove(TOKEN_KEY);
};

const getToken = () => {
  return cookies.get(TOKEN_KEY);
};

const setToken = (token: string = '', expires: number) => {
  const expiresDate = new Date(expires * 1000);
  cookies.set(TOKEN_KEY, token, { expires: expiresDate });
};

const isAuth = () => {
  return !!cookies.get(TOKEN_KEY);
};

const login = () => {
  goToDashboard();
};

const logout = () => {
  window.location.replace(ACCOUNTS_LOGOUT_URL);
};

const authService = {
  clearToken,
  getToken,
  setToken,
  isAuth,
  login,
  logout,
};

export default authService;
