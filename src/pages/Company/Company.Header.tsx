import {
  Button,
  Form,
  Col,
  Row,
  Input,
  Space,
  Typography,
  InputNumber
} from "antd";
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
        <Form.Item label="Почта">
          <Input
            value={context?.companyData.email}
            onChange={(e) =>
              context?.dispatch({
                type: "change_email",
                value: e.target.value
              })
            }
            readOnly={context?.isReadOnly}
          />
        </Form.Item>
        <Form.Item label="Количество сотрудников">
          <InputNumber
            value={context?.companyData.population}
            onChange={(e) =>
              context?.dispatch({
                type: "change_population",
                value: e
              })
            }
            readOnly={context?.isReadOnly}
          />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label="Номер телефона">
          <Input
            value={context?.companyData.phone}
            onChange={(e) =>
              context?.dispatch({
                type: "change_phone",
                value: e.target.value
              })
            }
            readOnly={context?.isReadOnly}
          />
        </Form.Item>
        <Form.Item label="Адрес">
          <Input
            value={context?.companyData.address}
            onChange={(e) =>
              context?.dispatch({
                type: "change_address",
                value: e.target.value
              })
            }
            readOnly={context?.isReadOnly}
          />
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
          <Typography.Text>
            {"Адрес: " + context?.companyData.address}
          </Typography.Text>
          <Typography.Text>
            {"Количество сотрудников: " + context?.companyData.population}
          </Typography.Text>
        </Space>
      </Col>
      <Col span={6}>
        <Space direction="vertical" size={1}>
          <Typography.Text>
            {"Почта: " + context?.companyData.email}
          </Typography.Text>
          <Typography.Text>
            {"Телефон: " + context?.companyData.phone}
          </Typography.Text>
        </Space>
      </Col>
    </Row>
  );
};
