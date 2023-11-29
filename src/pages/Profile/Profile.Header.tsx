import { Button, Form, Col, Row, Input, Space } from "antd";
import { Upload } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";

import { UploadOutlined } from "@ant-design/icons";
import { getBase64, beforeUpload } from "@infrastructure/image-upload";

import { IEditableHeaderProps } from "./Profile.Types";

export const EditableHeader: React.FC<IEditableHeaderProps> = ({
  dispatch,
  first_name,
  last_name,
  email,
  isReadOnly,
  setIsLoading,
  setImageUrl
}) => {
  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setIsLoading(true);
    } else if (info.file.status === "done") {
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setImageUrl(url);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
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
            value={first_name}
            onChange={(e) =>
              dispatch({
                type: "change_first_name",
                value: e.target.value
              })
            }
            readOnly={isReadOnly}
          />
        </Form.Item>
        <Form.Item label="Фамилия">
          <Input
            value={last_name}
            onChange={(e) =>
              dispatch({
                type: "change_last_name",
                value: e.target.value
              })
            }
            readOnly={isReadOnly}
          />
        </Form.Item>
        <Form.Item label="Telegram">
          <Input placeholder="Soon..." readOnly={isReadOnly} />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label="Почта">
          <Input value={email} readOnly={isReadOnly} />
        </Form.Item>
        <Form.Item label="Номер телефона">
          <Input placeholder="Soon..." readOnly={isReadOnly} />
        </Form.Item>
      </Col>
      <Col span={8}>
        {!isReadOnly && (
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
