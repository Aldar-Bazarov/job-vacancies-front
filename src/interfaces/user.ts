export enum Role {
  Recruiter = "recruiters",
  Applicants = "applicants"
}

export interface ProfileInfo {
  userId: number;
  statusId?: 0 | 1;
  user: {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}
