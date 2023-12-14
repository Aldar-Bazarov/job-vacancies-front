import { Card, Flex, Typography } from "antd";

import { Link } from "react-router-dom";

import styles from "./CompanyCard.module.scss";
import linkSvg from "./LinkTo.svg";

interface ICompanyCardProps {
  id?: number;
  name: string;
  description: string;
}

export const CompanyCard = ({ id, name, description }: ICompanyCardProps) => {
  const titleComponent = (
    <Flex className={styles["header"]} justify="space-between" align="center">
      {/* TODO изображения в базе нет, будет?
      // <img src={imgSrc} width={50} height={50} /> */}
      <Typography>{name}</Typography>
      <Link to={`/companies/${id}`}>
        <img src={linkSvg} />
      </Link>
    </Flex>
  );

  return (
    <Card title={titleComponent} className={styles["card"]}>
      <Flex justify="space-between" className={styles["card-inner"]}>
        <Typography className={styles["metric"]}>
          {description.length > 20
            ? description.slice(0, 17) + "..."
            : description}
        </Typography>
      </Flex>
    </Card>
  );
};
