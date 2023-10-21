import { Button, Checkbox, Form, Space, Typography } from "antd";

import { useCallback } from "react";

import TransparentInput from "../../components/TransparentInput/TransparentInput";

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
        className={styles["registration__form"]}
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
        <Form.Item label="Email">
          <TransparentInput placeholder="Введите почту" />
        </Form.Item>
        <Form.Item label="Password">
          <TransparentInput placeholder="Введите пароль" />
        </Form.Item>
        <Form.Item label="Confirm Password">
          <TransparentInput placeholder="Повторите пароль" />
        </Form.Item>
        <Form.Item>
          <Checkbox>Ищу работу</Checkbox>
        </Form.Item>
        <Form.Item>
          <Checkbox>Предлагаю работу</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            block
            className={styles["registration__form__button"]}
          >
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
