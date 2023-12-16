import { AxiosBuilder, authInterceptor, unpack } from "@infrastructure/axios";

import { VacancyInfo } from "./types";

const axios = new AxiosBuilder()
  .addBusinessErrorHandler()
  .addNotFoundErrorHandler()
  .addUnauthorizedHandler()
  .build();

axios.interceptors.request.use(authInterceptor);

export const vacanciesApi = {
  async getVacancies() {
    const response = await axios.get<VacancyInfo[]>("/vacancies");
    return unpack(response);
  },

  async getVacancyById(id: number) {
    const response = await axios.get<VacancyInfo>(`/vacancies/${id}`);
    return unpack(response);
  },

  async createVacancy(data: VacancyInfo) {
    try {
      const response = await axios.post<VacancyInfo>("/vacancies/", data);
      return unpack(response);
    } catch (e) {
      console.error(e);
    }
  }
};
