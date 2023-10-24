import { useEffect, useState } from "react";

import { isAuthenticated } from "@infrastructure/axios/auth";

import styles from "./Home.module.scss";

export const Home: React.FC = () => {
  const [isAuth, setAuth] = useState(isAuthenticated());

  useEffect(() => {
    setAuth(isAuthenticated());
  }, [isAuth]);

  return <div className={styles["home"]}>Тут будет инфа о нашем сервисе</div>;
};
