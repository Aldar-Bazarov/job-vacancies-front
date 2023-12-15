export interface VacancyInfo {
  id: number;
  name: string;
  description: string;
  created_at: Date;
  company_id: number;
  status_id: number;
  salary_min: number;
  salary_max: number;
  experience_min: number;
  experience_max: number;
  rate_id: number;
  rate?: {
    id: number;
    name: string;
  };
  personal_qualities: string;
}
