import { CompanyInfoDto } from "@api/company/types";

export type CompanyReducerAction = {
  type:
    | "set_company"
    | "change_name"
    | "change_description"
    | "change_address"
    | "change_phone"
    | "change_population"
    | "change_email"; // eslint-disable-next-line
  value?: any;
};

export interface IEditableHeaderProps {
  setImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
}
export interface IReadonlyHeaderProps {}
export interface IReadonlyAboutProps {}
export interface IEditableAboutProps {}
export interface IVacanciesProps {
  company_id: number;
}

export interface ICompanyContext {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  dispatch: React.Dispatch<CompanyReducerAction>;
  companyData: CompanyInfoDto;
  isReadOnly: boolean;
}
