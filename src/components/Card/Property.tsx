import { Typography } from "antd";

import { FC } from "react";

import styles from "./Card.module.scss";

interface PropertyProps {
  icon: React.ReactNode;
  children: React.ReactNode;
}

export const Property: FC<PropertyProps> = ({ icon, children }) => {
  return (
    <div className={styles["property"]}>
      {icon}
      <Typography>{children}</Typography>
    </div>
  );
};
