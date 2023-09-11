import { API_ACCOUNTS_URL } from '~/constant';
import { Http } from '~/services/api';
import authService from '~/services/authService';
import {
  ManualRegisterData,
  SignUpResponse,
  LoginData,
  SignInResponse,
  SocialAuth,
  SocialUpRequestData,
  SocialInRequestData,
  ConfirmEmailData,
  Response,
  RecoveryData,
  ChangePasswordData,
  ChangePasswordValidateResponse,
  SocialRegister,
} from 'ms/accounts/types';

const http = new Http(API_ACCOUNTS_URL);

const signUp = async (registerData: ManualRegisterData) => {
  return await http.post<SignUpResponse>('/registration', {
    ...registerData,
  });
};

const signIn = async (requestData: LoginData) => {
  const response = await http.post<SignInResponse, LoginData>('/authorize', requestData);
  const { data } = response;

  if (data.success) {
    authService.setToken(data.jwt, data.expires);
  }

  return response;
};

const socialSignIn = async ({ url, id: userId, token: accessToken }: SocialAuth) => {
  const response = await http.post<SignInResponse<SocialInRequestData>, SocialInRequestData>(url, {
    userId,
    accessToken,
  });
  const { data } = response;

  if (data.success) {
    authService.setToken(data.jwt, data.expires);
  }

  return response;
};

const socialSignUp = async (socialProfile: SocialRegister, { id, token, type }: SocialAuth) => {
  return await http.post<SignUpResponse, SocialUpRequestData>('/registration', {
    [type]: id,
    token,
    ...socialProfile,
  });
};

const confirmEmailValidate = async ({ type, value, recaptchaToken }: ConfirmEmailData) => {
  return await http.patch<SignUpResponse<ConfirmEmailData>>('/confirm', {
    [type]: value,
    recaptchaToken,
  });
};

const confirmEmail = async ({ type, value, ...confirmData }: ConfirmEmailData) => {
  const response = await http.put<SignInResponse<ConfirmEmailData>>('/confirm', {
    [type]: value,
    ...confirmData,
  });
  const { data } = response;

  if (data.success) {
    authService.setToken(data.jwt, data.expires);
  }

  return response;
};

const confirmEmailSendCodeAgain = async ({ type, value, recaptchaToken }: ConfirmEmailData) => {
  return await http.post<Response<any>>('/confirm', { [type]: value, recaptchaToken });
};

const requestResetPassword = async (recoveryData: RecoveryData) => {
  return await http.post<Response<RecoveryData>, RecoveryData>('/recovery', { ...recoveryData });
};

const changePasswordTokenValidate = async (code: string) => {
  const params = {
    code,
  };
  return await http.get<ChangePasswordValidateResponse>('/recovery', { params });
};

const changePassword = async (changePasswordData: ChangePasswordData) => {
  return await http.put<Response<ChangePasswordData>, ChangePasswordData>(
    '/recovery',
    changePasswordData
  );
};

export const accountsAPI = {
  signUp,
  signIn,
  socialSignIn,
  socialSignUp,
  confirmEmailValidate,
  confirmEmail,
  confirmEmailSendCodeAgain,
  requestResetPassword,
  changePasswordTokenValidate,
  changePassword,
};

export default accountsAPI;
