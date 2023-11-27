import { useState } from "react";

import { Search } from "@components/Search/Search";

import styles from "./Applicants.module.scss";

export const Applicants = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleSearch = () => {
    //TODO поиск исполнителей
  };

  return (
    <div className={styles["applicants"]}>
      <Search
        inputPlaceholder="Начните вводить ФИО для поиска..."
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSearch={handleSearch}
      >
        <Search.FilterItem
          title="Сортировка по"
          handleChange={(value: string) => {
            value;
          }}
          options={[
            {
              value: "name",
              label: "Имени"
            }
          ]}
        />
      </Search>
    </div>
  );
};
