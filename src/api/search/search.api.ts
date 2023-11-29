import { AxiosBuilder, unpack } from "@infrastructure/axios";

import { CompanyBody, CompanyInfo } from "./types";

const axios = new AxiosBuilder()
  .addBusinessErrorHandler()
  .addNotFoundErrorHandler()
  .build();

export const searchApi = {
  async getCompanyByProperties({
    name,
    ownerId,
    description
  }: Partial<CompanyBody>): Promise<CompanyInfo[]> {
    try {
      const response = await axios.post<CompanyInfo[]>(
        "/search/get_companies",
        {
          filter_company: {
            name,
            owner_id: ownerId,
            description
          }
        }
      );
      return unpack(response);
    } catch (err) {
      throw err as Error;
    }
  }
};
