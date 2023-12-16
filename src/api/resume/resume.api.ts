import { AxiosBuilder, unpack } from "@infrastructure/axios";

import { ResponseData, UpdateResponseData } from "./types";

const axios = new AxiosBuilder()
  .addBusinessErrorHandler()
  .addNotFoundErrorHandler()
  .addUnauthorizedHandler()
  .build();

export const resumeApi = {
  async response(data: ResponseData) {
    const response = await axios.post("/vacancy_responses", data);
    return unpack(response);
  },

  async updateResponse(context: UpdateResponseData) {
    const { vacancy_id, resume_id, status_id } = context;
    const response = await axios.post(
      `/vacancy_responses/${vacancy_id}/${resume_id}/status`,
      { status_id }
    );
    return unpack(response);
  },

  async getResumes() {
    const response = await axios.get("/resumes");
    return unpack(response);
  },

  async getOneResume(id: number) {
    const response = await axios.get(`/resumes/${id}`);
    return unpack(response);
  },

  // eslint-disable-next-line
  async createResumes(data: any) {
    const { resume } = data;
    const response = await axios.post(`/resumes`, resume);
    return unpack(response);
  },

  // eslint-disable-next-line
  async updateResumes(data: any) {
    const { resumeId, resume } = data;
    const response = await axios.put(`/resumes/${resumeId}`, resume);
    return unpack(response);
  }
};
