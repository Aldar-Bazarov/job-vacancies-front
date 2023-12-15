import { Button, Form, Col, Row, Divider } from "antd";
import { message, Avatar, Flex } from "antd";

import React, { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";

import { UpdateProfileError, userApi } from "@api/user/user.api";
import { EditableFormItem } from "@components/EditableFormItem/EditableFormItem";
import { AboutIcon } from "@components/Icons/AboutIcon";
import { EducationIcon } from "@components/Icons/EducationIcon";
import { InfoIcon } from "@components/Icons/InfoIcon";
import { SkillsIcon } from "@components/Icons/SkillsIcon";
import { Loader } from "@components/Loader/Loader";
import { Role } from "@interfaces/user";

import { EditableAbout, ReadonlyAbout } from "./Profile.About";
import { EditableEducation, ReadonlyEducation } from "./Profile.Education";
import { EditableHeader, ReadonlyHeader } from "./Profile.Header";
import { EditableMainInfo, ReadonlyMainInfo } from "./Profile.MainInfo";
import styles from "./Profile.module.scss";
import { HardSkills } from "./Profile.Skills";
import { ProfileContext } from "./ProfileContext";
import { ProfileReducer } from "./ProfileReducer";

export const Profile: React.FC = () => {
  const [profileData, dispatch] = useReducer(ProfileReducer, null);
  const { profileId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [tags, setTags] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [fullUserName, setFullUserName] = useState<string>("");
  const [userIsApplicant, setUserIsApplicant] = useState(true);

  const apiGetUser = (role: Role) => {
    return userApi.getMyProfile({ role: role }).then((data) => {
      dispatch({
        type: "set_user",
        value: data
      });
      setFullUserName(data.user.last_name + " " + data.user.first_name);
      setIsReadOnly(false);
    });
  };

  useEffect(() => {
    if (profileId === undefined) {
      setIsLoading(true);
      apiGetUser(Role.Applicants) // first try get as applicant
        .catch(() => {
          setUserIsApplicant(false);
          apiGetUser(Role.Recruiter) // second try get as recruiter
            .catch((e) => {
              message.error(e.message);
            })
            .finally(() => {
              setIsLoading(false);
            });
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsReadOnly(true);
    }
  }, [profileId]);

  const handleSave = async () => {
    if (!profileData) return;
    setIsLoading(true);
    try {
      let data = null;
      if (userIsApplicant) {
        data = await userApi.updateMyProfile({
          id: profileData.user_id,
          statusId: profileData.status_id ?? 0,
          role: Role.Applicants,
          firstName: profileData.user.first_name,
          lastName: profileData.user.last_name
        });
      } else {
        data = await userApi.updateMyProfile({
          id: profileData.user_id,
          role: Role.Recruiter,
          firstName: profileData.user.first_name,
          lastName: profileData.user.last_name
        });
      }
      dispatch({
        type: "set_user",
        value: data
      });
      setFullUserName(data.user.last_name + " " + data.user.first_name);
      setIsReadOnly(false);
    } catch (e) {
      message.error((e as UpdateProfileError).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Loader active={isLoading} />
      {profileData && (
        <ProfileContext.Provider
          value={{
            dispatch,
            isReadOnly,
            profileData,
            setIsLoading,
            userIsApplicant
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
                        <EditableHeader setImageUrl={setImageUrl} />
                      </EditableFormItem.EditablePart>
                      <EditableFormItem.ReadOnlyPart>
                        <ReadonlyHeader />
                      </EditableFormItem.ReadOnlyPart>
                    </EditableFormItem>
                  </Col>
                </Row>
              </Col>
            </Row>
            {userIsApplicant && (
              <>
                <Divider style={{ borderColor: "#7E7E7E66" }} />

                {/* <Row>
                  <Col span={12}>
                    <EditableFormItem
                      icon={<InfoIcon />}
                      title={"Основная информация"}
                      readonly={isReadOnly}
                    >
                      <EditableFormItem.EditablePart>
                        <EditableMainInfo />
                      </EditableFormItem.EditablePart>
                      <EditableFormItem.ReadOnlyPart>
                        <ReadonlyMainInfo />
                      </EditableFormItem.ReadOnlyPart>
                    </EditableFormItem>
                  </Col>
                </Row>
                <Divider style={{ borderColor: "#7E7E7E66" }} /> */}

                <Row>
                  {/* <Col span={12}>
                    <EditableFormItem
                      icon={<EducationIcon />}
                      title={"Образование"}
                      readonly={isReadOnly}
                    >
                      <EditableFormItem.EditablePart>
                        <EditableEducation />
                      </EditableFormItem.EditablePart>
                      <EditableFormItem.ReadOnlyPart>
                        <ReadonlyEducation />
                      </EditableFormItem.ReadOnlyPart>
                    </EditableFormItem>
                  </Col> */}
                  <Col span={12}>
                    <EditableFormItem
                      icon={<SkillsIcon />}
                      title={"Ключ. навыки"}
                      readonly={isReadOnly}
                      notAlternate={true}
                    >
                      <EditableFormItem.NotAlternatePart>
                        <HardSkills setTags={setTags} tags={tags} />
                      </EditableFormItem.NotAlternatePart>
                    </EditableFormItem>
                  </Col>
                </Row>
                <Divider style={{ borderColor: "#7E7E7E66" }} />

                <Row>
                  <Col span={24}>
                    <EditableFormItem
                      icon={<AboutIcon />}
                      title={"Обо мне"}
                      readonly={isReadOnly}
                    >
                      <EditableFormItem.EditablePart>
                        <EditableAbout />
                      </EditableFormItem.EditablePart>
                      <EditableFormItem.ReadOnlyPart>
                        <ReadonlyAbout />
                      </EditableFormItem.ReadOnlyPart>
                    </EditableFormItem>
                  </Col>
                </Row>
              </>
            )}
            <Divider style={{ borderColor: "#7E7E7E66" }} />

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
