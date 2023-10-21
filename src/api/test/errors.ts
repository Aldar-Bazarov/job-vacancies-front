import { TestContext } from "./types";
import { ApplicationError } from "../../infrastructure";

export class FetchPostError extends ApplicationError {
  constructor(context: TestContext, error: Error) {
    super(`Ошибка при получении данных: ${JSON.stringify(context)}`, error);
  }
}
