import { AppError } from "./AppError";

export interface Success<T> {
  readonly isSuccess: true;
  readonly isFailure: false;
  readonly value: T;
  readonly error: null;
}

export interface Failure {
  readonly isSuccess: false;
  readonly isFailure: true;
  readonly value: null;
  readonly error: AppError;
}

export type Result<T> = Success<T> | Failure;

export namespace Result {
  export function success<T>(value: T): Success<T> {
    return {
      isSuccess: true,
      isFailure: false,
      value,
      error: null,
    };
  }

  export function failure(error: AppError): Failure {
    return {
      isSuccess: false,
      isFailure: true,
      value: null,
      error,
    };
  }

  export function fold<T, R>(
    result: Result<T>,
    handlers: {
      onSuccess: (value: T) => R;
      onFailure: (error: AppError) => R;
    },
  ): R {
    return result.isSuccess ? handlers.onSuccess(result.value) : handlers.onFailure(result.error);
  }
}
