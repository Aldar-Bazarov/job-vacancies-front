import { Form, Input, InputNumber, Select, Typography } from "antd";

import React from "react";

export const CreateVacancy = (): JSX.Element => {
  const [createVacancyForm] = Form.useForm();

  return (
    <Form form={createVacancyForm}>
      <Typography>Создание вакансии</Typography>
      <Form.Item
        label="Название вакансии"
        name="name"
        rules={[{ required: true, message: "Поле имя обязательно!" }]}
      >
        <Input placeholder="Введите название вакансии..." />
      </Form.Item>
      <Form.Item label="Зарплата" name="salary_min">
        <InputNumber placeholder="От..." />
      </Form.Item>
      <Form.Item name="salary_max">
        <InputNumber placeholder="До..." />
      </Form.Item>
      <Form.Item label="Опыт" name="experience_min">
        <InputNumber placeholder="От..." />
      </Form.Item>
      <Form.Item name="experience_max">
        <InputNumber placeholder="До..." />
      </Form.Item>
      <Form.Item label="Требования" name="description">
        <InputNumber placeholder="Введите требования для вакансии..." />
      </Form.Item>
    </Form>
  );
};
