import { Col, Divider, Row } from "antd";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { resumeApi } from "@api/resume/resume.api";
import { Card } from "@components/Card";
import { CustomPagination } from "@components/CustomPagination/Pagination";
import { Loader } from "@components/Loader/Loader";
import { Search } from "@components/Search/Search";
import { cutText } from "@utils/utils";

import styles from "./Resumes.module.scss";

export const Resumes = () => {
  const [name, setName] = useState("");
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    resumeApi
      .getResumes()
      .then((data) => {
        setResumes(data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles["resumes"]}>
      <Search
        inputPlaceholder="Начните вводить название для поиска..."
        inputValue={name}
        setInputValue={setName}
        handleSearch={() => {}}
      />
      <Divider />
      <Row gutter={[48, 24]}>
        {resumes.map(
          (resume: { id: number; job_title: string; description: string }) => (
            <Col span={12} key={resume.id}>
              <Link to={`/resume/${resume.id}`} state={{ responsible: false }}>
                <Card
                  imageSrc={
                    resume?.logo_path?.slice(1)
                      ? import.meta.env.VITE_BASE_API_URL +
                        resume?.logo_path?.slice(1)
                      : "/images/default-avatar.jpg"
                  }
                >
                  <Card.Title>{resume.job_title}</Card.Title>
                  <Card.Content>
                    {cutText(resume.description, 130)}
                  </Card.Content>
                </Card>
              </Link>
            </Col>
          )
        )}
      </Row>
      <CustomPagination current={1} total={10} handleSearch={() => {}} />
      <Loader active={loading} />
    </div>
  );
};
