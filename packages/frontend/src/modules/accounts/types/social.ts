import { RegisterData } from './data';

export enum socialAuthType {
  FACEBOOK = 'profileFacebook',
  GOOGLE = 'profileGoogle',
  MICROSOFT = 'profileMicrosoft',
}

export interface SocialButtonProps {
  onSuccess: (socialProfile: SocialProfile, socialAuth: SocialAuth) => void;
  onFail: (error: SocialError) => void;
}

export interface SocialAuth {
  id: number | string;
  type: socialAuthType;
  token: string;
  url: string;
  name: string;
}

export interface SocialProfile {
  email: string;
  fullName: string;
  firstName: string;
  lastName: string;
}

export type SocialRegister = RegisterData & SocialProfile;

export interface SocialError {
  code: string;
  error: any;
}

export interface SocialData {
  socialProfile: SocialProfile;
  socialAuth: SocialAuth;
}

export interface SocialInRequestData {
  userId: SocialAuth['id'];
  accessToken: string;
}

export type SocialUpRequestData = SocialProfile &
  Pick<SocialAuth, 'token'> & {
    [key in socialAuthType]?: SocialAuth['id'];
  };
