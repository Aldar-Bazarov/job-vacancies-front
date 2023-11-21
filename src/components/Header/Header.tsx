import { Popover, Typography } from "antd";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { UserOutlined } from "@ant-design/icons";
import LogoutButton from "@components/LogoutButton/LogoutButton";
import { isAuthenticated } from "@infrastructure/axios/auth";

import styles from "./Header.module.scss";

const PopoverContent = () => {
  const [isAuth, setAuth] = useState<boolean>();

  useEffect(() => {
    setAuth(isAuthenticated());
  }, []);

  return (
    <div>
      {isAuth ? (
        <>
          <Link to={"/profile"}>
            <Typography>Мой профиль</Typography>
          </Link>
          <LogoutButton setAuth={setAuth}></LogoutButton>
        </>
      ) : (
        <>
          <Link to={"/auth"}>
            <Typography>Войти</Typography>
          </Link>
          <Link to={"/register"}>
            <Typography>Зарегистрироваться</Typography>
          </Link>
        </>
      )}
    </div>
  );
};

export const Header: React.FC = () => {
  return (
    <div className={styles["header"]}>
      <div className={styles["items"]}>
        <Link to={"/"}>
          <Typography.Title className={styles["logo"]}>VPI</Typography.Title>
        </Link>
        <Link to={"/vacancies"}>
          <Typography.Title level={5} className={styles["item"]}>
            Вакансии
          </Typography.Title>
        </Link>
        <Link to={"/executors"}>
          <Typography.Title level={5} className={styles["item"]}>
            Исполнители
          </Typography.Title>
        </Link>
        <Link to={"/companies"}>
          <Typography.Title level={5} className={styles["item"]}>
            Компании
          </Typography.Title>
        </Link>
      </div>
      <div className={styles["profile"]}>
        <Popover
          trigger="click"
          placement="bottomRight"
          content={PopoverContent}
        >
          <UserOutlined />
        </Popover>
      </div>
    </div>
  );
};
