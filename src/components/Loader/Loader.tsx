import { Spin } from "antd";

import React from "react";

import styles from "./Loader.module.scss";

interface ILoaderProps {
  active: boolean;
}

export const Loader: React.FC<ILoaderProps> = ({ active }) => {
  if (!active) {
    return null;
  }
  return (
    <div className={styles["loader-container"]}>
      <Spin className={styles["loader-spin"]} />
    </div>
  );
};
