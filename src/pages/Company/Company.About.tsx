import { Form, Col, Row, Space, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";

import React from "react";

import { IEditableAboutProps, IReadonlyAboutProps } from "./Company.Types";
import { CompanyContext } from "./CompanyContext";

export const EditableAbout: React.FC<IEditableAboutProps> = () => {
  const context = React.useContext(CompanyContext);

  return (
    <Row gutter={[12, 12]}>
      <Col span={24}>
        <Form.Item label="О компании">
          <TextArea
            value={context?.companyData.description}
            onChange={(e) =>
              context?.dispatch({
                type: "change_description",
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
  const context = React.useContext(CompanyContext);
  return (
    <Space direction="vertical" size={1}>
      <Typography.Text>
        {context?.companyData.description || "Не указано"}
      </Typography.Text>
    </Space>
  );
};
