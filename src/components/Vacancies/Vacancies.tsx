import { Col, Divider, Row } from "antd";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { searchApi } from "@api/search/search.api";
import { VacancyInfo } from "@api/vacancies/types";
import { vacanciesApi } from "@api/vacancies/vacancies.api";
import { Card } from "@components/Card";
import { CustomPagination } from "@components/CustomPagination/Pagination";
import { Loader } from "@components/Loader/Loader";
import { Search } from "@components/Search/Search";
import { HardSkills } from "@pages/Profile/Profile.Skills";

import styles from "./Vacancies.module.scss";

export const Vacancies = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [vacancies, setVacancies] = useState<VacancyInfo[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    await searchApi
      .getVacanciesBySearch({
        name: inputValue,
        page
      })
      .then((data) => {
        setVacancies(data.vacancies);
        setTotal(data.total);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    searchApi
      .getVacanciesBySearch({
        name: "",
        page
      })
      .then((data) => {
        setVacancies(data.vacancies);
        setTotal(data.total);
      })
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <>
      <Loader active={loading} />
      <div className={styles["vacancies"]}>
        <Search
          handleSearch={handleSearch}
          inputPlaceholder={"Начните вводить название для поиска..."}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
        <Divider />
        <Row gutter={[32, 32]}>
          {vacancies.map((el) => (
            <Col span={12} key={el.id}>
              <Link to={`/vacancies/${el.id}`}>
                <Card imageSrc="">
                  <Card.Title>
                    {el.name.length > 15
                      ? el.name.slice(0, 12) + "..."
                      : el.name}
                  </Card.Title>
                  <Card.Title level="2">
                    Оплата {el.salary_min} - {el.salary_max} тыс. руб
                  </Card.Title>
                  <Card.Title level="2">
                    Опыт от {el.experience_min} до {el.experience_max} лет
                  </Card.Title>
                  <Card.Content>Занятость: {el.rate.name}</Card.Content>
                  <Card.Content>
                    Требуемые навыки:
                    <HardSkills tags={el.personal_qualities.split(",")} />
                  </Card.Content>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
        <CustomPagination
          total={total}
          handleSearch={(val: number) => setPage(val)}
          current={page}
        />
      </div>
    </>
  );
};
