import { AxiosBuilder, unpack } from "@infrastructure/axios";

const axios = new AxiosBuilder()
  .addBusinessErrorHandler()
  .addNotFoundErrorHandler()
  .addUnauthorizedHandler()
  .build();

export interface Responder {
  applicant_name: string;
  applicant_description: string;
  resume_id: number;
  vacancy_id: number;
  vacancy_title: string;
}

interface GetRespondersContext {
  company_id: number;
}

export const respondersApi = {
  async getRespondersByCompany(
    context: GetRespondersContext
  ): Promise<Responder[]> {
    const { company_id } = context;
    try {
      const response = await axios.get<Responder[]>(
        `/vacancy_responses/?company_id=${company_id}`
      );
      return unpack(response);
    } catch (err) {
      throw err as Error;
    }
  }
};
