import type { H3Event } from "h3";

export type TNullable<T> = T | null;
export type Translation = { [key: string]: string };

export type HttpEvent = H3Event<Request>;
export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  PARTIAL_CONTENT = 206,

  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  IM_A_TEAPOT = 418,

  INTERNAL = 500,
}

export interface HttpErrorData {
  code: HttpStatus;
  message?: string;
  data?: unknown;
}
export type HttpCallback = (event: HttpEvent) => Promise<unknown>;

export class LmError extends Error {
  code: HttpStatus;

  constructor(code: HttpStatus, message?: string) {
    super(message);
    this.code = code;
  }
}
export class LmBadRequestError extends LmError {
  constructor(message?: string) {
    super(HttpStatus.BAD_REQUEST, message);
  }
}
export class LmUnauthorizedError extends LmError {
  constructor(message?: string) {
    super(HttpStatus.UNAUTHORIZED, message);
  }
}
export class LmForbiddenError extends LmError {
  constructor(message?: string) {
    super(HttpStatus.FORBIDDEN, message);
  }
}
export class LmNotFoundError extends LmError {
  constructor(message?: string) {
    super(HttpStatus.NOT_FOUND, message);
  }
}
export class LmConflictError extends LmError {
  constructor(message?: string) {
    super(HttpStatus.CONFLICT, message);
  }
}
export class LmImATeaPotError extends LmError {
  constructor(message?: string) {
    super(HttpStatus.IM_A_TEAPOT, message);
  }
}
export class LmInternalError extends LmError {
  constructor(message?: string) {
    super(HttpStatus.INTERNAL, message);
  }
}
