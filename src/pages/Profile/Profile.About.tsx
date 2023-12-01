import { Form, Col, Row, Space, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";

import React from "react";

import { IEditableAboutProps, IReadonlyAboutProps } from "./Profile.Types";
import { ProfileContext } from "./ProfileContext";

export const EditableAbout: React.FC<IEditableAboutProps> = () => {
  const context = React.useContext(ProfileContext);

  return (
    <Row gutter={[12, 12]}>
      <Col span={24}>
        <Form.Item label="О себе">
          <TextArea
            value={context?.profileData.user.about}
            onChange={(e) =>
              context?.dispatch({
                type: "change_about",
                value: e.target.value
              })
            }
            rows={4}
            style={{ height: 120, resize: "none" }}
            readOnly={context?.isReadOnly}
          />
        </Form.Item>
      </Col>
    </Row>
  );
};

export const ReadonlyAbout: React.FC<IReadonlyAboutProps> = () => {
  const context = React.useContext(ProfileContext);
  return (
    <Space direction="vertical" size={1}>
      <Typography.Text>
        {context?.profileData.user.about || "Не указано"}
      </Typography.Text>
    </Space>
  );
};
