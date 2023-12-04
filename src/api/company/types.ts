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
  created_at?: Date;
  employees_count: number;
  address: string;
  phone: string;
  response_count: number;
  email: string;
  avarage_salary: number;
  logo: string;
  vacancies?: VacancyInfo[];
}
