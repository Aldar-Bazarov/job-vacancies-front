import { Avatar } from "antd";

import { FC, ReactNode } from "react";

import styles from "./Card.module.scss";
import { Content } from "./Content";
import { Property } from "./Property";
import { Title } from "./Title";

interface CardProps {
  imageSrc?: string;
  children: ReactNode;
}

type ICard = FC<CardProps> & { Title: typeof Title } & {
  Property: typeof Property;
} & { Content: typeof Content };

export const Card: ICard = ({ imageSrc, children }) => {
  return (
    <div className={styles["card"]}>
      {imageSrc && (
        <Avatar
          shape="square"
          src={<img src={imageSrc} alt="avatar" />}
          className={styles["avatar"]}
        />
      )}
      <div className={styles["info"]}>{children}</div>
    </div>
  );
};

Card.Title = Title;
Card.Property = Property;
Card.Content = Content;
