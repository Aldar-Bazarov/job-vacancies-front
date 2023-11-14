import { Button, Form, Col, Row } from "antd";
import { message, Upload, Avatar, Flex } from "antd";
import { Typography } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";

import { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";

import { UploadOutlined } from "@ant-design/icons";
import {
  ProfileInfoDto,
  UpdateProfileError,
  userApi
} from "@api/user/user.api";
import { Loader } from "@components/Loader/Loader";
import { TagPool } from "@components/TagPool/TagPool";
import { TransparentInput } from "@components/TransparentInput/TransparentInput";
import { TransparentTextArea } from "@components/TransparentTextArea/TransparentTextArea";
import { getBase64, beforeUpload } from "@infrastructure/image-upload";
import { Role } from "@interfaces/user";

import styles from "./Profile.module.scss";

type ProfileReducerAction = {
  type: "set_user" | "change_last_name" | "change_first_name"; // eslint-disable-next-line
  value?: any;
};
function reducer(
  state: ProfileInfoDto | null,
  action: ProfileReducerAction
): ProfileInfoDto | null {
  let data = null;
  if (state !== null) data = { ...state, user: { ...state.user } };
  switch (action.type) {
    case "set_user": {
      if (action.value === undefined)
        throw Error(
          `action.value must be not null for action.type === ${action.type}`
        );
      data = { ...action.value };
      return data;
    }
    case "change_first_name": {
      if (action.value === undefined)
        throw Error(
          `action.value must be not null for action.type === ${action.type}`
        );
      if (data === null) throw Error(`state must be not null`);
      data.user.first_name = action.value;
      return data;
    }
    case "change_last_name": {
      if (action.value === undefined)
        throw Error(
          `action.value must be not null for action.type === ${action.type}`
        );
      if (data === null) throw Error(`state must be not null`);
      data.user.last_name = action.value;
      return data;
    }
  }
}

export const Profile = () => {
  const [profileData, dispatch] = useReducer(reducer, null);
  const { profileId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [tags, setTags] = useState(["Placeholder1", "Placeholder2"]);
  const [imageUrl, setImageUrl] = useState<string | null>(null); //eslint-disable-next-line

  useEffect(() => {
    if (profileId === undefined) {
      setIsLoading(true);
      userApi
        .getMyProfile({ role: Role.Applicants })
        .then((data) => {
          dispatch({
            type: "set_user",
            value: data
          });
          setIsReadOnly(false);
        })
        .catch((e: UpdateProfileError) => {
          message.error(e.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsReadOnly(true);
    }
  }, [profileId]);

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

  const handleSave = () => {
    if (!profileData) return;
    setIsLoading(true);
    userApi
      .updateMyProfile({
        id: profileData.user_id,
        statusId: profileData.status_id ?? 0,
        role: Role.Applicants,
        firstName: profileData.user.first_name,
        lastName: profileData.user.last_name
      })
      .then((data) => {
        dispatch({
          type: "set_user",
          value: data
        });
        setIsReadOnly(false);
      })
      .catch((e: UpdateProfileError) => {
        message.error(e.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Loader active={isLoading} />
      {!profileData ? (
        <div style={{ padding: "1rem" }}>
          <Typography.Title>Пользователь не найден.</Typography.Title>
        </div>
      ) : (
        <Form
          layout={"vertical"}
          initialValues={{ layout: "horizontal" }}
          className={styles["profile-form"]}
        >
          <Typography.Title>Пользователь</Typography.Title>
          <Row>
            <Col span={24}>
              <Row align="middle">
                <Col flex="210px">
                  <Avatar
                    size={200}
                    src={imageUrl ?? "images/default-avatar.jpg"}
                  />
                </Col>

                <Col flex="auto">
                  <Row justify="space-between">
                    <Col span={8}>
                      <Form.Item label="Имя">
                        <TransparentInput
                          value={profileData?.user.first_name}
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
                        <TransparentInput
                          value={profileData?.user.last_name}
                          onChange={(e) =>
                            dispatch({
                              type: "change_last_name",
                              value: e.target.value
                            })
                          }
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
                    <TransparentInput
                      placeholder="Soon..."
                      readOnly={isReadOnly}
                    />
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
            <TagPool tags={tags} setTags={setTags} readOnly={isReadOnly} />
          </Form.Item>

          {!isReadOnly && (
            <Flex style={{ width: "100%" }} justify={"end"} align={"end"}>
              <Form.Item>
                <Button type="primary" size="large" onClick={handleSave}>
                  Сохранить
                </Button>
              </Form.Item>
            </Flex>
          )}
        </Form>
      )}
    </>
  );
};