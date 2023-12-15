/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from "axios";

import { authApi } from "@api/auth/auth.api";

import { clearAuthenticate, setAuthenticate } from "./auth";
import { getBaseApi } from "../config";

export default class AxiosBuilder {
  options: AxiosRequestConfig;

  private errorInterceptors: any[] = [];

  constructor() {
    this.options = {
      withCredentials: true,
      headers: {
        Pragma: "no-cache",
        "Cache-Control": "no-cache",
        Expires: "0",
        Lang: "ru",
        "Content-Type": "application/json"
      }
    };
  }

  addNotFoundErrorHandler(): AxiosBuilder {
    this.errorInterceptors.push((error: any) => {
      if (error.response && error.response.status === 404) {
        return Promise.reject(new Error(error.response.data));
      }
      return Promise.resolve(error);
    });
    return this;
  }

  addBusinessErrorHandler(): AxiosBuilder {
    this.errorInterceptors.push((error: any) => {
      if (error.response && error.response.status === 500) {
        return Promise.reject(error.response.data);
      }
      return Promise.resolve(error);
    });
    return this;
  }

  addUnauthorizedHandler(): AxiosBuilder {
    this.errorInterceptors.push(async (error: any) => {
      if (error.response && error.response.status === 401) {
        try {
          const { access_token } = await authApi.refresh();
          setAuthenticate(access_token, localStorage.getItem("role") ?? "");
          this.options.headers = this.options.headers || {};
          this.options.headers.Authorization = `Bearer ${access_token}`;
          const config = { ...error.config, headers: this.options.headers };
          return axios(config);
        } catch (err) {
          clearAuthenticate();
          return Promise.reject(error.response.data);
        }
      }
      return Promise.resolve(error);
    });
    return this;
  }

  add400x(): AxiosBuilder {
    this.errorInterceptors.push((error: any) => {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500
      ) {
        return Promise.reject(new Error(error.response.data));
      }
      return Promise.resolve(error);
    });
    return this;
  }

  build(): AxiosInstance {
    const axiosInstance = axios.create(this.options);

    this.add400x().addInterceptors(axiosInstance);

    axiosInstance.interceptors.request.use((config) => {
      const { headers } = config;
      return {
        ...config,
        baseURL: getBaseApi(),
        ...headers
      };
    });
    return axiosInstance;
  }

  private addInterceptors(axiosInstance: AxiosInstance): AxiosBuilder {
    this.errorInterceptors.push(AxiosBuilder.reject);
    axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        return this.errors(error);
      }
    );
    return this;
  }

  private errors(error: any) {
    return new Promise((resolve, reject) => {
      return this.errorInterceptors
        .reduce((_, current) => {
          return current(error).catch((err: any) => {
            return reject(err);
          });
        }, Promise.resolve())
        .then(() => resolve(error));
    });
  }

  private static reject(error: any) {
    return Promise.reject(error);
  }
}

export function authInterceptor(
  config: InternalAxiosRequestConfig<any>
): InternalAxiosRequestConfig<any> {
  config.headers.authorization = `Bearer ${localStorage.getItem(
    "access_token"
  )}`;
  return config;
}

export function unpack<T>(response: AxiosResponse<T>): T {
  return response.data;
}
