import { Col, Divider, Row } from "antd";

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { companyApi } from "@api/company/company.api";
import { CompanyInfoDto } from "@api/company/types";
import { searchApi } from "@api/search/search.api";
import { Card } from "@components/Card";
import { CustomPagination } from "@components/CustomPagination/Pagination";
import { EmployeesIcon, ResponseIcon } from "@components/Icons";
import { Loader } from "@components/Loader/Loader";
import { Search } from "@components/Search/Search";
import { cutText } from "@utils/utils";

import styles from "./Companies.module.scss";

export const Companies = () => {
  const [name, setName] = useState("");
  const [companies, setCompanies] = useState<CompanyInfoDto[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const { state } = useLocation();

  useEffect(() => {
    state?.companies?.companies
      ? setCompanies(state.companies.companies as CompanyInfoDto[])
      : companyApi.getCompanies().then((data) => {
          setTotal(data.length);
          fetchCompanies(page);
        });

    state?.inputValue ? setName(state.inputValue) : null;
  }, []);

  const handleSearch = () => {
    setPage(1);
    fetchCompanies(1);
  };

  const handleChangePage = (val: number) => {
    fetchCompanies(val);
    setPage(val);
  };

  const fetchCompanies = async (page: number) => {
    setLoading(true);
    await searchApi
      .getCompanyByProperties({
        name,
        ownerId: null,
        description: null,
        page
      })
      .then((data) => {
        setCompanies(data.companies);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className={styles["companies"]}>
      <Search
        inputPlaceholder="Начните вводить название для поиска..."
        inputValue={name}
        setInputValue={setName}
        handleSearch={handleSearch}
      />
      <Divider />
      <Row gutter={[48, 24]}>
        {companies.map((company) => (
          <Col span={12} key={company.id}>
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
                  Средняя з/п {company.avarage_salary} тыс. руб
                </Card.Title>
                <Card.Property icon={<EmployeesIcon />}>
                  {company.population} сотрудников
                </Card.Property>
                <Card.Property icon={<ResponseIcon />}>
                  {company.responses_count} откликов
                </Card.Property>
                <Card.Content>{cutText(company.description, 130)}</Card.Content>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
      <CustomPagination
        current={page}
        total={total}
        handleSearch={handleChangePage}
      />
      <Loader active={loading} />
    </div>
  );
};
