import { Select, Space, Typography } from "antd";

import { FC } from "react";

import styles from "./Search.module.scss";

interface FilterItemProps {
  title: string;
  handleChange: (value: string) => void;
  options: { value: string; label: string }[];
}

export const FilterItem: FC<FilterItemProps> = ({
  title,
  handleChange,
  options
}) => {
  return (
    <Space className={styles[`filter-item`]} direction="vertical">
      <Typography className={styles[`filter-item-title`]}>{title}</Typography>
      <Select
        className={styles[`filter-item-select`]}
        style={{ backgroundColor: "#252525" }}
        defaultValue={options[0].value}
        onChange={handleChange}
        options={options}
      />
    </Space>
  );
};
