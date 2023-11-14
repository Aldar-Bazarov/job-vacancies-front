import { AxiosBuilder, unpack, authInterceptor } from "@infrastructure/index";

import { GetCompanyError, UpdateCompanyError } from "./errors";
import { CompanyInfoDto, UpdateCompanyContext } from "./types";

export * from "./types";
export * from "./errors";

const axios = new AxiosBuilder()
  .addBusinessErrorHandler()
  .addNotFoundErrorHandler()
  .addUnauthorizedHandler()
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
    const { name, owner_id, description, id } = context;
    try {
      const response = await axios.put<CompanyInfoDto>(`/users/${id}`, {
        owner_id: owner_id,
        name: name,
        description: description
      });
      return unpack(response);
    } catch (err) {
      throw new UpdateCompanyError(err as Error);
    }
  }
};
