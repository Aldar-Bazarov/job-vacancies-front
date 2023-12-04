import { Col, Divider, Row } from "antd";

import { useEffect, useState } from "react";

import { CompanyInfoDto } from "@api/company/types";
import { Card } from "@components/Card";
import { CustomPagination } from "@components/CustomPagination/Pagination";
import { EmployeesIcon, ResponseIcon } from "@components/Icons";
import { Search } from "@components/Search/Search";

import styles from "./Companies.module.scss";
import data from "./mock-companies.json";

export const Companies = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const [companies, setCompanies] = useState<CompanyInfoDto[]>([]);

  useEffect(() => {
    setCompanies(data);
  }, []);

  const handleSearch = () => {
    //TODO поиск компаний
  };

  return (
    <div className={styles["companies"]}>
      <Search
        inputPlaceholder="Начните вводить название для поиска..."
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
        {companies.map((company) => {
          return (
            <Col span={12} key={company.id}>
              <Card imageSrc={company.logo}>
                <Card.Title>{company.name}</Card.Title>
                <Card.Title level="2">
                  Средняя з/п {company.avarage_salary} тыс. руб
                </Card.Title>
                <Card.Property icon={<EmployeesIcon />}>
                  {company.employees_count} сотрудников
                </Card.Property>
                <Card.Property icon={<ResponseIcon />}>
                  {company.response_count} откликов
                </Card.Property>
                <Card.Content>{company.description}</Card.Content>
              </Card>
            </Col>
          );
        })}
      </Row>
      <CustomPagination total={data.length + 500} handleSearch={handleSearch} />
    </div>
  );
};
