import { AuthorizeError, LogoutError, RefreshError } from "./errors";
import { AuthInfo, AuthContext } from "./types";
import { AxiosBuilder, unpack } from "../../infrastructure";

const axios = new AxiosBuilder()
  .addBusinessErrorHandler()
  .addNotFoundErrorHandler()
  .build();

export async function authorizeApplicant(
  context: AuthContext
): Promise<AuthInfo> {
  const { username, password } = context;
  try {
    const response = await axios.post<AuthInfo>("/auth/tokens/applicants", {
      username,
      password
    });
    return unpack(response);
  } catch (err) {
    throw new AuthorizeError(context, err as Error);
  }
}

export async function authorizeRecruiter(
  context: AuthContext
): Promise<AuthInfo> {
  const { username, password } = context;
  try {
    const response = await axios.post<AuthInfo>("/auth/tokens/recruiters", {
      username,
      password
    });
    return unpack(response);
  } catch (err) {
    throw new AuthorizeError(context, err as Error);
  }
}

export async function refreshToken(): Promise<AuthInfo> {
  try {
    const response = await axios.put<AuthInfo>("/auth/tokens");
    return unpack(response);
  } catch (err) {
    throw new RefreshError(err as Error);
  }
}

export async function logout(): Promise<void> {
  try {
    await axios.delete<void>("/auth/tokens");
  } catch (err) {
    throw new LogoutError(err as Error);
  }
}
