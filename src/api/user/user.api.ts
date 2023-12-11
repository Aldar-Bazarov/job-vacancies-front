import { AxiosBuilder, unpack, authInterceptor } from "@infrastructure/index";
import { Role } from "@interfaces/user";

import {
  GetProfileError,
  RegisterProfileError,
  UpdateProfileError
} from "./errors";
import {
  GetProfileContext,
  ProfileInfoDto,
  RegisterContext,
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
  async register(context: RegisterContext): Promise<ProfileInfoDto> {
    const { firstName, lastName, username, password, email, role } = context;
    try {
      const requestData: {
        username: string;
        password: string;
        email: string;
        first_name: string;
        last_name: string;
        status_id?: number;
      } = {
        username,
        password,
        email,
        first_name: firstName,
        last_name: lastName
      };
      if (role === Role.Applicants) {
        requestData.status_id = 0;
      }
      const response = await axios.post<ProfileInfoDto>(
        `/users/${role}`,
        requestData
      );
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
      if (role === Role.Applicants) {
        const response = await axios.put<ProfileInfoDto>(
          `/users/${role}/${id}`,
          {
            first_name: firstName,
            last_name: lastName,
            status_id: statusId
          }
        );
        return unpack(response);
      } else {
        const response = await axios.put<ProfileInfoDto>(
          `/users/${role}/${id}`,
          {
            first_name: firstName,
            last_name: lastName
          }
        );
        return unpack(response);
      }
    } catch (err) {
      throw new UpdateProfileError(err as Error);
    }
  }
};
