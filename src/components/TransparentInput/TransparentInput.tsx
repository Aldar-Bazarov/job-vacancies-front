import { Input, InputProps, InputRef } from "antd";

import styles from "./TransparentInput.module.scss";

type TransparentInputProps = InputProps & React.RefAttributes<InputRef>;

export const TransparentInput: React.FC<TransparentInputProps> = (props) => {
  return <Input className={styles["input-transparent"]} {...props} />;
};
