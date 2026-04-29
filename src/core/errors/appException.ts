// src/core/errors/appException.ts

export class AppException extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly statusCode?: number,
  ) {
    super(message);
    this.name = 'AppException';
  }
}

export class NetworkException extends AppException {
  constructor(message = 'Network error. Please check your connection.') {
    super('NETWORK_ERROR', message);
    this.name = 'NetworkException';
  }
}

export class UnauthorizedException extends AppException {
  constructor(message = 'Session expired. Please log in again.') {
    super('UNAUTHORIZED', message, 401);
    this.name = 'UnauthorizedException';
  }
}

export class NotFoundException extends AppException {
  constructor(resource = 'Resource') {
    super('NOT_FOUND', `${resource} not found.`, 404);
    this.name = 'NotFoundException';
  }
}

export class ValidationException extends AppException {
  constructor(
    message: string,
    public readonly fields?: Record<string, string>,
  ) {
    super('VALIDATION_ERROR', message, 422);
    this.name = 'ValidationException';
  }
}
