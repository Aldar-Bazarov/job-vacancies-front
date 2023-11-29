import { AxiosBuilder, unpack } from "@infrastructure/axios";

import { CompanyInfo } from "./types";

const axios = new AxiosBuilder()
  .addBusinessErrorHandler()
  .addNotFoundErrorHandler()
  .build();

export const companiesApi = {
  async getCompanies() {
    const response = await axios.get<CompanyInfo[]>("/companies");
    return unpack(response);
  },

  async getCompanyById(id: number) {
    const response = await axios.get<CompanyInfo>(`/companies/${id}`);
    return unpack(response);
  }
};
