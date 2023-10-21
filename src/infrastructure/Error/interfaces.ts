export interface IError {
  readonly name: string;
  readonly message: string;
  readonly stack?: string;
  readonly inner?: IError;
}

export type ErrorNullable = IError | null;

export class ApplicationError extends Error {
  inner?: Error;

  constructor(message: string, error?: Error) {
    super(message);
    this.name = "ApplicationError";
    this.inner = error;
  }
}
