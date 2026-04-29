// src/core/constants/strings.ts
export const Strings = {
  appName: 'Wafi',

  // Navigation labels
  nav: {
    home:     'Home',
    explore:  'Explore',
    cart:     'Cart',
    orders:   'Orders',
    profile:  'Profile',
  },

  // Auth
  auth: {
    login:           'Sign In',
    logout:          'Sign Out',
    email:           'Email address',
    password:        'Password',
    forgotPassword:  'Forgot password?',
    noAccount:       "Don't have an account?",
    signUp:          'Sign Up',
    welcomeBack:     'Welcome back',
    loginSubtitle:   'Sign in to continue shopping',
  },

  // General
  general: {
    loading:   'Loading…',
    error:     'Something went wrong',
    retry:     'Try Again',
    cancel:    'Cancel',
    confirm:   'Confirm',
    save:      'Save',
    search:    'Search products…',
  },
} as const;
