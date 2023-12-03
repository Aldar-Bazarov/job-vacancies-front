import React from "react";

import { ICompanyContext } from "./Company.Types";

export const CompanyContext = React.createContext<ICompanyContext | undefined>(
  undefined
);
