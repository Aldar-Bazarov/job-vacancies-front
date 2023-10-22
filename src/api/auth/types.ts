export interface AuthContext {
  username: string;
  password: string;
}

export interface RefreshContext {
  refreshToken: string;
}

export interface AuthInfo {
  access_token: string;
  refresh_token: string;
}
