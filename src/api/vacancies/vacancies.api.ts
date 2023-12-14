import { AxiosBuilder, unpack } from "@infrastructure/axios";

import { VacancyInfo } from "./types";

const axios = new AxiosBuilder()
  .addBusinessErrorHandler()
  .addNotFoundErrorHandler()
  .build();

export const vacanciesApi = {
  async getVacancies() {
    const response = await axios.get<VacancyInfo[]>("/vacancies");
    return unpack(response);
  },

  async getVacancyById(id: number) {
    const response = await axios.get<VacancyInfo>(`/vacancies/${id}`);
    return unpack(response);
  }
};
