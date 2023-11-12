import { Button, Form, Radio, Space, Typography, message } from "antd";

import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { userApi } from "@api/user/user.api";
import { Loader } from "@components/Loader/Loader";
import { TransparentInput } from "@components/TransparentInput/TransparentInput";

import styles from "./Registration.module.scss";

export const Registration: React.FC = () => {
  const navigate = useNavigate();

  const [registrationForm] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = useCallback(() => {
    setLoading(true);
    const userData = registrationForm.getFieldsValue();
    userApi
      .register(userData)
      .then(() => {
        navigate("/auth", { replace: true });
      })
      .catch((error) => {
        message.error(error.message);
      })
      .finally(() => setLoading(false));
  }, [registrationForm, navigate]);

  return (
    <div className={styles["registration"]}>
      <Form
        form={registrationForm}
        colon={false}
        labelWrap
        size="small"
        labelAlign="left"
        className={styles["registration-form"]}
        layout={"vertical"}
        onFinish={onFinish}
      >
        <Typography.Title>Регистрация</Typography.Title>
        <Space direction="vertical">
          <Typography>Если у вас уже есть аккаунт</Typography>
          <Typography>
            Вы можете <a>Войти здесь!</a>
          </Typography>
        </Space>
        <Form.Item
          label="Имя"
          name="firstName"
          rules={[{ required: true, message: "Поле имя обязательно!" }]}
        >
          <TransparentInput placeholder="Введите имя" />
        </Form.Item>
        <Form.Item
          label="Фамилия"
          name="lastName"
          rules={[{ required: true, message: "Поле фамилия обязательно!" }]}
        >
          <TransparentInput placeholder="Введите фамилию" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
              message: "Введите корректный email!"
            },
            {
              required: true,
              message: "Поле Email обязательно!"
            }
          ]}
        >
          <TransparentInput placeholder="Введите почту" type="email" />
        </Form.Item>
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
          label="Повторите пароль"
          name="confirmPassword"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "Повторите пароль!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Пароли не совпадают!"));
              }
            })
          ]}
        >
          <TransparentInput type="password" placeholder="Повторите пароль" />
        </Form.Item>
        <Form.Item
          name="role"
          rules={[{ required: true, message: "Поле обязательно!" }]}
        >
          <Radio.Group>
            <Radio value={"applicants"}>Ищу работу</Radio>
            <Radio value={"recruiters"}>Предлагаю работу</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            className={styles["registration-form-button"]}
          >
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
      <Loader active={loading} />
    </div>
  );
};
