import { Button, Typography, Input, Row, Col, Flex } from "antd";

import { useEffect, useState } from "react";

import { isAuthenticated } from "@infrastructure/axios/auth";

import { CompanyCard } from "./CompanyCard/CompanyCard";
import styles from "./Home.module.scss";

//TODO исправить на запрос за данными
//Там фильтруем по количеству откликов и берем 6 самых рейтинговых
//Пока затычка, потому что не хочется в данный момент этим заниматься, извините:)
const mainCards = [
  {
    id: 0,
    name: "Apple",
    link: "apple.com",
    raiting: 5.0,
    responses: 20000,
    imgSrc: "img"
  },
  {
    id: 1,
    name: "Gazprom",
    link: "link",
    raiting: 5.0,
    responses: 20000,
    imgSrc: "img"
  },
  {
    id: 2,
    name: "Lukoil",
    link: "link",
    raiting: 5.0,
    responses: 20000,
    imgSrc: "img"
  },
  {
    id: 3,
    name: "IBM",
    link: "link",
    raiting: 5.0,
    responses: 20000,
    imgSrc: "img"
  },
  {
    id: 4,
    name: "Microsoft",
    link: "link",
    raiting: 5.0,
    responses: 20000,
    imgSrc: "img"
  },
  {
    id: 5,
    name: "Tatneft",
    link: "link",
    raiting: 5.0,
    responses: 20000,
    imgSrc: "img"
  }
];

export const Home: React.FC = () => {
  const [isAuth, setAuth] = useState(isAuthenticated());
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    setAuth(isAuthenticated());
  }, [isAuth]);

  const handleSearch = () => {
    //TODO линк на страницу с поиском вакансий
    //в качестве queryparam - inputValue
  };

  const homeInputPlaceholder = "Профессия, должность или компания...";
  return (
    <Flex align="center" className={styles["container"]}>
      <div className={styles["home"]}>
        <Typography.Title className={styles["title"]}>
          Работа найдется для каждого
        </Typography.Title>
        <div className={styles["search"]}>
          <Input
            className={styles["search-input"]}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={homeInputPlaceholder}
          />
          <Button className={styles["search-btn"]} onClick={handleSearch}>
            Искать
          </Button>
        </div>
        <Typography.Title level={2} className={styles["second-title"]}>
          Лучшие работодатели
        </Typography.Title>
        <Row gutter={[32, 32]}>
          {mainCards.map((el) => (
            <Col span={8}>
              <CompanyCard
                link={el.link}
                name={el.name}
                raiting={el.raiting}
                responses={el.responses}
                key={el.id}
                imgSrc={el.imgSrc}
              />
            </Col>
          ))}
        </Row>
      </div>
    </Flex>
  );
};
