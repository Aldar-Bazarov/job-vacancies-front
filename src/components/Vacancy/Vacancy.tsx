import { Button, Col, Flex, Row, Typography } from "antd";

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { CompanyInfoDto, companyApi } from "@api/company/company.api";
import { resumeApi } from "@api/resume/resume.api";
import { userApi } from "@api/user/user.api";
import { VacancyInfo } from "@api/vacancies/types";
import { vacanciesApi } from "@api/vacancies/vacancies.api";
import { Card } from "@components/Card";
import { Loader } from "@components/Loader/Loader";
import { getRole } from "@infrastructure/axios/auth";
import { Role } from "@interfaces/user";
import { HardSkills } from "@pages/Profile/Profile.Skills";

import styles from "./Vacancy.module.scss";

export const Vacancy = () => {
  const { vacancyId } = useParams();
  const [vacancy, setVacancy] = useState<VacancyInfo | null>(null);
  const [company, setCompany] = useState<CompanyInfoDto | null>(null);
  const navigate = useNavigate();
  const [userId, setUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (vacancyId) {
      setLoading(true);
      vacanciesApi
        .getVacancyById(+vacancyId)
        .then((data) => setVacancy(data))
        .finally(() => setLoading(false));
    }
  }, [vacancyId]);

  useEffect(() => {
    if (vacancy?.company_id) {
      setLoading(true);
      companyApi
        .getCompanyById(+vacancy.company_id)
        .then((data) => setCompany(data))
        .finally(() => setLoading(false));
    }
  }, [vacancy]);

  const apiGetUser = (role: Role) => {
    return userApi
      .getMyProfile({ role: role })
      .then((data) => {
        setUserId(data.user_id);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    apiGetUser(getRole() as Role);
  }, []);

  const handleRespond = async () => {
    if (getRole() === Role.Applicants) {
      const resumes = await resumeApi.getResumes();
      const currentResume = resumes.filter(
        (el) => +el.applicant_id === +userId
      );
      await resumeApi.response({
        resume_id: currentResume[0].id,
        vacancy_id: vacancy?.id
      });
    }
  };

  return (
    <>
      <Loader active={loading} />
      {vacancy && company && (
        <div>
          <Row gutter={[32, 32]}>
            <Col span={12}>
              <Card imageSrc="">
                <Card.Title>{vacancy.name}</Card.Title>
                <Card.Title level="2">
                  От {vacancy.salary_min} 000 до {vacancy.salary_max} 000 на
                  руки
                </Card.Title>
                <Card.Content>
                  Требуемый опыт работы {vacancy.experience_min} -{" "}
                  {vacancy.experience_max} года
                </Card.Content>
                <Card.Content>{vacancy?.rate.name}</Card.Content>
              </Card>
            </Col>
            <Col span={12}>
              <Link to={`/company/${company.id}`}>
                <Card
                  imageSrc={
                    company?.logo_path?.slice(1)
                      ? import.meta.env.VITE_BASE_API_URL +
                        company?.logo_path?.slice(1)
                      : "/images/default-avatar.jpg"
                  }
                >
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
          <Flex
            style={{ width: "100%" }}
            justify={"end"}
            align={"end"}
            gap={30}
          >
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
      )}
    </>
  );
};
