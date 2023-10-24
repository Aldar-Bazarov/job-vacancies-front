import { Outlet } from "react-router-dom";

import { Header } from "@components/Header/Header";

import styles from "./Layout.module.scss";

export const Layout: React.FC = () => (
  <div className={styles["layout"]}>
    <Header />
    <div className={styles["content"]}>
      <Outlet />
    </div>
  </div>
);
