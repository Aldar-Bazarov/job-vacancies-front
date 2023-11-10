import { Button, Form, Col, Row } from "antd";
import { message, Upload, Avatar, Space } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";

import { useEffect, useState } from "react";

import { UploadOutlined } from "@ant-design/icons";
import { ProfileInfoDto, userApi } from "@api/user/user.api";
import { TransparentInput } from "@components/TransparentInput/TransparentInput";
import { TransparentTextArea } from "@components/TransparentTextArea/TransparentTextArea";
//import { Role } from "@interfaces/user";

import styles from "./MyProfile.module.scss";

export const MyProfile = () => {
  const [profileData, setProfileData] = useState<ProfileInfoDto>();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [defaultProfilePhotoUrl, setDefaultProfilePhotoUrl] = useState(
    "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
  );

  const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 14 } };
  const buttonItemLayout = { wrapperCol: { span: 14, offset: 4 } };

  useEffect(() => {
    // userApi
    //   .getMyProfile({ role: Role.Applicants })
    //   .then((data) => {
    //     setProfileData(data);
    //   })
    //   .catch();
    const mockProfile: ProfileInfoDto = {
      user_id: 1,
      status_id: 0,
      user: {
        id: 1,
        email: "user1@example.com",
        first_name: "user_first_name",
        last_name: "user_last_name",
        username: "user1_username"
      }
    };
    setProfileData(mockProfile);
  }, []);

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Вы можете загружать фото только в формате JPG/PNG.");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Размер фото должен быть меньше 2MB.");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const dummyRequest = ({ onSuccess }) => {
    // Пока что сделать заглушку для upload фото на сервер
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  return (
    <Form
      {...formItemLayout}
      layout={"horizontal"}
      initialValues={{ layout: "horizontal" }}
      className={styles["authorization"]}
    >
      <Row>
        <Col span={24}>
          <Upload
            showUploadList={false}
            customRequest={dummyRequest}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            <Button icon={<UploadOutlined />}>Добавить фото</Button>
          </Upload>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Row>
            <Col span={6}>
              <div className="avatar-container">
                <Space align="center">
                  <Avatar size={200} src={imageUrl ?? defaultProfilePhotoUrl} />
                </Space>
              </div>
            </Col>

            <Col span={18}>
              <Form.Item label="Имя">
                <TransparentInput value={profileData?.user.first_name} />
              </Form.Item>
              <Form.Item label="Фамилия">
                <TransparentInput value={profileData?.user.last_name} />
              </Form.Item>
              <Form.Item label="Должность">
                <TransparentInput placeholder="Soon..." />
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Form.Item label="Почта">
            <TransparentInput value={profileData?.user.email} readOnly />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Form.Item label="Образование">
            <TransparentInput placeholder="Soon..." />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Form.Item label="О себе">
            <TransparentTextArea
              rows={4}
              style={{ height: 120, resize: "none" }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item {...buttonItemLayout}>
        <Button type="primary">Сохранить</Button>
      </Form.Item>
    </Form>
  );
};
