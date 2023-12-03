import { Card, Flex, Typography } from "antd";

import { useMemo, useState, useEffect } from "react";

import { companyApi } from "@api/company/company.api";
import { CompanyInfoDto } from "@api/company/types";

import styles from "./VacancyCard.module.scss";

interface IVacancyCardProps {
  id: number;
  description: string;
  company_id: number;
}

export const VacancyCard = ({
  id,
  company_id,
  description
}: IVacancyCardProps) => {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfoDto>();

  useEffect(() => {
    companyApi.getCompany(company_id).then((data) => setCompanyInfo(data));
  }, [company_id]);

  const titleComponent = useMemo(() => {
    return (
      <Flex justify="space-between" align="center">
        <Typography.Title level={3}>{companyInfo?.name}</Typography.Title>
      </Flex>
    );
  }, [companyInfo]);

  return (
    <Card title={titleComponent} className={styles["content"]}>
      <Typography className={styles["company_descr"]}>
        {companyInfo?.description && companyInfo?.description.length > 15
          ? companyInfo?.description.slice(0, 12) + "..."
          : companyInfo?.description}
      </Typography>
      <Typography className={styles["vacancy_descr"]}>
        {description.length > 25
          ? description.slice(0, 22) + "..."
          : description}
      </Typography>
    </Card>
  );
};
