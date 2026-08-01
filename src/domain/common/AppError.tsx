export class AppError extends Error {
  readonly code: number;
  readonly sourceError?: unknown;

  constructor(message: string, code: number, sourceError?: unknown) {
    super(message);
    this.code = code;
    this.sourceError = sourceError;

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = this.constructor.name;
  }
}

export const AppNetworkErrorCode = -1;
export const AppUnknownErrorCode = -100;

export namespace AppError {
  export function networkError(
    message: string = "Unable to connect to the server. Check your connection.",
    sourceError?: unknown,
  ): AppError {
    return new AppError(message, AppNetworkErrorCode, sourceError);
  }

  export function unknownError(message: string = "An unexpected error occurred.", sourceError?: unknown): AppError {
    return new AppError(message, AppUnknownErrorCode, sourceError);
  }
}
