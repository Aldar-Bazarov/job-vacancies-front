import { Button, Col, Flex, Row, Typography } from "antd";

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { CompanyInfoDto, companyApi } from "@api/company/company.api";
import { VacancyInfo } from "@api/vacancies/types";
import { vacanciesApi } from "@api/vacancies/vacancies.api";
import { Card } from "@components/Card";
import { getRole } from "@infrastructure/axios/auth";
import { HardSkills } from "@pages/Profile/Profile.Skills";

import styles from "./Vacancy.module.scss";

export const Vacancy = () => {
  const { vacancyId } = useParams();
  const [vacancy, setVacancy] = useState<VacancyInfo | null>(null);
  const [company, setCompany] = useState<CompanyInfoDto | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (vacancyId)
      vacanciesApi.getVacancyById(+vacancyId).then((data) => setVacancy(data));
  }, [vacancyId]);

  useEffect(() => {
    if (vacancy?.company_id)
      companyApi
        .getCompanyById(+vacancy.company_id)
        .then((data) => setCompany(data));
  }, [vacancy]);

  const handleRespond = () => {
    //TODO сделать откликнуться
    console.log("Я откликнулся!");
  };

  return (
    vacancy &&
    company && (
      <div>
        <Row gutter={[32, 32]}>
          <Col span={12}>
            <Card imageSrc="">
              <Card.Title>{vacancy.name}</Card.Title>
              <Card.Title level="2">
                От {vacancy.salary_min} 000 до {vacancy.salary_max} 000 на руки
              </Card.Title>
              <Card.Content>
                Требуемый опыт работы {vacancy.experience_min} -{" "}
                {vacancy.experience_max} года
              </Card.Content>
              <Card.Content>{vacancy.rate.name}</Card.Content>
            </Card>
          </Col>
          <Col span={12}>
            <Link to={`/company/${company.id}`}>
              <Card imageSrc={company.logo_path}>
                <Card.Title>{company.name}</Card.Title>
                <Card.Title level="2">
                  Численность сотрудников более {company.population}
                </Card.Title>
                <Card.Content>Адрес: {company.address}</Card.Content>
              </Card>
            </Link>
          </Col>
        </Row>
        <hr className={styles["hr"]} />
        <Typography.Title level={2}>Требования</Typography.Title>
        <Typography.Text>{vacancy.description}</Typography.Text>
        <hr className={styles["hr"]} />
        <Typography.Title level={2}>Проф. навыки</Typography.Title>
        <HardSkills tags={vacancy.personal_qualities.split(",")} />
        <hr className={styles["hr"]} />
        <Flex style={{ width: "100%" }} justify={"end"} align={"end"} gap={30}>
          <Button type="text" size="large" onClick={() => navigate(-1)}>
            Назад
          </Button>
          {getRole() === "applicants" && (
            <Button type="primary" size="large" onClick={handleRespond}>
              Откликнуться
            </Button>
          )}
        </Flex>
      </div>
    )
  );
};
