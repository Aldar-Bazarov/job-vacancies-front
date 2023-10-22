import { Link } from "react-router-dom";

import styles from "./Home.module.scss";

export const Home: React.FC = () => {
  return (
    <div className={styles["home"]}>
      Домашнаяя страница приложения
      <nav>
        <ul>
          <li>
            <Link to={`auth`}>Войти</Link>
          </li>
          <li>
            <Link to={`registration`}>Зарегистрироваться</Link>
          </li>
          <li>
            <Link to={`user`}>Пользователь</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
