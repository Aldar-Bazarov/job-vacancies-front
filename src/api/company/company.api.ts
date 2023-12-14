import { DataURIToBlob } from "@infrastructure/image-upload";
import { AxiosBuilder, unpack, authInterceptor } from "@infrastructure/index";

import {
  CreateCompanyError,
  GetCompanyError,
  LoadPhotoError,
  UpdateCompanyError
} from "./errors";
import {
  CompanyInfoDto,
  UpdateCompanyContext,
  CreateCompanyContext
} from "./types";

export * from "./types";
export * from "./errors";

const axios = new AxiosBuilder()
  .addBusinessErrorHandler()
  .addNotFoundErrorHandler()
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
    try {
      const response = await axios.put<CompanyInfoDto>(
        `/companies/${context.id}`,
        {
          ...context
        }
      );
      return unpack(response);
    } catch (err) {
      throw new UpdateCompanyError(err as Error);
    }
  },

  async createCompany(context: CreateCompanyContext): Promise<CompanyInfoDto> {
    try {
      const response = await axios.post<CompanyInfoDto>(`/companies/`, {
        ...context
      });
      return unpack(response);
    } catch (err) {
      throw new CreateCompanyError(err as Error);
    }
  },

  async loadPhoto(id: number, uri: string): Promise<CompanyInfoDto> {
    try {
      const formData = new FormData();
      const blob = DataURIToBlob(uri);
      formData.append(
        "logo_file",
        blob,
        `company_logo${id}.${blob.type.split("/")[1]}`
      );
      const response = await axios.postForm<CompanyInfoDto>(
        `/companies/${id}/logo`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      return unpack(response);
    } catch (err) {
      throw new LoadPhotoError(err as Error);
    }
  },

  async getCompanies() {
    const response = await axios.get<CompanyInfoDto[]>("/companies");
    return unpack(response);
  },

  async getCompanyById(id: number) {
    const response = await axios.get<CompanyInfoDto>(`/companies/${id}`);
    return unpack(response);
  }
};
