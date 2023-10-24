import { ApplicationError } from "@infrastructure/index";

import { AuthContext } from "./types";

export class AuthorizeError extends ApplicationError {
  constructor(context: AuthContext, error: Error) {
    super(`Ошибка при получении токенов: ${JSON.stringify(context)}`, error);
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
