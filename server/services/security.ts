import type { HttpCallback, HttpErrorData, HttpEvent, HttpStatus, LmError } from "~/types/generics";
import { LmForbiddenError } from "~/types/generics";

export async function protect(event: HttpEvent, callback: HttpCallback) {
  const key = event.headers.get("ADMIN_KEY");
  if (!key) return handleException(event, new LmForbiddenError("Missing admin key!"));

  return callback(event);
}

export function handleException(event: HttpEvent, error: LmError, data?: unknown): HttpErrorData {
  event.node.res.statusCode = error.code;
  event.node.res.statusMessage = error.message;

  return {
    code: error.code,
    message: error.message,
    data,
  };
}

export function setOutputStatus(event: HttpEvent, status: HttpStatus) {
  event.node.res.statusCode = status;
}
