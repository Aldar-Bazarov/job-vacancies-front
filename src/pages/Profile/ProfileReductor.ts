import { ProfileInfoDto } from "@api/user/types";

import { ProfileReducerAction } from "./Profile.Types";

export function ProfileReducer(
  state: ProfileInfoDto | null,
  action: ProfileReducerAction
): ProfileInfoDto | null {
  let data = null;
  if (state !== null) data = { ...state, user: { ...state.user } };
  switch (action.type) {
    case "set_user": {
      if (action.value === undefined)
        throw Error(
          `action.value must be not null for action.type === ${action.type}`
        );
      data = { ...action.value };
      return data;
    }
    case "change_first_name": {
      if (action.value === undefined)
        throw Error(
          `action.value must be not null for action.type === ${action.type}`
        );
      if (data === null) throw Error(`state must be not null`);
      data.user.first_name = action.value;
      return data;
    }
    case "change_last_name": {
      if (action.value === undefined)
        throw Error(
          `action.value must be not null for action.type === ${action.type}`
        );
      if (data === null) throw Error(`state must be not null`);
      data.user.last_name = action.value;
      return data;
    }
  }
}
