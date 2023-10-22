import { AuthContext } from "./types";
import { ApplicationError } from "../../infrastructure";

export class AuthorizeError extends ApplicationError {
  constructor(context: AuthContext, error: Error) {
    super(`Ошибка при получении данных: ${JSON.stringify(context)}`, error);
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
