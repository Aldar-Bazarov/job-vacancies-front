import { Button } from "antd";

import { Link } from "react-router-dom";

import LogoutButton from "@components/LogoutButton/LogoutButton";
import { isAuthenticated } from "@infrastructure/axios/auth";

import styles from "./Header.module.scss";

export const Header = () => {
  const isAuth = isAuthenticated();

  return (
    <div className={styles["header"]}>
      <div className={styles["header-home-button"]}>
        <Link to={"/"}>
          <Button type="primary">Главная страница</Button>
        </Link>
      </div>
      <div className={styles["header-buttons"]}>
        {isAuth && (
          <>
            <Link to={"/profile"}>
              <Button type="primary">Мой профиль</Button>
            </Link>
            <Link to={"/"}>
              <LogoutButton />
            </Link>
          </>
        )}
        {!isAuth && (
          <>
            <Link to={"/auth"}>
              <Button type="primary">Войти</Button>
            </Link>
            <Link to={"/register"}>
              <Button type="primary">Зарегистрироваться</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
