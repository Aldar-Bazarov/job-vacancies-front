import { ApplicationError } from "@infrastructure/index";

export class AuthorizeError extends ApplicationError {
  constructor(error: Error) {
    super(`Ошибка при входе`, error);
  }
}

export class RefreshError extends ApplicationError {
  constructor(error: Error) {
    super(`Ошибка при обновлении токена`, error);
  }
}

export class LogoutError extends ApplicationError {
  constructor(error: Error) {
    super(`Ошибка при выходе`, error);
  }
}
