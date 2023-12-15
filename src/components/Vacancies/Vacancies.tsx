import { Col, Row } from "antd";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { searchApi } from "@api/search/search.api";
import { VacancyInfo } from "@api/vacancies/types";
import { vacanciesApi } from "@api/vacancies/vacancies.api";
import { Card } from "@components/Card";
import { CustomPagination } from "@components/CustomPagination/Pagination";
import { Search } from "@components/Search/Search";
import { HardSkills } from "@pages/Profile/Profile.Skills";

import styles from "./Vacancies.module.scss";

export const Vacancies = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [vacancies, setVacancies] = useState<VacancyInfo[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  //Мне честно ок, мы уже все равно не можем ждать, пока они сделают норм поиск)))
  const handleSearch = async () => {
    let result: VacancyInfo[] = [];

    await searchApi
      .getVacanciesBySearch({
        description: inputValue,
        rate_id: 1
      })
      .then((data) => {
        result = result.concat(data.vacancies);
      });

    await searchApi
      .getVacanciesBySearch({
        description: inputValue,
        rate_id: 2
      })
      .then((data) => {
        result = result.concat(data.vacancies);
      });

    await searchApi
      .getVacanciesBySearch({
        description: inputValue,
        rate_id: 3
      })
      .then((data) => {
        result = result.concat(data.vacancies);
      });

    setVacancies(result);
    setTotal(result.length);
  };

  useEffect(() => {
    console.log(vacancies);
  }, [vacancies]);

  useEffect(() => {
    vacanciesApi.getVacancies().then((data) => {
      setVacancies(data);
    });
  }, []);

  const handleChangePage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  //TODO сменить описание на имя бы
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
            <Link to={`/vacancies/${el.id}`}>
              <Card imageSrc="">
                <Card.Title>
                  {el.name.length > 15 ? el.name.slice(0, 12) + "..." : el.name}
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
        handleSearch={(val: number) => setCurrentPage(val)}
        current={currentPage}
      />
    </div>
  );
};
