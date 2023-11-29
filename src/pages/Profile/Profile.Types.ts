export type ProfileReducerAction = {
  type: "set_user" | "change_last_name" | "change_first_name"; // eslint-disable-next-line
  value?: any;
};

export interface IEditableHeaderProps {
  setImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  dispatch: React.Dispatch<ProfileReducerAction>;
  first_name: string;
  last_name: string;
  email: string;
  isReadOnly: boolean;
}

export interface IProfileCompound {
  HeaderEditable: React.FC<IEditableHeaderProps>;
}
