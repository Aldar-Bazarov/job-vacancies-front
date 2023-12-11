import { Col, Row } from "antd";

import React, { useEffect, useState } from "react";

import { VacancyInfo } from "@api/vacancies/types";
import { vacanciesApi } from "@api/vacancies/vacancies.api";
import { VacancyCard } from "@components/Vacancies/VacancyCard";

import { IVacanciesProps } from "./Company.Types";
import { CompanyContext } from "./CompanyContext";

export const Vacancies: React.FC<IVacanciesProps> = () => {
  const context = React.useContext(CompanyContext);
  const [vacancies, setVacancies] = useState<VacancyInfo[]>([]);

  useEffect(() => {
    vacanciesApi.getVacancies().then((data) => {
      setVacancies(data);
    });
  }, []);

  return (
    <Row gutter={[12, 12]}>
      {vacancies.map((el) => (
        <Col span={12} key={el.id}>
          <VacancyCard
            key={el.id}
            company_id={el.company_id}
            description={el.description}
            id={el.id}
          />
        </Col>
      ))}
    </Row>
  );
};
