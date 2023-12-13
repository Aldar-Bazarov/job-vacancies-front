import { AxiosBuilder, unpack } from "@infrastructure/axios";

import { CompanyBody, CompanyInfo } from "./types";

type CompaniesResponse = {
  companies: CompanyInfo[];
  total: number;
  limit: number;
  page: number;
};

const axios = new AxiosBuilder()
  .addBusinessErrorHandler()
  .addNotFoundErrorHandler()
  .build();

export const searchApi = {
  async getCompanyByProperties({
    name,
    ownerId,
    description,
    page
  }: Partial<CompanyBody>): Promise<CompaniesResponse> {
    try {
      const response = await axios.post<CompaniesResponse>(
        "/search/get_companies?limit=10&" + (page ? `page=${page}` : ""),
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
