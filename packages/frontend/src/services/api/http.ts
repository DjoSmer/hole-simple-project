import i18n from 'i18next';
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from 'axios';
import authService from '~/services/authService';

enum StatusCode {
  Unauthorized = 401,
  Forbidden = 403,
  TooManyRequests = 429,
  InternalServerError = 500,
}

export interface HttpHeaders {
  [k: string]: string;
}

const headers: Readonly<AxiosRequestHeaders> = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
};

export const getHttpHeaders = (tokenCheck: boolean) => {
  const httpHeaders: HttpHeaders = {};

  const token = authService.getToken();
  if (token) {
    httpHeaders['Authorization'] = `Bearer ${token}`;
  } else if (tokenCheck) {
    // window.location.href = `${ACCOUNTS_URL}/redirect=${window.location.href}`;
  }

  httpHeaders['X-Language'] = i18n.language;

  return httpHeaders;
};

const injectHeaders =
  (tokenCheck: boolean) =>
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    if (!config.headers) config.headers = {};
    try {
      const httpHeaders = getHttpHeaders(tokenCheck);
      return { ...config, headers: { ...config.headers, ...httpHeaders } };
    } catch (error: any) {
      throw new Error(error);
    }
  };

const handleError = (error: any) => {
  const { status = null } = error || {};

  switch (status) {
    case StatusCode.InternalServerError: {
      break;
    }
    case StatusCode.Forbidden: {
      // Handle Forbidden
      break;
    }
    case StatusCode.Unauthorized: {
      // Handle Unauthorized
      break;
    }
    case StatusCode.TooManyRequests: {
      // Handle TooManyRequests
      break;
    }
  }

  console.log('handleError', error);

  return Promise.reject(error);
};

export const getCancelTokenSource = () => {
  return axios.CancelToken.source();
};

export class Http {
  private http: AxiosInstance;

  constructor(baseURL: string, tokenCheck: boolean = false) {
    const http = axios.create({
      baseURL,
      headers,
      //withCredentials: true,
    });

    http.interceptors.request.use(injectHeaders(tokenCheck), (error) => Promise.reject(error));

    http.interceptors.response.use(
      (response) => response,
      (error) => {
        const { response } = error;
        return handleError(response);
      }
    );

    this.http = http;
    return this;
  }

  request<T = any, D = any>(config: AxiosRequestConfig<D>) {
    return this.http.request<T, AxiosResponse<T>, D>(config);
  }

  get<T = any, D = any>(url: string, config?: AxiosRequestConfig<D>) {
    return this.http.get<T, AxiosResponse<T>>(url, config);
  }

  delete<T = any, D = any>(url: string, config?: AxiosRequestConfig<D>) {
    return this.http.delete<T, AxiosResponse<T>>(url, config);
  }

  head<T = any, D = any>(url: string, config?: AxiosRequestConfig<D>) {
    return this.http.head<T, AxiosResponse<T>>(url, config);
  }

  options<T = any, D = any>(url: string, config?: AxiosRequestConfig<D>) {
    return this.http.options<T, AxiosResponse<T>>(url, config);
  }

  post<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>) {
    return this.http.post<T, AxiosResponse<T>, D>(url, data, config);
  }

  put<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>) {
    return this.http.put<T, AxiosResponse<T>, D>(url, data, config);
  }

  patch<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>) {
    return this.http.patch<T, AxiosResponse<T>, D>(url, data, config);
  }

  cancelToken() {
    return {
      cancelToken: getCancelTokenSource().token,
    };
  }
}
