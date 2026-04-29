// src/core/config/appConfig.ts
import { Env } from './env';

export const AppConfig = {
  api: {
    baseUrl:   Env.BASE_URL,
    timeout:   Env.TIMEOUT_MS,
  },
  app: {
    name:    'Wafi',
    version: Env.APP_VERSION,
  },
} as const;
