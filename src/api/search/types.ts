export interface CompanyInfo {
  id: number;
  name: string;
  ownerId: number;
  description: string;
  createdAt: Date;
}

export interface CompanyBody {
  name: string;
  ownerId: number | null;
  description: string | null;
  page: number | null;
}

export interface VacancyBody {
  description: string;
  rate_id: number;
}
