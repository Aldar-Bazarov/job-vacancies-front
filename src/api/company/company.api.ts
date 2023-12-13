import { AxiosBuilder, unpack, authInterceptor } from "@infrastructure/index";

import {
  CreateCompanyError,
  GetCompanyError,
  UpdateCompanyError
} from "./errors";
import {
  CompanyInfoDto,
  UpdateCompanyContext,
  CreateCompanyContext
} from "./types";

export * from "./types";
export * from "./errors";

const axios = new AxiosBuilder()
  .addBusinessErrorHandler()
  .addNotFoundErrorHandler()
  .build();

axios.interceptors.request.use(authInterceptor);

export const companyApi = {
  async getCompany(id: number): Promise<CompanyInfoDto> {
    try {
      const response = await axios.get<CompanyInfoDto>(`/companies/${id}`);
      return unpack(response);
    } catch (err) {
      throw new GetCompanyError(err as Error);
    }
  },

  async updateCompany(context: UpdateCompanyContext): Promise<CompanyInfoDto> {
    try {
      const response = await axios.put<CompanyInfoDto>(
        `/companies/${context.id}`,
        {
          ...context
        }
      );
      return unpack(response);
    } catch (err) {
      throw new UpdateCompanyError(err as Error);
    }
  },

  async createCompany(context: CreateCompanyContext): Promise<CompanyInfoDto> {
    try {
      const response = await axios.put<CompanyInfoDto>(`/companies/`, {
        ...context
      });
      return unpack(response);
    } catch (err) {
      throw new CreateCompanyError(err as Error);
    }
  },

  async getCompanies() {
    const response = await axios.get<CompanyInfoDto[]>("/companies");
    return unpack(response);
  }
};
