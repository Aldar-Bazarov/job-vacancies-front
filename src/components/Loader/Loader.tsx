import { Spin } from "antd";

import React from "react";

import styles from "./Loader.module.scss";

export interface LoaderProps {
  active: boolean;
}

const Loader: React.FC<LoaderProps> = ({ active }) => {
  if (!active) {
    return null;
  }
  return (
    <div className={styles["loader-container"]}>
      <Spin className={styles["loader-spin"]} />
    </div>
  );
};

export default Loader;
