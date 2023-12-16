import { Button, Col, Row, Divider, Typography, Avatar } from "antd";
import { Flex } from "antd";

import { useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import { resumeApi } from "@api/resume/resume.api";
import { userApi } from "@api/user/user.api";
import { Loader } from "@components/Loader/Loader";

const contactType = [
  { id: 1, contact: "telegram" },
  { id: 2, contact: "WhatsApp" },
  { id: 3, contact: "Email" },
  { id: 4, contact: "Phone" }
];

export const Resume = () => {
  const { state } = useLocation();
  const { resumeId } = useParams();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // eslint-disable-next-line
  const [resume, setResume] = useState<any>(null);
  // eslint-disable-next-line
  const [applicant, setApplicant] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const BACKEND_URL = "https://jobhunter.woopwoopserver.com";

  useEffect(() => {
    if (resumeId) setLoading(true);
    resumeApi
      .getOneResume(+resumeId)
      .then((data) => {
        setResume(data);
        if (data.photo === "" || data.photo === null) {
          setImageUrl(null);
        } else {
          setImageUrl(BACKEND_URL + data.photo);
        }
        userApi.getApplicantById(data.applicant_id).then((userData) => {
          setApplicant(userData.user);
        });
      })
      .finally(() => setLoading(false));
  }, [resumeId]);

  const changeResponseStatus = useCallback((type: "reject" | "admit") => {
    setLoading(true);
    const status_id = type === "admit" ? 2 : 3;
    resumeApi
      .updateResponse({
        resume_id: +resumeId,
        vacancy_id: state.vacancy_id,
        status_id
      })
      .finally(() => setLoading(false));
  }, []);

  if (resume == null || applicant == null) return null;

  return (
    <>
      <Loader active={loading} />
      <Col span={12}>
        <Row align={"middle"}>
          <Avatar size={100} src={imageUrl ?? "/images/default-avatar.jpg"} />
        </Row>
        <Typography.Title>
          {applicant.first_name + " " + applicant.last_name}
        </Typography.Title>
        <Typography.Title level={5}>Название должности</Typography.Title>
        <Typography>{resume.job_title}</Typography>
        <Typography.Title level={5}>Описание резюме</Typography.Title>
        <Typography>{resume.description}</Typography>
      </Col>
      <Divider style={{ borderColor: "#7E7E7E66" }} />
      <Row>
        <Col span={8}>
          <Typography.Title level={4}>Образование</Typography.Title>
          {resume.educations.length !== 0 &&
            resume.educations.map((el) => {
              return (
                <Typography>{el.education.type + " " + el.end_year}</Typography>
              );
            })}
        </Col>
        <Col span={8}>
          <Typography.Title level={4}>Опыт работы</Typography.Title>
        </Col>
        <Col span={8}>
          <Typography.Title level={4}>Контакты</Typography.Title>
          {resume.contacts.length !== 0 &&
            resume.contacts.map((el) => {
              const type = contactType.find(
                (type) => (type.id = el.contact_id)
              );
              return (
                <Typography>{type?.contact + ": " + el.extra_data}</Typography>
              );
            })}
        </Col>
      </Row>
      <Divider style={{ borderColor: "#7E7E7E66" }} />
      <Row>
        <Col span={24}>
          <Typography.Title level={4}>Проффесиональные навыки</Typography.Title>
          {resume.personal_qualities !== "" &&
            resume.personal_qualities.split(",").map((el) => {
              return <Typography>{el}</Typography>;
            })}
        </Col>
      </Row>
      <Divider style={{ borderColor: "#7E7E7E66" }} />
      {state?.responsible && (
        <Flex
          style={{ width: "100%", columnGap: "20px" }}
          justify={"end"}
          align={"end"}
        >
          <Button
            type="dashed"
            htmlType="submit"
            onClick={() => changeResponseStatus("reject")}
          >
            Отказать
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => changeResponseStatus("admit")}
          >
            Принять
          </Button>
        </Flex>
      )}
    </>
  );
};
