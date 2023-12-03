import { CompanyInfoDto } from "@api/company/types";

export type CompanyReducerAction = {
  type: "set_company" | "change_name" | "change_description"; // eslint-disable-next-line
  value?: any;
};

export interface IEditableHeaderProps {
  setImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
}
export interface IReadonlyHeaderProps {}
export interface IReadonlyAboutProps {}
export interface IEditableAboutProps {}

export interface ICompanyContext {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  dispatch: React.Dispatch<CompanyReducerAction>;
  companyData: CompanyInfoDto;
  isReadOnly: boolean;
}