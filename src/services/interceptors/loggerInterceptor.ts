// src/core/api/interceptors/loggerInterceptor.ts
import type { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { Env } from '../../config/env';

export function loggerRequestInterceptor(
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig {
  if (Env.IS_DEV) {
    console.log(`[API ▶] ${config.method?.toUpperCase()} ${config.url}`, {
      params:  config.params,
      data:    config.data,
    });
  }
  return config;
}

export function loggerResponseInterceptor(response: AxiosResponse): AxiosResponse {
  if (Env.IS_DEV) {
    console.log(`[API ✓] ${response.status} ${response.config.url}`);
  }
  return response;
}

export function loggerErrorInterceptor(error: AxiosError): Promise<never> {
  if (Env.IS_DEV) {
    console.error(`[API ✗] ${error.response?.status ?? 'NETWORK'} ${error.config?.url}`, error.message);
  }
  return Promise.reject(error);
}

