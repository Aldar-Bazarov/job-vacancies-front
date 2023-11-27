import { Card, Flex, Typography } from "antd";

import styles from "./CompanyCard.module.scss";
import linkSvg from "./LinkTo.svg";

interface ICompanyCardProps {
  name: string;
  link: string;
  raiting: number;
  responses: number;
  imgSrc: string;
}

export const CompanyCard = ({
  link,
  raiting,
  responses,
  imgSrc
}: ICompanyCardProps) => {
  const titleComponent = (
    <Flex className={styles["header"]} justify="space-between" align="center">
      <img src={imgSrc} width={50} height={50} />
      <a href={link}>
        <img src={linkSvg} />
      </a>
    </Flex>
  );
  return (
    <Card title={titleComponent} className={styles["card"]}>
      <Flex justify="space-between" className={styles["card-inner"]}>
        <Typography className={styles["metric"]}>
          {responses} откликов
        </Typography>
        <Typography className={styles["metric"]}>
          {parseFloat(raiting.toString()).toFixed(1)} рейтинг
        </Typography>
      </Flex>
    </Card>
  );
};
