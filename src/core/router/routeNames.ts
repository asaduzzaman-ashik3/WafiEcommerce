// src/core/router/routeNames.ts
export const RouteNames = {
  // Tabs
  HOME:    '(tabs)/index',
  EXPLORE: '(tabs)/explore',
  CART:    '(tabs)/cart',
  ORDERS:  '(tabs)/orders',
  PROFILE: '(tabs)/profile',

  // Auth
  LOGIN:   'auth/login',
  SIGNUP:  'auth/signup',

  // Modal
  MODAL:   'modal',
} as const;

export type RouteName = (typeof RouteNames)[keyof typeof RouteNames];
