import { Button, Form, Space, Typography } from "antd";

import { useCallback } from "react";

import TransparentInput from "../../components/TransparentInput/TransparentInput";

import styles from "./Authorization.module.scss";

export const Authorization: React.FC = () => {
  const [form] = Form.useForm();

  const onFormChanged = useCallback(() => {}, []);

  return (
    <div className={styles["authorization"]}>
      <Form
        form={form}
        colon={false}
        labelWrap
        size="small"
        labelAlign="left"
        className={styles["authorization__form"]}
        onValuesChange={onFormChanged}
        layout={"vertical"}
      >
        <Typography.Title>Авторизация</Typography.Title>
        <Space direction="vertical">
          <Typography>Если у вас нет аккаунта</Typography>
          <Typography>
            Вы можете <a>Зарегистрироваться здесь!</a>
          </Typography>
        </Space>
        <Form.Item label="Email">
          <TransparentInput placeholder="Введите почту" />
        </Form.Item>
        <Form.Item label="Password">
          <TransparentInput placeholder="Введите пароль" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            block
            className={styles["authorization__form__button"]}
          >
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
