import { ApplicationError } from "@infrastructure/index";

export class GetCompanyError extends ApplicationError {
  constructor(error: Error) {
    super("Ошибка при получении данных организации", error);
  }
}

export class UpdateCompanyError extends ApplicationError {
  constructor(error: Error) {
    super(`Ошибка при изменении данных организации`, error);
  }
}
export class CreateCompanyError extends ApplicationError {
  constructor(error: Error) {
    super(`Ошибка при создании организации`, error);
  }
}
