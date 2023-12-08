import { Role } from "@interfaces/user";

export interface GetProfileContext {
  role: Role;
}

export interface RegisterContext extends GetProfileContext {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  statusId?: 0 | 1;
}

export interface UpdateProfileContext extends GetProfileContext {
  id: number;
  firstName: string;
  lastName: string;
  statusId: 0 | 1 | 2;
}

export interface ProfileInfoDto {
  user_id: number;
  status_id?: 0 | 1 | 2;
  user: {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    education: string;
    institution: string;
    job: string;
    about: string;
    avatar: string;
    salary?: number;
    experience?: number;
  };
}
