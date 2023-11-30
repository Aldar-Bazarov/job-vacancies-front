import { Button, Form, Col, Row, Input, Space, Typography } from "antd";
import { Upload } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";

import React from "react";

import { UploadOutlined } from "@ant-design/icons";
import { getBase64, beforeUpload } from "@infrastructure/image-upload";

import { ProfileContext } from "./Profile";
import { IEditableHeaderProps, IReadonlyHeaderProps } from "./Profile.Types";

export const EditableHeader: React.FC<IEditableHeaderProps> = ({
  setImageUrl
}) => {
  const context = React.useContext(ProfileContext);
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
        <Form.Item label="Имя">
          <Input
            value={context?.profileData.user.first_name}
            onChange={(e) =>
              context?.dispatch({
                type: "change_first_name",
                value: e.target.value
              })
            }
            readOnly={context?.isReadOnly}
          />
        </Form.Item>
        <Form.Item label="Фамилия">
          <Input
            value={context?.profileData.user.last_name}
            onChange={(e) =>
              context?.dispatch({
                type: "change_last_name",
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
          <Input
            value={context?.profileData.user.email}
            readOnly={context?.isReadOnly}
          />
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
            <Button danger style={{ backgroundColor: "white" }} size="large">
              Удалить
            </Button>
          </Space>
        )}
      </Col>
    </Row>
  );
};

export const ReadonlyHeader: React.FC<IReadonlyHeaderProps> = () => {
  const context = React.useContext(ProfileContext);
  return (
    <Row>
      <Col span={6}>
        <Space direction="vertical" size={1}>
          <Typography.Text>{"Некий пол, некая дата рождения"}</Typography.Text>
          <Typography.Text>
            {context?.profileData.status_id === 0
              ? "Ищет работу"
              : "Не ищет работу"}
          </Typography.Text>
        </Space>
      </Col>
      <Col span={6}>
        <Space direction="vertical" size={1}>
          <Typography.Text>{"Адрес: Некий адрес"}</Typography.Text>
          <Typography.Text>{"Телефон: Некий номер телефона"}</Typography.Text>
          <Typography.Text>
            {"Почта: " + context?.profileData.user.email}
          </Typography.Text>
        </Space>
      </Col>
    </Row>
  );
};