import { Response } from '~/types';
import { ChangePasswordData, LoginData, ManualRegisterData } from './data';

export type { Response };

export interface SignUpResponse<T = ManualRegisterData> extends Response<T> {
  needVerify?: boolean;
  needPassword?: boolean;
}

export interface SignInResponse<T = LoginData> extends Response<T> {
  jwt: string;
  expires: number;
  needVerify?: boolean;
  needPassword?: boolean;
}

export interface ChangePasswordValidateResponse extends Response<ChangePasswordData> {
  email: string;
}
