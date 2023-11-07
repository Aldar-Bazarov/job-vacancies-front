import TextArea, { TextAreaProps, TextAreaRef } from "antd/es/input/TextArea";

import styles from "./TransparentTextArea.module.scss";

type TransparentTextArea = TextAreaProps & React.RefAttributes<TextAreaRef>;

export const TransparentTextArea: React.FC<TransparentTextArea> = (props) => {
  return <TextArea className={styles["text-area-transparent"]} {...props} />;
};
