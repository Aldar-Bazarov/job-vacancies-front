import { Button, Form, Col, Row, Input, Space, Typography } from "antd";
import { Upload } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";

import React from "react";

import { UploadOutlined } from "@ant-design/icons";
import { getBase64, beforeUpload } from "@infrastructure/image-upload";

import { IEditableHeaderProps, IReadonlyHeaderProps } from "./Company.Types";
import { CompanyContext } from "./CompanyContext";

export const EditableHeader: React.FC<IEditableHeaderProps> = ({
  setImageUrl
}) => {
  const context = React.useContext(CompanyContext);
  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (context == undefined) return;
    if (info.file.status === "uploading") {
      context.setIsLoading(true);
    } else if (info.file.status === "done") {
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setImageUrl(url);
        context.setIsLoading(false);
      });
    } else {
      context.setIsLoading(false);
    }
  };
  // eslint-disable-next-line
  const dummyRequest = (options: any) => {
    // Пока что сделать заглушку для upload фото на сервер
    setTimeout(() => {
      options.onSuccess("ok");
    }, 0);
  };

  return (
    <Row gutter={[12, 12]}>
      <Col span={8}>
        <Form.Item label="Название">
          <Input
            value={context?.companyData.name}
            onChange={(e) =>
              context?.dispatch({
                type: "change_name",
                value: e.target.value
              })
            }
            readOnly={context?.isReadOnly}
          />
        </Form.Item>
        <Form.Item label="Telegram">
          <Input placeholder="Soon..." readOnly={context?.isReadOnly} />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label="Почта">
          <Input placeholder="Soon..." readOnly={context?.isReadOnly} />
        </Form.Item>
        <Form.Item label="Номер телефона">
          <Input placeholder="Soon..." readOnly={context?.isReadOnly} />
        </Form.Item>
      </Col>
      <Col span={8}>
        {!context?.isReadOnly && (
          <Space
            direction="vertical"
            size={10}
            align="end"
            style={{ width: "100%" }}
          >
            <Upload
              showUploadList={false}
              customRequest={dummyRequest}
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              <Button icon={<UploadOutlined />} type="primary" size="large">
                Добавить фото
              </Button>
            </Upload>
          </Space>
        )}
      </Col>
    </Row>
  );
};

export const ReadonlyHeader: React.FC<IReadonlyHeaderProps> = () => {
  const context = React.useContext(CompanyContext);

  return (
    <Row>
      <Col span={6}>
        <Space direction="vertical" size={1}>
          <Typography.Text>
            {"Название: " + context?.companyData.name}
          </Typography.Text>
          <Typography.Text>{"Адрес: Некий адрес"}</Typography.Text>
        </Space>
      </Col>
      <Col span={6}>
        <Space direction="vertical" size={1}>
          <Typography.Text>{"Телефон: Некий номер телефона"}</Typography.Text>
          <Typography.Text>{"Почта: Некая почта"}</Typography.Text>
        </Space>
      </Col>
    </Row>
  );
};
