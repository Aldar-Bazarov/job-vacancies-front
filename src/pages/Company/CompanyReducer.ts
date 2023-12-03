import { CompanyInfoDto } from "@api/company/types";

import { CompanyReducerAction } from "./Company.Types";

export function CompanyReducer(
  state: CompanyInfoDto | null,
  action: CompanyReducerAction
): CompanyInfoDto | null {
  let data = null;
  if (state !== null) data = { ...state };
  if (action.value === undefined)
    throw Error(
      `action.value must be not null for action.type === ${action.type}`
    );
  if (data === null && action.type !== "set_company")
    throw Error(`state must be not null`);
  switch (action.type) {
    case "set_company": {
      data = { ...action.value };
      break;
    }
    case "change_name": {
      data!.name = action.value;
      break;
    }
    case "change_description": {
      data!.description = action.value;
      break;
    }
  }
  return data;
}
