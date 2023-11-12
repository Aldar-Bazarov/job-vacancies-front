import { Button, Form, Radio, Space, Typography, message } from "antd";

import { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { authApi } from "@api/auth/auth.api";
import { Loader } from "@components/Loader/Loader";
import { TransparentInput } from "@components/TransparentInput/TransparentInput";
import { setAuthenticate } from "@infrastructure/axios/auth";

import styles from "./Authorization.module.scss";

export const Authorization: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const fromPage = location.state?.from?.pathname || "/";

  const [authorizationForm] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = useCallback(() => {
    setLoading(true);
    const userData = authorizationForm.getFieldsValue();
    authApi
      .authorize(userData)
      .then((data) => {
        setAuthenticate(data.access_token);
        navigate(fromPage, { replace: true });
      })
      .catch((error) => {
        message.error(error.message);
      })
      .finally(() => setLoading(false));
  }, [authorizationForm, fromPage, navigate]);

  return (
    <div className={styles["authorization"]}>
      <Form
        form={authorizationForm}
        colon={false}
        labelWrap
        size="small"
        labelAlign="left"
        className={styles["authorization-form"]}
        layout={"vertical"}
        onFinish={onFinish}
      >
        <Typography.Title>Авторизация</Typography.Title>
        <Space direction="vertical">
          <Typography>Если у вас нет аккаунта</Typography>
          <Typography>
            Вы можете <a>Зарегистрироваться здесь!</a>
          </Typography>
        </Space>
        <Form.Item
          label="Логин"
          name="username"
          rules={[{ required: true, message: "Поле логин обязательно!" }]}
        >
          <TransparentInput placeholder="Введите логин" />
        </Form.Item>
        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: "Поле пароль обязательно!" }]}
        >
          <TransparentInput type="password" placeholder="Введите пароль" />
        </Form.Item>
        <Form.Item
          name="role"
          rules={[{ required: true, message: "Тип пользователя обязателен!" }]}
        >
          <Radio.Group>
            <Radio value={"applicants"}>Соискатель</Radio>
            <Radio value={"recruiters"}>Рекрутёр</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            className={styles["authorization-form-button"]}
          >
            Войти
          </Button>
        </Form.Item>
      </Form>
      <Loader active={loading} />
    </div>
  );
};
