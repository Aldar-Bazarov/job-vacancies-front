import React from "react";

import { IProfileContext } from "./Profile.Types";

export const ProfileContext = React.createContext<IProfileContext | undefined>(
  undefined
);
