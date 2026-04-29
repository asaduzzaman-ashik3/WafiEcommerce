// src/core/storage/localStorage.ts
// Wraps AsyncStorage for non-sensitive user preferences.

import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  USER_PREFS:     'user_prefs',
  ONBOARDED:      'onboarded',
  SELECTED_LOCALE:'selected_locale',
} as const;

export const LocalStorage = {
  async get(key: string): Promise<string | null> {
    return AsyncStorage.getItem(key);
  },

  async set(key: string, value: string): Promise<void> {
    await AsyncStorage.setItem(key, value);
  },

  async remove(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
  },

  async getJSON<T>(key: string): Promise<T | null> {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return null;
    try { return JSON.parse(raw) as T; } catch { return null; }
  },

  async setJSON<T>(key: string, value: T): Promise<void> {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },

  async isOnboarded(): Promise<boolean> {
    return (await AsyncStorage.getItem(KEYS.ONBOARDED)) === 'true';
  },

  async setOnboarded(): Promise<void> {
    await AsyncStorage.setItem(KEYS.ONBOARDED, 'true');
  },
};
