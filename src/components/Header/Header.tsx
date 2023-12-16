import { Popover, Typography } from "antd";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { UserOutlined } from "@ant-design/icons";
import LogoutButton from "@components/LogoutButton/LogoutButton";
import { getRole, isAuthenticated } from "@infrastructure/axios/auth";

import styles from "./Header.module.scss";

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
        <Link to={"/companies"}>
          <Typography.Title level={5} className={styles["item"]}>
            Компании
          </Typography.Title>
        </Link>
        {getRole() === "recruiters" && (
          <>
            <Link to={"/resumes"}>
              <Typography.Title level={5} className={styles["item"]}>
                Резюме
              </Typography.Title>
            </Link>
            <Link to={"/applicants"}>
              <Typography.Title level={5} className={styles["item"]}>
                Отклики
              </Typography.Title>
            </Link>
          </>
        )}
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

const PopoverContent = () => {
  const [isAuth, setAuth] = useState<boolean>();
  const [role, setRole] = useState<string>();

  useEffect(() => {
    setAuth(isAuthenticated());
    setRole(getRole());
  }, []);

  return (
    <div>
      {isAuth ? (
        <>
          <Link to={"/profile"}>
            <Typography>Мой профиль</Typography>
          </Link>
          {role === "applicants" && (
            <Link to={"/resume/create"}>
              <Typography>Моё резюме</Typography>
            </Link>
          )}{" "}
          {role === "recruiters" && (
            <Link to={"/company/create"}>
              <Typography>Компания</Typography>
            </Link>
          )}
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
