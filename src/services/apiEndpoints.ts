// src/core/api/apiEndpoints.ts
export const ApiEndpoints = {
  auth: {
    login:        '/auth/login',
    logout:       '/auth/logout',
    refresh:      '/auth/refresh',
    me:           '/auth/me',
  },
  employee: {
    list:         '/employees',
    detail:       (id: string) => `/employees/${id}`,
  },
} as const;

