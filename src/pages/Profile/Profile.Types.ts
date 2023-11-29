import { ProfileInfoDto } from "@api/user/types";

export type ProfileReducerAction = {
  type: "set_user" | "change_last_name" | "change_first_name"; // eslint-disable-next-line
  value?: any;
};

export interface IEditableHeaderProps {
  setImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface IReadonlyHeaderProps {}

export interface IProfileCompound {
  EditableHeader: React.FC<IEditableHeaderProps>;
  ReadonlyHeader: React.FC<IReadonlyHeaderProps>;
}

export interface IProfileContext {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  dispatch: React.Dispatch<ProfileReducerAction>;
  profileData: ProfileInfoDto;
  isReadOnly: boolean;
}
