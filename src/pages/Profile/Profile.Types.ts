import { ProfileInfoDto } from "@api/user/types";

export type ProfileReducerAction = {
  type:
    | "set_user"
    | "change_last_name"
    | "change_first_name"
    | "change_education"
    | "change_status"
    | "change_job"
    | "change_about"
    | "change_institution"; // eslint-disable-next-line
  value?: any;
};

export interface IEditableHeaderProps {
  setImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
}
export interface IHardSkillsProps {
  setTags?: React.Dispatch<React.SetStateAction<string[]>>;
  tags: string[];
}
export interface IReadonlyHeaderProps {}
export interface IReadonlyMainInfoProps {}
export interface IEditableMainInfoProps {}
export interface IReadonlyEducationProps {}
export interface IEditableEducationProps {}
export interface IReadonlyAboutProps {}
export interface IEditableAboutProps {}

export interface IProfileContext {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  dispatch: React.Dispatch<ProfileReducerAction>;
  profileData: ProfileInfoDto;
  isReadOnly: boolean;
  userIsApplicant: boolean;
}
