import { Typography } from "antd";

import { FC, ReactNode } from "react";

import styles from "./Card.module.scss";

interface TitleProps {
  level?: "1" | "2";
  children: ReactNode;
}

export const Title: FC<TitleProps> = ({ level = "1", children }) => {
  return (
    <Typography className={styles[`${level === "1" ? "title" : "sub-title"}`]}>
      {children}
    </Typography>
  );
};
