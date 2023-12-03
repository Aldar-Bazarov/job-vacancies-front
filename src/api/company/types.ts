import { VacancyInfo } from "@api/vacancies/types";

export interface UpdateCompanyContext {
  id: number;
  name: string;
  owner_id: number;
  description: string;
}

export interface CompanyInfoDto {
  id: number;
  name: string;
  owner_id: number;
  description: string;
  created_at: Date;
  vacancies: VacancyInfo[];
}
