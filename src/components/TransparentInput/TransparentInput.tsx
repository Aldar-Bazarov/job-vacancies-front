import { Input, InputProps, InputRef } from "antd";

import styles from "./TransparentInput.module.scss";

type TransparentInputProps = InputProps & React.RefAttributes<InputRef>;

export default function TransparentInput(props: TransparentInputProps) {
  return <Input className={styles["input-transparent"]} {...props} />;
}
