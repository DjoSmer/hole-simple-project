export * from './social';
export { routes } from './routes';

export interface LoginData {
  email: string;
  password: string;
  recaptchaToken: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  accept: boolean;
  subscribeNews: boolean;
  countryAlpha2: string;
}

export interface ManualRegisterData extends RegisterData {
  password: string;
  passwordConfirm: string;
  recaptchaToken: string;
}

export interface ConfirmEmailData {
  type: string;
  value: string;
  code: string | number;
  password?: string;
  passwordConfirm?: string;
  recaptchaToken: string;
}

export interface RecoveryData {
  email: string;
  recaptchaToken: string;
}

export interface ChangePasswordData {
  email: string;
  password: string;
  passwordConfirm: string;
  recaptchaToken: string;
  code: string;
}
