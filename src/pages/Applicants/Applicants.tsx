import { Col, Divider, Row } from "antd";

import { useEffect, useState } from "react";

import { ProfileInfoDto } from "@api/user/types";
import { Card } from "@components/Card";
import { CustomPagination } from "@components/CustomPagination/Pagination";
import { WorkIcon } from "@components/Icons";
import { Search } from "@components/Search/Search";

import styles from "./Applicants.module.scss";
import data from "./mock-applicants.json";

export const Applicants = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const [applicants, setApplicants] = useState<ProfileInfoDto[]>([]);

  useEffect(() => {
    setApplicants(
      data.map((applicant) => {
        return {
          ...applicant,
          status_id: 1
        };
      })
    );
  }, []);

  const handleSearch = () => {
    //TODO поиск исполнителей
    //Посмотри на примере других поисков, там дурацкая система
  };

  return (
    <div className={styles["applicants"]}>
      <Search
        inputPlaceholder="Начните вводить ФИО для поиска..."
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSearch={handleSearch}
      >
        <Search.FilterItem
          title="Сортировка по"
          handleChange={(value: string) => {
            value;
          }}
          options={[
            {
              value: "name",
              label: "Имени"
            }
          ]}
        />
      </Search>
      <Divider />
      <Row gutter={[48, 24]}>
        {applicants.map((applicant) => {
          return (
            <Col span={12} key={applicant.user_id}>
              <Card imageSrc={applicant.user.avatar}>
                <Card.Title>
                  {applicant.user.first_name + " " + applicant.user.last_name}
                </Card.Title>
                <Card.Title level="2">
                  {applicant.user.salary} тыс. руб
                </Card.Title>
                <Card.Property icon={<WorkIcon />}>
                  {applicant.user.experience} года
                </Card.Property>
                <Card.Content>{applicant.user.about}</Card.Content>
              </Card>
            </Col>
          );
        })}
      </Row>
      <CustomPagination total={data.length + 500} handleSearch={handleSearch} />
    </div>
  );
};
