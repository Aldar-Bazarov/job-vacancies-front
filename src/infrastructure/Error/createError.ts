import { ApplicationError, IError } from "./interfaces";

export function convertError(error: ApplicationError): IError {
  const inner: IError | undefined = error.inner
    ? convertError(error.inner)
    : undefined;

  return {
    name: error.name,
    message: error.message,
    stack: error.stack,
    inner
  };
}

export function createError(
  name: string,
  message: string,
  stack?: string,
  inner?: IError
): IError {
  return {
    name,
    message,
    stack,
    inner
  };
}
