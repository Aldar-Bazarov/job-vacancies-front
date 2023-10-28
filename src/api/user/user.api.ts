import { AxiosBuilder, unpack, authInterceptor } from "@infrastructure/index";

import {
  GetProfileError,
  RegisterProfileError,
  UpdateProfileError
} from "./errors";
import {
  GetProfileContext,
  ProfileInfoDto,
  RegisterProfileContext,
  UpdateProfileContext
} from "./types";

export * from "./types";
export * from "./errors";

const axios = new AxiosBuilder()
  .addBusinessErrorHandler()
  .addNotFoundErrorHandler()
  .addUnauthorizedHandler()
  .build();

axios.interceptors.request.use(authInterceptor);

export const userApi = {
  async registerAccount(
    context: RegisterProfileContext
  ): Promise<ProfileInfoDto> {
    const { firstName, lastName, statusId, username, password, email, role } =
      context;
    try {
      const response = await axios.post<ProfileInfoDto>(`/users/${role}}`, {
        username,
        password,
        email,
        first_name: firstName,
        last_name: lastName,
        status_id: statusId
      });
      return unpack(response);
    } catch (err) {
      throw new RegisterProfileError(err as Error);
    }
  },

  async getMyProfile(context: GetProfileContext): Promise<ProfileInfoDto> {
    const { role } = context;
    try {
      const response = await axios.get<ProfileInfoDto>(`/users/${role}/me`);
      return unpack(response);
    } catch (err) {
      throw new GetProfileError(err as Error);
    }
  },

  async updateMyProfile(
    context: UpdateProfileContext
  ): Promise<ProfileInfoDto> {
    const { firstName, lastName, statusId, role, id } = context;
    try {
      const response = await axios.put<ProfileInfoDto>(`/users/${role}/${id}`, {
        first_name: firstName,
        last_name: lastName,
        status_id: statusId
      });
      return unpack(response);
    } catch (err) {
      throw new UpdateProfileError(err as Error);
    }
  }
};
