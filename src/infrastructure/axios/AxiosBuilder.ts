/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from "js-cookie";

import { refreshTokenRequest } from "@api/auth/auth.api";

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
        Lang: "ru"
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
        const refreshToken = Cookies.get("refreshToken");
        if (refreshToken) {
          try {
            const { access_token } = await refreshTokenRequest();
            setAuthenticate(access_token);
          } catch (err) {
            clearAuthenticate();
            return Promise.reject(error.response.data);
          }
        } else {
          clearAuthenticate();
          return Promise.reject(error.response.data);
        }
      }
      return Promise.resolve(error);
    });
    return this;
  }

  addAuthorizationInterceptor(): AxiosBuilder {
    this.errorInterceptors.push((error: any) => {
      return Promise.resolve(error);
    });
    const token = localStorage.getItem("access_token");
    if (token) {
      if (!this.options.headers) {
        this.options.headers = {};
      }
      this.options.headers.Authorization = `Bearer ${token}`;
    }
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

export function unpack<T>(response: AxiosResponse<T>): T {
  return response.data;
}
