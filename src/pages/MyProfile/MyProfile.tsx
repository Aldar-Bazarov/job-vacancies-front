/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input } from "antd";

import { useEffect, useState } from "react";

import { ProfileInfoDto, userApi } from "@api/user/user.api";
//import { Role } from "@interfaces/user";

import styles from "./MyProfile.module.scss";

export const MyProfile = () => {
  const [profileData, setProfileData] = useState<ProfileInfoDto>();

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

  return (
    <Form
      {...formItemLayout}
      layout={"horizontal"}
      initialValues={{ layout: "horizontal" }}
      className={styles["authorization"]}
    >
      <Form.Item label="Имя">
        <Input value={profileData?.user.first_name} />
      </Form.Item>
      <Form.Item label="Фамилия">
        <Input value={profileData?.user.last_name} />
      </Form.Item>
      <Form.Item label="Почта">
        <Input value={profileData?.user.email} readOnly />
      </Form.Item>
      <Form.Item label="Образование">
        <Input placeholder="Soon..." />
      </Form.Item>
      <Form.Item label="О себе">
        <Input />
      </Form.Item>
      <Form.Item {...buttonItemLayout}>
        <Button type="primary">Сохранить</Button>
      </Form.Item>
    </Form>
  );
};
