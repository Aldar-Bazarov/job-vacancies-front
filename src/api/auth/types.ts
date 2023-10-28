import { Role } from "@interfaces/user";

export interface AuthContext {
  username: string;
  password: string;
  role: Role;
}

export interface RefreshContext {
  refreshToken: string;
}

export interface AuthInfo {
  access_token: string;
  refresh_token: string;
}
