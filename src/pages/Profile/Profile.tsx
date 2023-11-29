import { Button, Form, Col, Row, Input, Space, Divider } from "antd";
import { message, Avatar, Flex } from "antd";
import { Typography } from "antd";
import TextArea from "antd/es/input/TextArea";

import { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";

import { UpdateProfileError, userApi } from "@api/user/user.api";
import { EditableFormItem } from "@components/EditableFormItem/EditableFormItem";
import { InfoIcon } from "@components/Icons/InfoIcon";
import { Loader } from "@components/Loader/Loader";
import { TagPool } from "@components/TagPool/TagPool";
import { Role } from "@interfaces/user";

import { EditableHeader } from "./Profile.Header";
import styles from "./Profile.module.scss";
import { IProfileCompound } from "./Profile.Types";
import { ProfileReducer } from "./ProfileReductor";

export const Profile: React.FC & IProfileCompound = () => {
  const [profileData, dispatch] = useReducer(ProfileReducer, null);
  const { profileId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [tags, setTags] = useState(["Placeholder1", "Placeholder2"]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

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
      {profileData && (
        <Form
          layout={"vertical"}
          initialValues={{ layout: "horizontal" }}
          className={styles["profile-form"]}
        >
          <Row>
            <Col span={24}>
              <Row align="middle" justify="start">
                <Col flex="110px" style={{ marginBottom: "auto" }}>
                  <Avatar
                    size={100}
                    src={imageUrl ?? "/images/default-avatar.jpg"}
                  />
                </Col>
                <Col flex="auto">
                  <EditableFormItem
                    icon={<></>}
                    title={
                      profileData?.user.last_name +
                      " " +
                      profileData?.user.first_name
                    }
                    readonly={isReadOnly}
                  >
                    <EditableFormItem.EditablePart>
                      <Profile.HeaderEditable
                        dispatch={dispatch}
                        email={profileData?.user.email}
                        first_name={profileData?.user.first_name}
                        last_name={profileData?.user.last_name}
                        isReadOnly={isReadOnly}
                        setImageUrl={setImageUrl}
                        setIsLoading={setIsLoading}
                      />
                    </EditableFormItem.EditablePart>
                    <EditableFormItem.ReadOnlyPart>
                      <Row>
                        <Col span={6}>
                          <Space direction="vertical" size={1}>
                            <Typography.Text>
                              {"Некий пол, некая дата рождения"}
                            </Typography.Text>
                            <Typography.Text>
                              {profileData.status_id === 0
                                ? "Ищет работу"
                                : "Не ищет работу"}
                            </Typography.Text>
                          </Space>
                        </Col>
                        <Col span={6}>
                          <Space direction="vertical" size={1}>
                            <Typography.Text>{"Некий адрес"}</Typography.Text>
                            <Typography.Text>
                              {"Некий номер телефона"}
                            </Typography.Text>
                            <Typography.Text>
                              {profileData?.user.email}
                            </Typography.Text>
                          </Space>
                        </Col>
                      </Row>
                    </EditableFormItem.ReadOnlyPart>
                  </EditableFormItem>
                </Col>
              </Row>
            </Col>
          </Row>
          <Divider style={{ borderColor: "#7E7E7E66" }} />

          <Row>
            <Col span={24}>
              <Form.Item label="Должность">
                <Input placeholder="Soon..." readOnly={isReadOnly} />
              </Form.Item>
              <Form.Item label="Образование">
                <Input placeholder="Soon..." readOnly={isReadOnly} />
              </Form.Item>
              <Form.Item label="О себе">
                <TextArea
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

Profile.HeaderEditable = EditableHeader;
