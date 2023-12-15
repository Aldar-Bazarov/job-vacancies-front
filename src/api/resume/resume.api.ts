import { AxiosBuilder, unpack } from "@infrastructure/axios";

import { RsponseData } from "./types";

const axios = new AxiosBuilder()
  .addBusinessErrorHandler()
  .addNotFoundErrorHandler()
  .addUnauthorizedHandler()
  .build();

export const resumeApi = {
  async response(data: RsponseData) {
    const response = await axios.post("/vacancy_response", data);
    return unpack(response);
  },

  async getResumes() {
    const response = await axios.get("/resumes");
    return unpack(response);
  }
};
