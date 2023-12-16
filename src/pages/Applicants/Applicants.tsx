import { Col, Row } from "antd";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { companyApi } from "@api/company/company.api";
import { Responder, respondersApi } from "@api/responders/responders.api";
import { userApi } from "@api/user/user.api";
import { Card } from "@components/Card";
import { getRole } from "@infrastructure/axios/auth";
import { Role } from "@interfaces/user";
import { cutText } from "@utils/utils";

export const Applicants = () => {
  const [responds, setResponds] = useState<Responder[]>([]);

  const [userId, setUserId] = useState<number | null>(null);
  const [companyId, setCompanyId] = useState<number | undefined | null>(null);

  const apiGetUser = (role: Role) => {
    return userApi.getMyProfile({ role: role }).then((data) => {
      setUserId(data.user_id);
    });
  };

  useEffect(() => {
    apiGetUser(getRole() as Role);
  }, []);

  useEffect(() => {
    if (userId)
      companyApi
        .getCompanies()
        .then((companies) => {
          return companies.filter((el) => el.owner_id === userId)[0].id;
        })
        .then((company_id) => {
          setCompanyId(company_id);
          return;
        });
  }, [userId]);

  useEffect(() => {
    if (companyId)
      respondersApi
        .getRespondersByCompany({ company_id: companyId })
        .then((resumes) => {
          setResponds(resumes);
          return;
        });
  }, [companyId]);

  return (
    <>
      <Row gutter={[48, 24]}>
        {responds.map((respond) => (
          <Col span={12} key={respond.resume_id}>
            <Link to={`/resume/${respond.resume_id}`}>
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
