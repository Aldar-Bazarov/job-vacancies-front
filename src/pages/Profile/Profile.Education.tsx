import { Form, Col, Row, Input, Space, Typography } from "antd";

import React from "react";

import {
  IEditableEducationProps,
  IReadonlyEducationProps
} from "./Profile.Types";
import { ProfileContext } from "./ProfileContext";

export const EditableEducation: React.FC<IEditableEducationProps> = () => {
  const context = React.useContext(ProfileContext);

  return (
    <Row gutter={[12, 12]}>
      <Col span={24}>
        <Form.Item label="Образование">
          <Input
            value={context?.profileData.user.education}
            onChange={(e) =>
              context?.dispatch({
                type: "change_education",
                value: e.target.value
              })
            }
            readOnly={context?.isReadOnly}
          />
        </Form.Item>
        <Form.Item label="Место получения">
          <Input
            value={context?.profileData.user.institution}
            onChange={(e) =>
              context?.dispatch({
                type: "change_institution",
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

export const ReadonlyEducation: React.FC<IReadonlyEducationProps> = () => {
  const context = React.useContext(ProfileContext);
  return (
    <Row gutter={[12, 12]} style={{ minHeight: "172px" }}>
      <Col span={12}>
        <Space direction="vertical" size={1}>
          <Typography.Title level={5}>Образование, год</Typography.Title>
          <Typography.Text>
            {context?.profileData.user.education || "Не указано"}
          </Typography.Text>
        </Space>
      </Col>
      <Col span={12}>
        <Space direction="vertical" size={1}>
          <Typography.Title level={5}>Место получения</Typography.Title>
          <Typography.Text>
            {context?.profileData.user.institution || "Не указано"}
          </Typography.Text>
        </Space>
      </Col>
    </Row>
  );
};
