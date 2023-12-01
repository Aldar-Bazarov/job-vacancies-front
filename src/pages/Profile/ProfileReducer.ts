import { ProfileInfoDto } from "@api/user/types";

import { ProfileReducerAction } from "./Profile.Types";

export function ProfileReducer(
  state: ProfileInfoDto | null,
  action: ProfileReducerAction
): ProfileInfoDto | null {
  let data = null;
  if (state !== null) data = { ...state, user: { ...state.user } };
  if (action.value === undefined)
    throw Error(
      `action.value must be not null for action.type === ${action.type}`
    );
  if (data === null && action.type !== "set_user")
    throw Error(`state must be not null`);
  switch (action.type) {
    case "set_user": {
      data = { ...action.value };
      break;
    }
    case "change_first_name": {
      data!.user.first_name = action.value;
      break;
    }
    case "change_last_name": {
      data!.user.last_name = action.value;
      break;
    }
    case "change_education": {
      data!.user.education = action.value;
      break;
    }
    case "change_institution": {
      data!.user.institution = action.value;
      break;
    }
    case "change_status": {
      data!.status_id = action.value;
      break;
    }
    case "change_job": {
      data!.user.job = action.value;
      break;
    }
  }
  return data;
}
