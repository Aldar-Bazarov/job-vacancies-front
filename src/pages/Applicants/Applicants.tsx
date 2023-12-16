import { Col, Row, Typography } from "antd";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { companyApi } from "@api/company/company.api";
import { Responder, respondersApi } from "@api/responders/responders.api";
import { userApi } from "@api/user/user.api";
import { Card } from "@components/Card";
import { Loader } from "@components/Loader/Loader";
import { getRole } from "@infrastructure/axios/auth";
import { Role } from "@interfaces/user";
import { cutText } from "@utils/utils";

export const Applicants = () => {
  const [responds, setResponds] = useState<Responder[]>([]);
  const [loading, setLoading] = useState(false);

  const [userId, setUserId] = useState<number | null>(null);
  const [companyId, setCompanyId] = useState<number | undefined | null>(null);

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

  useEffect(() => {
    if (userId) setLoading(true);
    companyApi
      .getCompanies()
      .then((companies) => {
        return companies.filter((el) => el.owner_id === userId)[0].id;
      })
      .then((company_id) => {
        setCompanyId(company_id);
        return;
      })
      .finally(() => setLoading(false));
  }, [userId]);

  useEffect(() => {
    if (companyId) setLoading(true);
    respondersApi
      .getRespondersByCompany({ company_id: companyId })
      .then((resumes) => {
        setResponds(resumes);
        return;
      })
      .finally(() => setLoading(false));
  }, [companyId]);

  return (
    <>
      <Loader active={loading} />
      <Typography.Title>Отклики на вакансии нашей компании</Typography.Title>
      <Row gutter={[48, 24]}>
        {responds.map((respond) => (
          <Col span={12} key={respond.resume_id}>
            <Link
              to={`/resume/${respond.resume_id}`}
              state={{ responsible: true, vacancy_id: respond.vacancy_id }}
            >
              <Card imageSrc="">
                <Card.Title>{respond.applicant_name}</Card.Title>
                <Card.Title level="2">{respond.vacancy_title}</Card.Title>
                <Card.Content>
                  {cutText(respond.applicant_description, 30)}
                </Card.Content>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};
