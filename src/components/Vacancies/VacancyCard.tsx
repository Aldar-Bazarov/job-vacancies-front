import { Card, Flex, Typography } from "antd";

import { useMemo, useState, useEffect } from "react";

// import { companyApi } from "@api/company/company.api";
import { CompanyInfoDto } from "@api/company/types";

import mock from "./mock-vacancy-card.json";
import styles from "./VacancyCard.module.scss";

interface IVacancyCardProps {
  id: number;
  description: string;
  company_id: number;
}

export const VacancyCard = ({ company_id, description }: IVacancyCardProps) => {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfoDto>();

  useEffect(() => {
    // companyApi.getCompany(company_id).then((data) => setCompanyInfo(data));
    setCompanyInfo({
      ...mock,
      created_at: new Date(mock.created_at),
      description,
      vacancies: mock.vacancies.map((v) => ({
        ...v,
        created_at: new Date(v.created_at)
      }))
    });
  }, [company_id, description]);

  const titleComponent = useMemo(() => {
    return (
      <Flex justify="start" align="center" gap={30}>
        <img src={companyInfo?.logo} width={50} height={50} />
        <Typography.Title level={3} style={{ margin: 0 }}>
          {companyInfo?.name}
        </Typography.Title>
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
