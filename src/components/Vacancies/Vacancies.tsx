import { Col, Row } from "antd";

import { useState, useEffect } from "react";

import { VacancyInfo } from "@api/vacancies/types";
// import { vacanciesApi } from "@api/vacancies/vacancies.api";
import { CustomPagination } from "@components/CustomPagination/Pagination";
import { Search } from "@components/Search/Search";

import data from "./mock-vacancies.json";
import styles from "./Vacancies.module.scss";
import { VacancyCard } from "./VacancyCard";

export const Vacancies = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [vacancies, setVacancies] = useState<VacancyInfo[]>([]);
  // const [currentPage, setCurrentPage] = useState<number>(1);
  // const [totalCount, setTotalCount] = useState<number>(1);

  const handleSearch = () => {
    //TODO сделать поиск по компании. Опять же непонятно, а как именно искать то?
  };

  const handleChangePage = () => {
    //TODO а нам нужны уже какие-то данные собственно для этого
  };

  useEffect(() => {
    setVacancies(
      data.map((v) => ({ ...v, created_at: new Date(v.created_at) }))
    );
  }, []);

  // useEffect(() => {
  //   vacanciesApi.getVacancies().then((data) => {
  //     setTotalCount(data.length);
  //     setVacancies(data);
  //   });
  // }, []);

  // const handleDownload = () => {
  //   setCurrentPage((prev) => prev + 1);
  // };

  return (
    <div className={styles["vacancies"]}>
      <Search
        handleSearch={handleSearch}
        inputPlaceholder={"Введите вакансию..."}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
      <hr className={styles["hr"]} />
      <Row gutter={[32, 32]}>
        {vacancies.map((el) => (
          <Col span={12} key={el.id}>
            <VacancyCard
              key={el.id}
              company_id={el.company_id}
              description={el.description}
              id={el.id}
            />
          </Col>
        ))}
      </Row>
      <CustomPagination
        total={data.length + 500}
        handleSearch={handleChangePage}
      />
    </div>
  );
};
