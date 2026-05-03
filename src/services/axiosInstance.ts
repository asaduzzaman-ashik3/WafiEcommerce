// src/core/api/axiosInstance.ts
import axios from 'axios';
import { AppConfig } from '../config/supabase-config';
import {
  authRequestInterceptor,
  authErrorInterceptor,
  authResponseInterceptor,
} from './interceptors/authInterceptor';
import {
  loggerRequestInterceptor,
  loggerResponseInterceptor,
  loggerErrorInterceptor,
} from './interceptors/loggerInterceptor';

const axiosInstance = axios.create({
  baseURL: AppConfig.api.baseUrl,
  timeout: AppConfig.api.timeout,
  headers: {
    'Content-Type': 'application/json',
    Accept:         'application/json',
  },
});

// Logger (runs first on request, last on response)
axiosInstance.interceptors.request.use(loggerRequestInterceptor);
axiosInstance.interceptors.response.use(loggerResponseInterceptor, loggerErrorInterceptor);

// Auth token injection
axiosInstance.interceptors.request.use(authRequestInterceptor);
axiosInstance.interceptors.response.use(authResponseInterceptor, authErrorInterceptor);

export default axiosInstance;

