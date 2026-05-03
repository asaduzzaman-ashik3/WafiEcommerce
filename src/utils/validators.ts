// src/core/utils/validators.ts

export const Validators = {
  email: (value: string): string | undefined => {
    if (!value) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email address';
    return undefined;
  },

  password: (value: string): string | undefined => {
    if (!value) return 'Password is required';
    if (value.length < 6) return 'Password must be at least 6 characters';
    return undefined;
  },

  required: (label: string) => (value: string): string | undefined => {
    if (!value || !value.trim()) return `${label} is required`;
    return undefined;
  },

  phone: (value: string): string | undefined => {
    if (!value) return 'Phone is required';
    if (!/^\+?[\d\s\-()]{7,15}$/.test(value)) return 'Invalid phone number';
    return undefined;
  },
};

