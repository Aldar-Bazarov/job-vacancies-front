import { Typography, Row, Col, Flex } from "antd";

import { useEffect, useState } from "react";

import { Search } from "@components/Search/Search";
import { isAuthenticated } from "@infrastructure/axios/auth";

import { CompanyCard } from "./CompanyCard/CompanyCard";
import styles from "./Home.module.scss";
import mainLogo from "./MainLogo.png";

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
    imgSrc: "https://cdn-icons-png.flaticon.com/512/154/154870.png"
  },
  {
    id: 1,
    name: "Gazprom",
    link: "link",
    raiting: 5.0,
    responses: 20000,
    imgSrc: "https://cdn-icons-png.flaticon.com/512/154/154870.png"
  },
  {
    id: 2,
    name: "Lukoil",
    link: "link",
    raiting: 5.0,
    responses: 20000,
    imgSrc: "https://cdn-icons-png.flaticon.com/512/154/154870.png"
  },
  {
    id: 3,
    name: "IBM",
    link: "link",
    raiting: 5.0,
    responses: 20000,
    imgSrc: "https://cdn-icons-png.flaticon.com/512/154/154870.png"
  },
  {
    id: 4,
    name: "Microsoft",
    link: "link",
    raiting: 5.0,
    responses: 20000,
    imgSrc: "https://cdn-icons-png.flaticon.com/512/154/154870.png"
  },
  {
    id: 5,
    name: "Tatneft",
    link: "link",
    raiting: 5.0,
    responses: 20000,
    imgSrc: "https://cdn-icons-png.flaticon.com/512/154/154870.png"
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

  return (
    <Flex align="center">
      <div className={styles["home"]}>
        <Typography.Title className={styles["title"]}>
          Работа найдется для каждого
        </Typography.Title>
        <Search
          size="large"
          inputPlaceholder="Профессия, должность или компания..."
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSearch={handleSearch}
        />
        <Typography.Title level={2} className={styles["second-title"]}>
          Лучшие работодатели
        </Typography.Title>
        <Row gutter={[32, 32]} className={styles["companies"]}>
          {mainCards.map((el) => (
            <Col span={8} key={el.id}>
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
        <img src={mainLogo} alt="logo" className={styles["hero-img"]} />
      </div>
    </Flex>
  );
};
