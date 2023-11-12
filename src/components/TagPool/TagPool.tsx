import type { InputRef } from "antd";
import { Input, Space, Tag, Tooltip } from "antd";

import React, { useEffect, useRef, useState, SetStateAction } from "react";

import { PlusOutlined } from "@ant-design/icons";

import styles from "./TagPool.module.scss";

interface ITagPoolProps {
  tags: string[];
  setTags: React.Dispatch<SetStateAction<string[]>>;
  readOnly?: boolean;
}

export const TagPool: React.FC<ITagPoolProps> = ({
  tags,
  setTags,
  readOnly
}) => {
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");
  const inputRef = useRef<InputRef>(null);
  const editInputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [editInputValue]);

  const handleClose = (removedTag: string) => {
    if (!readOnly) {
      const newTags = tags.filter((tag) => tag !== removedTag);
      setTags(newTags);
    }
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!readOnly) {
      setInputValue(e.target.value);
    }
  };

  const handleInputConfirm = () => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!readOnly) {
      setEditInputValue(e.target.value);
    }
  };

  const handleEditInputConfirm = () => {
    if (!readOnly) {
      const newTags = [...tags];
      newTags[editInputIndex] = editInputValue;
      setTags(newTags);
      setEditInputIndex(-1);
      setEditInputValue("");
    }
  };

  return (
    <Space size={[0, 8]} wrap>
      {tags.map((tag, index) => {
        if (editInputIndex === index) {
          return (
            <Input
              ref={editInputRef}
              key={tag}
              size="small"
              className={styles["tagInput"]}
              value={editInputValue}
              onChange={handleEditInputChange}
              onBlur={handleEditInputConfirm}
              onPressEnter={handleEditInputConfirm}
            />
          );
        }
        const isLongTag = tag.length > 20;
        const tagElem = (
          <Tag
            key={tag}
            closable={!readOnly}
            style={{ userSelect: "none" }}
            onClose={() => handleClose(tag)}
          >
            <span
              onDoubleClick={(e) => {
                if (!readOnly) {
                  setEditInputIndex(index);
                  setEditInputValue(tag);
                  e.preventDefault();
                }
              }}
            >
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </span>
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}

      {!readOnly &&
        (inputVisible ? (
          <Input
            ref={inputRef}
            type="text"
            size="small"
            className={styles["tagInput"]}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputConfirm}
            onPressEnter={handleInputConfirm}
            readOnly={readOnly}
          />
        ) : (
          <Tag
            className={styles["tagPlus"]}
            icon={<PlusOutlined />}
            onClick={showInput}
          >
            Добавить
          </Tag>
        ))}
    </Space>
  );
};
