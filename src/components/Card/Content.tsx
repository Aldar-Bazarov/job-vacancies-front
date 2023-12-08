import { Typography } from "antd";

import { FC, ReactNode } from "react";

interface ContentPpops {
  children: ReactNode;
}

export const Content: FC<ContentPpops> = ({ children }) => {
  return <Typography>{children}</Typography>;
};
