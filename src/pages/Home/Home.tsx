import { Typography, Row, Col, Flex, message } from "antd";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { companyApi } from "@api/company/company.api";
import { CompanyInfoDto } from "@api/company/types";
import { searchApi } from "@api/search/search.api";
import { Search } from "@components/Search/Search";
import { isAuthenticated } from "@infrastructure/axios/auth";

import { CompanyCard } from "./CompanyCard/CompanyCard";
import styles from "./Home.module.scss";
import heroImage from "./MainLogo.png";

export const Home: React.FC = () => {
  const [isAuth, setAuth] = useState(isAuthenticated());
  const [companies, setCompanies] = useState<CompanyInfoDto[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    setAuth(isAuthenticated());
  }, [isAuth]);

  useEffect(() => {
    companyApi
      .getCompanies()
      .then((data) => {
        setCompanies(data.length < 7 ? data : data.slice(0, 6));
      })
      .catch((error) => message.error(error.message));
  }, []);

  const handleSearch = () => {
    searchApi
      .getCompanyByProperties({
        name: inputValue,
        ownerId: null,
        description: null
      })
      .then((data) => {
        navigate("/companies", {
          state: {
            companies: data,
            inputValue
          }
        });
      });
  };

  return (
    <Flex align="center">
      <div className={styles["home"]}>
        <Typography.Title className={styles["title"]}>
          Работа найдется для каждого
        </Typography.Title>
        <Search
          size="large"
          inputPlaceholder="Поиск по компаниям..."
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSearch={handleSearch}
        />
        <Typography.Title level={2} className={styles["second-title"]}>
          Лучшие работодатели
        </Typography.Title>
        <Row gutter={[32, 32]} className={styles["companies"]}>
          {companies.map((el) => (
            <Col span={8} key={el.id}>
              <CompanyCard
                id={el.id}
                description={el.description}
                name={el.name}
                key={el.id}
              />
            </Col>
          ))}
        </Row>
        <img src={heroImage} alt="heroImage" className={styles["hero-img"]} />
      </div>
    </Flex>
  );
};
