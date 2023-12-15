import { Pagination } from "antd";

import { FC } from "react";

import styles from "./CustomPagination.module.scss";

interface CustomPaginationProps {
  total: number;
  current: number;
  handleSearch: (val: number) => void;
}

export const CustomPagination: FC<CustomPaginationProps> = ({
  total,
  current,
  handleSearch
}) => {
  return (
    <Pagination
      total={total}
      current={current}
      defaultCurrent={1}
      showSizeChanger={false}
      showQuickJumper={false}
      className={styles["pagination"]}
      onChange={handleSearch}
      itemRender={(_, type, originalElement) => {
        return type === "jump-next" || type === "jump-prev" ? (
          <span className="ellipsis">...</span>
        ) : (
          originalElement
        );
      }}
    />
  );
};
