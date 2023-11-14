import { message } from "antd";

import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { GetCompanyError, companyApi } from "@api/company/company.api";

import styles from "./Company.module.scss";

export const Company = () => {
  const { companyId } = useParams();

  useEffect(() => {
    if (companyId !== undefined) {
      companyApi
        .getCompany(parseInt(companyId))
        .then((data) => {
          console.log(data);
        })
        .catch((e: GetCompanyError) => {
          message.error(e.message);
        });
    }
  }, [companyId]);

  return <>{companyId}</>;
};
