import { VacancyInfo } from "@api/vacancies/types";
import { AxiosBuilder, unpack } from "@infrastructure/axios";

import { CompanyBody, CompanyInfo, VacancyBody } from "./types";

type CompaniesResponse = {
  companies: CompanyInfo[];
  total: number;
  limit: number;
  page: number;
};

type VacanciesResponse = {
  vacancies: VacancyInfo[];
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
  },

  async getVacanciesBySearch({ description, rate_id }: Partial<VacancyBody>) {
    const response = await axios.post<VacanciesResponse>(
      "/search/get_vacancies",
      {
        description,
        company_id: 0,
        rate_id: rate_id,
        experience_min: 0,
        experience_max: 0,
        salary_min: 0,
        salary_max: 0,
        personal_qualities: ""
      }
    );
    return unpack(response);
  },

  async getApplicants() {
    // const response = await axios.post<VacanciesResponse>(
    //   "/search/get_vacancies",
    //   {
    //     description,
    //     company_id: 0,
    //     rate_id: rate_id,
    //     experience_min: 0,
    //     experience_max: 0,
    //     salary_min: 0,
    //     salary_max: 0,
    //     personal_qualities: ""
    //   }
    // );
    // return unpack(response);
  }
};
