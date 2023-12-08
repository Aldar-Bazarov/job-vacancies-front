import { Typography } from "antd";

import styles from "./NotFound.module.scss";

export const NotFound = () => {
  return (
    <div className={styles["not-found"]}>
      <Typography.Title level={1}>
        404: Упс, такая страница не найдена!
      </Typography.Title>
      <div className={styles["not-found-image"]} />
    </div>
  );
};
