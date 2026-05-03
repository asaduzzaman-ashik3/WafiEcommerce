// src/core/utils/helpers.ts

/**
 * Format a price number to a currency string.
 * e.g. 1500 → "৳1,500"
 */
export function formatCurrency(
  amount: number,
  symbol = '৳',
  locale = 'en-US',
): string {
  return `${symbol}${new Intl.NumberFormat(locale).format(amount)}`;
}

/**
 * Format an ISO date string to a human-readable date.
 * e.g. "2024-01-15T10:30:00Z" → "Jan 15, 2024"
 */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day:   'numeric',
    year:  'numeric',
  });
}

/**
 * Capitalise the first letter of a string.
 */
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Clamp a number between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Debounce a function.
 */
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

