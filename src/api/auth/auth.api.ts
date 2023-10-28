import { AxiosBuilder, unpack } from "@infrastructure/index";

import { AuthorizeError, LogoutError, RefreshError } from "./errors";
import { AuthInfo, AuthContext } from "./types";

export * from "./types";
export * from "./errors";

const axios = new AxiosBuilder()
  .addBusinessErrorHandler()
  .addNotFoundErrorHandler()
  .build();

export const authApi = {
  async authorize(context: AuthContext): Promise<AuthInfo> {
    const { username, password, role } = context;
    try {
      const response = await axios.post<AuthInfo>(`/auth/tokens/${role}`, {
        username,
        password
      });
      return unpack(response);
    } catch (err) {
      throw new AuthorizeError(err as Error);
    }
  },
  async refresh(): Promise<AuthInfo> {
    try {
      const response = await axios.put<AuthInfo>("/auth/tokens");
      return unpack(response);
    } catch (err) {
      throw new RefreshError(err as Error);
    }
  },
  async logout(): Promise<void> {
    try {
      await axios.delete<void>("/auth/tokens");
    } catch (err) {
      throw new LogoutError(err as Error);
    }
  }
};
