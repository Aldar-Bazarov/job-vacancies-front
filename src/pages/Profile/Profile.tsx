import { Button, Form, Col, Row, Input, Divider } from "antd";
import { message, Avatar, Flex } from "antd";
import TextArea from "antd/es/input/TextArea";

import React, { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";

import { UpdateProfileError, userApi } from "@api/user/user.api";
import { EditableFormItem } from "@components/EditableFormItem/EditableFormItem";
import { EducationIcon } from "@components/Icons/EducationIcon";
import { InfoIcon } from "@components/Icons/InfoIcon";
import { SkillsIcon } from "@components/Icons/SkillsIcon";
import { Loader } from "@components/Loader/Loader";
import { Role } from "@interfaces/user";

import { EditableEducation, ReadonlyEducation } from "./Profile.Education";
import { EditableHeader, ReadonlyHeader } from "./Profile.Header";
//import { EditableMainInfo, ReadonlyMainInfo } from "./Profile.MainInfo";
import styles from "./Profile.module.scss";
import { HardSkills } from "./Profile.Skills";
import { IProfileCompound } from "./Profile.Types";
import { ProfileContext } from "./ProfileContext";
import { ProfileReducer } from "./ProfileReducer";

export const Profile: React.FC & IProfileCompound = () => {
  const [profileData, dispatch] = useReducer(ProfileReducer, null);
  const { profileId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [tags, setTags] = useState(["Placeholder1", "Placeholder2"]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [fullUserName, setFullUserName] = useState<string>("");

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
          setFullUserName(data.user.last_name + " " + data.user.first_name);
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
        setFullUserName(data.user.last_name + " " + data.user.first_name);
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
        <ProfileContext.Provider
          value={{
            dispatch: dispatch,
            isReadOnly: isReadOnly,
            profileData: profileData,
            setIsLoading: setIsLoading
          }}
        >
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
                      title={fullUserName}
                      readonly={isReadOnly}
                    >
                      <EditableFormItem.EditablePart>
                        <Profile.EditableHeader setImageUrl={setImageUrl} />
                      </EditableFormItem.EditablePart>
                      <EditableFormItem.ReadOnlyPart>
                        <Profile.ReadonlyHeader />
                      </EditableFormItem.ReadOnlyPart>
                    </EditableFormItem>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Divider style={{ borderColor: "#7E7E7E66" }} />

            <Row>
              <Col span={12}>
                <EditableFormItem
                  icon={<EducationIcon />}
                  title={"Образование"}
                  readonly={isReadOnly}
                >
                  <EditableFormItem.EditablePart>
                    <Profile.EditableEducation />
                  </EditableFormItem.EditablePart>
                  <EditableFormItem.ReadOnlyPart>
                    <Profile.ReadonlyEducation />
                  </EditableFormItem.ReadOnlyPart>
                </EditableFormItem>
              </Col>
              <Col span={12}>
                <EditableFormItem
                  icon={<SkillsIcon />}
                  title={"Ключевые навыки"}
                  readonly={isReadOnly}
                  notAlternate={true}
                >
                  <EditableFormItem.NotAlternatePart>
                    <Profile.HardSkills setTags={setTags} tags={tags} />
                  </EditableFormItem.NotAlternatePart>
                </EditableFormItem>
              </Col>
            </Row>

            <Form.Item label="Должность">
              <Input placeholder="Soon..." readOnly={isReadOnly} />
            </Form.Item>
            <Form.Item label="О себе">
              <TextArea
                rows={4}
                style={{ height: 120, resize: "none" }}
                readOnly={isReadOnly}
              />
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
        </ProfileContext.Provider>
      )}
    </>
  );
};

Profile.EditableHeader = EditableHeader;
Profile.ReadonlyHeader = ReadonlyHeader;
// Profile.EditableMainInfo = EditableMainInfo;
// Profile.ReadonlyMainInfo = ReadonlyMainInfo;
Profile.EditableEducation = EditableEducation;
Profile.ReadonlyEducation = ReadonlyEducation;
Profile.HardSkills = HardSkills;
