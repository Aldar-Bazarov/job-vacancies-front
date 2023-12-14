import { Col, Divider, Row } from "antd";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { companyApi } from "@api/company/company.api";
import { CompanyInfoDto } from "@api/company/types";
import { searchApi } from "@api/search/search.api";
import { Card } from "@components/Card";
import { CustomPagination } from "@components/CustomPagination/Pagination";
import { EmployeesIcon, ResponseIcon } from "@components/Icons";
import { Search } from "@components/Search/Search";

import styles from "./Companies.module.scss";
import data from "./mock-companies.json";

export const Companies = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const [companies, setCompanies] = useState<CompanyInfoDto[]>([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number | null>(null);
  const { state } = useLocation();

  useEffect(() => {
    companyApi
      .getCompanies()
      .then((data) => (!state ? setCompanies(data) : null));
  }, []);

  useEffect(() => {
    state?.companies?.companies
      ? setCompanies(state.companies.companies as CompanyInfoDto[])
      : null;

    state?.inputValue ? setInputValue(state?.inputValue) : null;
  }, [state]);

  const handleSearch = () => {
    searchApi
      .getCompanyByProperties({
        name: inputValue,
        ownerId: null,
        description: null,
        page: page
      })
      .then((data) => {
        setPage(data.page);
        setTotal(data.total);
        setCompanies(data.companies);
      });
  };

  const handleChangePage = (val: number) => setPage(val);

  //TODO пагинация непонятно пока, как должна работать
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
        {companies.map((company) => (
          <Col span={12} key={company.id}>
            <Card
              imageSrc={
                import.meta.env.VITE_BASE_API_URL + company?.logo_path?.slice(1)
              }
            >
              <Card.Title>{company.name}</Card.Title>
              <Card.Title level="2">
                Средняя з/п {company.avarage_salary} тыс. руб
              </Card.Title>
              <Card.Property icon={<EmployeesIcon />}>
                {company.population} сотрудников
              </Card.Property>
              <Card.Property icon={<ResponseIcon />}>
                {company.responses_count} откликов
              </Card.Property>
              <Card.Content>{company.description}</Card.Content>
            </Card>
          </Col>
        ))}
      </Row>
      <CustomPagination
        total={total ?? companies?.length}
        handleSearch={handleChangePage}
      />
    </div>
  );
};
