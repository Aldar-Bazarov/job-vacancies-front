import { Button, Form, Radio, Space, Typography } from "antd";

import { useCallback } from "react";

import { TransparentInput } from "@components/TransparentInput/TransparentInput";

import styles from "./Registration.module.scss";

export const Registration: React.FC = () => {
  const [form] = Form.useForm();

  const onFormChanged = useCallback(() => {}, []);

  return (
    <div className={styles["registration"]}>
      <Form
        form={form}
        colon={false}
        labelWrap
        size="small"
        labelAlign="left"
        className={styles["registration-form"]}
        onValuesChange={onFormChanged}
        layout={"vertical"}
      >
        <Typography.Title>Регистрация</Typography.Title>
        <Space direction="vertical">
          <Typography>Если у вас уже есть аккаунт</Typography>
          <Typography>
            Вы можете <a>Войти здесь!</a>
          </Typography>
        </Space>
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
          label="Пароль"
          name="password"
          rules={[{ required: true, message: "Поле пароль обязательно!" }]}
        >
          <TransparentInput placeholder="Введите пароль" />
        </Form.Item>
        <Form.Item
          label="Повторите пароль"
          name="confirmPassword"
          rules={[{ required: true, message: "Повторите пароль!" }]}
        >
          <TransparentInput placeholder="Повторите пароль" />
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
    </div>
  );
};
