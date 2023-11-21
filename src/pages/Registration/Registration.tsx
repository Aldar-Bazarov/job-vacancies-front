import { Button, Form, Input, Radio, Typography, message } from "antd";

import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { userApi } from "@api/user/user.api";
import { Loader } from "@components/Loader/Loader";

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
      <div className={styles["circle"]} id={styles["first"]}>
        <div className={styles["circle"]} id={styles["second"]}>
          <div className={styles["circle"]} id={styles["third"]}>
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
              <Link to="/">
                <Typography.Title className={styles["logo"]}>
                  VPI
                </Typography.Title>
              </Link>
              <Typography>Поиск вакансий программная инженерия</Typography>
              <Typography.Title level={4}>Регистрация</Typography.Title>
              <Form.Item
                label="Имя"
                name="firstName"
                rules={[{ required: true, message: "Поле имя обязательно!" }]}
              >
                <Input
                  placeholder="Введите имя"
                  className={styles["registration-form-button"]}
                />
              </Form.Item>
              <Form.Item
                label="Фамилия"
                name="lastName"
                rules={[
                  { required: true, message: "Поле фамилия обязательно!" }
                ]}
              >
                <Input
                  placeholder="Введите фамилию"
                  className={styles["registration-form-button"]}
                />
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
                <Input
                  placeholder="Введите почту"
                  type="email"
                  className={styles["registration-form-button"]}
                />
              </Form.Item>
              <Form.Item
                label="Логин"
                name="username"
                rules={[{ required: true, message: "Поле логин обязательно!" }]}
              >
                <Input
                  placeholder="Введите логин"
                  className={styles["registration-form-button"]}
                />
              </Form.Item>
              <Form.Item
                label="Пароль"
                name="password"
                rules={[
                  { required: true, message: "Поле пароль обязательно!" }
                ]}
              >
                <Input
                  type="password"
                  placeholder="Введите пароль"
                  className={styles["registration-form-button"]}
                />
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
                <Input
                  type="password"
                  placeholder="Повторите пароль"
                  className={styles["registration-form-button"]}
                />
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
              <Typography>
                Уже есть аккаунт? <Link to={"/auth"}>Авторизоваться</Link>
              </Typography>
            </Form>
            <Loader active={loading} />
          </div>
        </div>
      </div>
    </div>
  );
};
