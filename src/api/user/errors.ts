import { ApplicationError } from "@infrastructure/index";

export class RegisterProfileError extends ApplicationError {
  constructor(error: Error) {
    super(`Ошибка при регистрации`, error);
  }
}

export class GetProfileError extends ApplicationError {
  constructor(error: Error) {
    super("Ошибка при получении данных профиля", error);
  }
}

export class UpdateProfileError extends ApplicationError {
  constructor(error: Error) {
    super(`Ошибка при изменении данных профиля`, error);
  }
}
