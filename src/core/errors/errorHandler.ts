// src/core/errors/errorHandler.ts
import { Alert } from 'react-native';
import { AppException, NetworkException, UnauthorizedException } from './appException';
import { Env } from '../config/env';

export function handleError(error: unknown, context?: string): void {
  if (Env.IS_DEV) {
    console.error(`[ErrorHandler]${context ? ` (${context})` : ''}`, error);
  }

  if (error instanceof UnauthorizedException) {
    Alert.alert('Session Expired', error.message);
    return;
  }

  if (error instanceof NetworkException) {
    Alert.alert('No Connection', error.message);
    return;
  }

  if (error instanceof AppException) {
    Alert.alert('Error', error.message);
    return;
  }

  // Unknown error
  Alert.alert('Error', 'An unexpected error occurred. Please try again.');
}

/**
 * Wraps an async function and calls handleError on failure.
 */
export async function safeRun<T>(
  fn: () => Promise<T>,
  context?: string,
): Promise<T | null> {
  try {
    return await fn();
  } catch (error) {
    handleError(error, context);
    return null;
  }
}
