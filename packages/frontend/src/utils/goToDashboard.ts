import { DASHBOARD_URL } from '../constant';

export const goToDashboard = (prefix?: string) => {
  window.location.href = getDashboardHref(prefix);
};

export const getDashboardHref = (prefix?: string) => {
  return DASHBOARD_URL + '/' + (prefix || '');
};
