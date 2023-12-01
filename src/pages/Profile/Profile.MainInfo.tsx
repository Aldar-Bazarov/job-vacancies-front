import { Form, Col, Row, Input, Space, Typography } from "antd";

import React from "react";

import {
  IEditableMainInfoProps,
  IReadonlyMainInfoProps
} from "./Profile.Types";
import { ProfileContext } from "./ProfileContext";

export const EditableMainInfo: React.FC<IEditableMainInfoProps> = () => {
  const context = React.useContext(ProfileContext);

  return (
    <Row gutter={[12, 12]}>
      <Col span={24}>
        <Form.Item label="Должность">
          <Input
            value={context?.profileData.user.job}
            onChange={(e) =>
              context?.dispatch({
                type: "change_job",
                value: e.target.value
              })
            }
            readOnly={context?.isReadOnly}
          />
        </Form.Item>
      </Col>
    </Row>
  );
};

export const ReadonlyMainInfo: React.FC<IReadonlyMainInfoProps> = () => {
  const context = React.useContext(ProfileContext);
  return (
    <Space direction="vertical" size={1}>
      <Typography.Title level={5}>Должность</Typography.Title>
      <Typography.Text>
        {context?.profileData.user.job || "Не указано"}
      </Typography.Text>
    </Space>
  );
};
