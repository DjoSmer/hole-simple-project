import {
  PublicClientApplication,
  AuthenticationResult,
  AccountInfo,
  PopupRequest,
} from '@azure/msal-browser';
import { APP_DEBUG } from '~/constant';
import { MicrosoftConfig } from './MicrosoftConfig';

interface AuthenticationResultExpanded extends AuthenticationResult {
  idTokenClaims: {
    preferred_username: string;
  };
  profile?: ProfileResponse;
}

interface ProfileResponse {
  '@odata.context': string;
  displayName: string;
  surname: string;
  givenName: string;
  ageGroup: string;
  id: string;
  userPrincipalName: string;
  businessPhones: [];
  jobTitle: string | null;
  mail: string | null;
  mobilePhone: string | null;
  officeLocation: string | null;
  preferredLanguage: string | null;
}

export class AzureApi {
  private publicClient: PublicClientApplication = new PublicClientApplication(MicrosoftConfig);
  private account?: AccountInfo;
  private loginRequest?: PopupRequest;
  private graphApi = 'https://graph.microsoft.com/beta/me';

  constructor() {
    this.setRequestObjects();
  }

  private setRequestObjects(): void {
    this.loginRequest = {
      scopes: ['user.read'],
      prompt: 'select_account',
    };
  }

  async login(): Promise<AuthenticationResultExpanded> {
    const { publicClient, loginRequest } = this;
    try {
      const response = await publicClient.loginPopup(loginRequest);
      return this.getAccountData(response as AuthenticationResultExpanded);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  logout(account: AccountInfo) {
    return this.publicClient.logout({ account });
  }

  async getAccountData(
    response: AuthenticationResultExpanded
  ): Promise<AuthenticationResultExpanded> {
    if (response.account !== null) {
      this.account = response.account;
    } else {
      this.account = this.getAccount();
    }

    if (this.account) {
      const headers = new Headers();
      const bearer = `Bearer ${response.accessToken}`;
      headers.append('Authorization', bearer);

      const options = {
        method: 'GET',
        headers: headers,
      };

      try {
        const responseProfile = await fetch(this.graphApi, options);
        response.profile = await responseProfile.json();
      } catch (error: any) {
        throw new Error(error);
      }
    }

    return response;
  }

  private getAccount(): AccountInfo | undefined {
    this.log(`loadAuthModule`);
    const currentAccounts = this.publicClient.getAllAccounts();
    if (currentAccounts === null) {
      this.log('No accounts detected');
      return undefined;
    }

    if (currentAccounts.length > 1) {
      this.log('Multiple accounts detected, need to add choose account code.');
      return currentAccounts[0];
    } else if (currentAccounts.length === 1) {
      return currentAccounts[0];
    }
  }

  private log(message: any) {
    if (APP_DEBUG) this.log(message);
  }
}
