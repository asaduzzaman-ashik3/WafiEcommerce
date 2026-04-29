// src/core/config/env.ts
// Replace values with react-native-dotenv when you add .env support

export const Env = {
  BASE_URL:    'https://api.wafi.app/v1',
  TIMEOUT_MS:  15_000,
  APP_VERSION: '1.0.0',
  IS_DEV:      __DEV__,
} as const;
