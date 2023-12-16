import { AxiosBuilder, authInterceptor, unpack } from "@infrastructure/axios";

const axios = new AxiosBuilder()
  .addNotFoundErrorHandler()
  .addBusinessErrorHandler()
  .addUnauthorizedHandler()
  .build();

axios.interceptors.request.use(authInterceptor);

export const notificationApi = {
  async getAll() {
    const response = await axios.get("/notifications");
    return unpack(response);
  }
};
