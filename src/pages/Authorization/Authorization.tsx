import { Button, Divider, Form, Input, Radio, Typography, message } from "antd";

import { useCallback, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { authApi } from "@api/auth/auth.api";
import { Loader } from "@components/Loader/Loader";
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
      <div className={styles["circle"]} id={styles["first"]}>
        <div className={styles["circle"]} id={styles["second"]}>
          <div className={styles["circle"]} id={styles["third"]}>
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
              <Link to="/">
                <Typography.Title className={styles["logo"]}>
                  VPI
                </Typography.Title>
              </Link>
              <Typography>Поиск вакансий программная инженерия</Typography>
              <Typography.Title level={4}>Авторизация</Typography.Title>
              <Form.Item
                label="Логин"
                name="username"
                rules={[{ required: true, message: "Поле логин обязательно!" }]}
              >
                <Input
                  placeholder="Введите логин"
                  className={styles["authorization-form-input"]}
                />
              </Form.Item>
              <Form.Item
                label="Пароль"
                name="password"
                rules={[
                  { required: true, message: "Поле пароль обязательно!" }
                ]}
              >
                <Input.Password
                  placeholder="Введите пароль"
                  className={styles["authorization-form-input"]}
                />
              </Form.Item>
              <Form.Item
                name="role"
                rules={[
                  { required: true, message: "Тип пользователя обязателен!" }
                ]}
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
                  Авторизоваться
                </Button>
              </Form.Item>
              <Divider />
              <Typography>
                Нет аккаунта? <Link to={"/register"}>Зарегистрироваться</Link>
              </Typography>
            </Form>
            <Loader active={loading} />
          </div>
        </div>
      </div>
    </div>
  );
};
