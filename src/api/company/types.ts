import { VacancyInfo } from "@api/vacancies/types";

export interface CreateCompanyContext {
  name: string;
  owner_id: number;
  description: string;
  email: string;
  phone: string;
  address: string;
  population: number;
}

export interface UpdateCompanyContext {
  id: number;
  name: string;
  owner_id: number;
  description: string;
  email: string;
  phone: string;
  address: string;
  population: number;
}

export interface CompanyInfoDto {
  id?: number;
  name: string;
  owner_id?: number;
  description: string;
  created_at?: Date;
  employees_count?: number;
  address?: string;
  phone?: string;
  responses_count?: number;
  email?: string;
  avarage_salary?: number;
  logo_path?: string;
  vacancies?: VacancyInfo[];
  population?: number;
}
