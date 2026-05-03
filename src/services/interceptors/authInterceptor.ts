// src/core/api/interceptors/authInterceptor.ts
import type { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

/**
 * Attaches the stored Bearer token to every outgoing request.
 * Swap `getToken()` with your actual SecureStorage call.
 */
export async function authRequestInterceptor(
  config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> {
  try {
    // TODO: replace with SecureStorage.getToken()
    const token: string | null = null;
    if (token) {
      config.headers = config.headers ?? {};
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  } catch (_) {
    // silent — no token yet
  }
  return config;
}

export function authResponseInterceptor(response: AxiosResponse): AxiosResponse {
  return response;
}

export async function authErrorInterceptor(error: AxiosError): Promise<never> {
  if (error.response?.status === 401) {
    // TODO: trigger token refresh or logout
  }
  return Promise.reject(error);
}

