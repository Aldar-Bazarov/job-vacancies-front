import { Col, Row } from "antd";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { VacancyInfo } from "@api/vacancies/types";
import { vacanciesApi } from "@api/vacancies/vacancies.api";
import { Card } from "@components/Card";
import { HardSkills } from "@pages/Profile/Profile.Skills";

import { IVacanciesProps } from "./Company.Types";
import { CompanyContext } from "./CompanyContext";

export const Vacancies = ({ company_id }: IVacanciesProps) => {
  const [vacancies, setVacancies] = useState<VacancyInfo[]>([]);

  useEffect(() => {
    vacanciesApi.getVacancies().then((data) => {
      setVacancies(data);
    });
  }, []);

  return (
    <Row gutter={[12, 12]}>
      {vacancies.map((el) => {
        return (
          el.company_id === company_id && (
            <Col span={12} key={el.id}>
              <Link to={`/vacancies/${el.id}`}>
                <Card imageSrc="">
                  <Card.Title>
                    {el.name.length > 15
                      ? el.name.slice(0, 12) + "..."
                      : el.name}
                  </Card.Title>
                  <Card.Title level="2">
                    Оплата {el.salary_min} - {el.salary_max} тыс. руб
                  </Card.Title>
                  <Card.Title level="2">
                    Опыт от {el.experience_min} до {el.experience_max} лет
                  </Card.Title>
                  <Card.Content>Занятость: {el.rate.name}</Card.Content>
                  <Card.Content>
                    Требуемые навыки:
                    <HardSkills tags={el.personal_qualities.split(",")} />
                  </Card.Content>
                </Card>
              </Link>
            </Col>
          )
        );
      })}
    </Row>
  );
};
