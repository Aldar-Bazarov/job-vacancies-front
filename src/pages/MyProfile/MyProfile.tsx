import { Button, Form, Col, Row, Space } from "antd";
import { message, Upload, Avatar, Flex } from "antd";
import { Typography } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";

import { useEffect, useState } from "react";

import { UploadOutlined } from "@ant-design/icons";
import { ProfileInfoDto, userApi } from "@api/user/user.api";
import { TagPool } from "@components/TagPool/TagPool";
import { TransparentInput } from "@components/TransparentInput/TransparentInput";
import { TransparentTextArea } from "@components/TransparentTextArea/TransparentTextArea";
//import { Role } from "@interfaces/user";

import styles from "./MyProfile.module.scss";

export const MyProfile = () => {
  const [profileData, setProfileData] = useState<ProfileInfoDto>();
  const [loading, setLoading] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [tags, setTags] = useState(["PHP", "JS", "React"]);
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
      layout={"vertical"}
      initialValues={{ layout: "horizontal" }}
      className={styles["profile-form"]}
    >
      <Typography.Title>Пользователь</Typography.Title>
      <Row>
        <Col span={24}>
          <Row align="middle">
            <Col flex="210px">
              <Avatar size={200} src={imageUrl ?? defaultProfilePhotoUrl} />
            </Col>

            <Col flex="auto">
              <Row justify="space-between">
                <Col span={8}>
                  <Form.Item label="Имя">
                    <TransparentInput
                      value={profileData?.user.first_name}
                      readOnly={isReadOnly}
                    />
                  </Form.Item>
                  <Form.Item label="Фамилия">
                    <TransparentInput
                      value={profileData?.user.last_name}
                      readOnly={isReadOnly}
                    />
                  </Form.Item>
                </Col>
                <Col span={14}>
                  {!isReadOnly && (
                    <Flex
                      style={{ width: "100%" }}
                      justify={"end"}
                      align={"end"}
                      gap={10}
                    >
                      <Upload
                        showUploadList={false}
                        customRequest={dummyRequest}
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                      >
                        <Button
                          icon={<UploadOutlined />}
                          type="primary"
                          size="large"
                        >
                          Добавить фото
                        </Button>
                      </Upload>
                      <Button
                        danger
                        style={{ backgroundColor: "white" }}
                        size="large"
                      >
                        Удалить
                      </Button>
                    </Flex>
                  )}
                </Col>
              </Row>
              <Form.Item label="Должность">
                <TransparentInput placeholder="Soon..." readOnly={isReadOnly} />
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Form.Item label="Почта">
            <TransparentInput
              value={profileData?.user.email}
              readOnly={isReadOnly}
            />
          </Form.Item>
          <Form.Item label="Номер телефона">
            <TransparentInput placeholder="Soon..." readOnly={isReadOnly} />
          </Form.Item>
          <Form.Item label="Telegram">
            <TransparentInput placeholder="Soon..." readOnly={isReadOnly} />
          </Form.Item>
          <Form.Item label="Образование">
            <TransparentInput placeholder="Soon..." readOnly={isReadOnly} />
          </Form.Item>
          <Form.Item label="О себе">
            <TransparentTextArea
              rows={4}
              style={{ height: 120, resize: "none" }}
              readOnly={isReadOnly}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item label="Ключевые навыки">
        <Space size={[0, 8]} wrap>
          <TagPool tags={tags} setTags={setTags} readOnly={isReadOnly} />
        </Space>
      </Form.Item>

      {!isReadOnly && (
        <Flex style={{ width: "100%" }} justify={"end"} align={"end"}>
          <Form.Item {...buttonItemLayout}>
            <Button type="primary" size="large">
              Сохранить
            </Button>
          </Form.Item>
        </Flex>
      )}
    </Form>
  );
};
