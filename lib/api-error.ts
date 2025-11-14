import type { ZodError } from "zod";

export class ApiError extends Error {
  constructor(public statusCode: number, message: string, public errors?: ZodError['issues']) {
    super(message);
    this.name = "ApiError";
  }
}

export class ValidationError extends ApiError {
  constructor(errors: ZodError['issues']) {
    super(400, "Validation failed", errors);
    this.name = "ValidationError";
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = "Unauthorized") {
    super(401, message);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = "Forbidden") {
    super(403, message);
    this.name = "ForbiddenError";
  }
}

export class NotFoundError extends ApiError {
  constructor(message = "Resource not found") {
    super(404, message);
    this.name = "NotFoundError";
  }
}

export class ConflictError extends ApiError {
  constructor(message = "Resource already exists") {
    super(409, message);
    this.name = "ConflictError";
  }
}
