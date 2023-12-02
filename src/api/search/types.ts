export interface CompanyInfo {
  id: number;
  name: string;
  ownerId: number;
  description: string;
  createdAt: Date;
}

export interface CompanyBody {
  name: string;
  ownerId: number;
  description: string;
}