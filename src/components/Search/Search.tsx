import { Button, Input } from "antd";

import { FC, useState } from "react";

import { FilterIcon } from "./FilterIcon";
import { FilterItem } from "./FilterItem";
import styles from "./Search.module.scss";

interface SearchProps {
  size?: "large" | "small";
  inputPlaceholder: string;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
  children?: React.ReactNode;
}

export const Search: FC<SearchProps> & { FilterItem: typeof FilterItem } = ({
  size = "small",
  inputPlaceholder,
  inputValue,
  setInputValue,
  handleSearch,
  children
}) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <>
      <div className={styles[`search-${size}`]}>
        <Input
          className={styles["input"]}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={inputPlaceholder}
        />
        <Button className={styles["btn"]} onClick={handleSearch}>
          Искать
        </Button>
        {size === "small" && (
          <Button
            className={styles["filter-btn"]}
            onClick={() => setShowFilters(!showFilters)}
          >
            <FilterIcon />
          </Button>
        )}
      </div>
      {showFilters && <div className={styles["filters"]}>{children}</div>}
    </>
  );
};

Search.FilterItem = FilterItem;
