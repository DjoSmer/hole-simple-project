import { checkENV } from '~/utils';

export const APP_DEBUG: boolean = process.env.NODE_ENV !== 'production';

export const COOKIE_DOMAIN = checkENV('REACT_APP_COOKIE_DOMAIN');
export const ACCOUNTS_URL = checkENV('REACT_APP_ACCOUNTS_URL');
export const ACCOUNTS_LOGOUT_URL = `${ACCOUNTS_URL}/logout`;
export const DASHBOARD_URL = checkENV('REACT_APP_DASHBOARD_URL');

export const API_HOST_URL = checkENV('REACT_APP_API_HOST_URL');
export const API_ACCOUNTS_URL = API_HOST_URL + checkENV('REACT_APP_API_ACCOUNTS_URL');
export const API_DICTIONARY_URL = API_HOST_URL + checkENV('REACT_APP_API_DICTIONARY_URL');

export const RECAPTCHA_KEY = checkENV('REACT_APP_RECAPTCHA_KEY');
export const FACEBOOK_APP_ID = checkENV('REACT_APP_FACEBOOK_APP_ID');
export const GOOGLE_CLIENT_ID = checkENV('REACT_APP_GOOGLE_CLIENT_ID');
export const MICROSOFT_CLIENT_ID = checkENV('REACT_APP_MICROSOFT_CLIENT_ID');
