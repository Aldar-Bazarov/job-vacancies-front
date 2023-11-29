import { Button, Col, Flex, Pagination, Row, Typography } from "antd";

import { useState, useEffect } from "react";

import { VacancyInfo } from "@api/vacancies/types";
import { vacanciesApi } from "@api/vacancies/vacancies.api";
import { Search } from "@components/Search/Search";

import styles from "./Vacancies.module.scss";
import { VacancyCard } from "./VacancyCard";

const DEFAULT_PAGE_SIZE = 6;

export const Vacancies = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [vacancies, setVacancies] = useState<VacancyInfo[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(1);

  const handleSearch = () => {
    //TODO сделать поиск по компании. Опять же непонятно, а как именно искать то?
  };

  useEffect(() => {
    vacanciesApi.getVacancies().then((data) => {
      setTotalCount(data.length);
      setVacancies(data);
    });
  }, []);

  const handleDownload = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <>
      <Search
        handleSearch={handleSearch}
        inputPlaceholder={"Введите вакансию..."}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
      <hr className={styles["hr"]} />
      <Row gutter={[32, 32]}>
        {vacancies.map(
          (el, index) =>
            index < DEFAULT_PAGE_SIZE * currentPage && (
              <Col span={12} key={el.id}>
                <VacancyCard
                  key={el.id}
                  company_id={el.company_id}
                  description={el.description}
                  id={el.id}
                />
              </Col>
            )
        )}
      </Row>
      <Flex
        justify="center"
        align="center"
        className={styles["button-container"]}
      >
        <Button
          disabled={
            (currentPage + 1) * DEFAULT_PAGE_SIZE >
            totalCount + DEFAULT_PAGE_SIZE
          }
          onClick={handleDownload}
        >
          Загрузить еще
        </Button>
      </Flex>
    </>
  );
};
