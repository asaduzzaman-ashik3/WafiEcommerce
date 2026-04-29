// src/core/router/AppRouter.tsx
// This file documents the app's navigation tree.
// Actual routing is handled by expo-router file-system routing.
// Use this file for programmatic navigation helpers.

import { router } from 'expo-router';
import { RouteNames } from './routeNames';

export const AppRouter = {
  toHome:    () => router.replace(RouteNames.HOME as never),
  toLogin:   () => router.replace(RouteNames.LOGIN as never),
  toExplore: () => router.push(RouteNames.EXPLORE as never),
  toCart:    () => router.push(RouteNames.CART as never),
  toProfile: () => router.push(RouteNames.PROFILE as never),
  toModal:   () => router.push(RouteNames.MODAL as never),
  goBack:    () => router.back(),
};
