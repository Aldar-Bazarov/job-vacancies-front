import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  InputNumber,
  Row,
  Typography
} from "antd";
import TextArea from "antd/es/input/TextArea";

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { vacanciesApi } from "@api/vacancies/vacancies.api";
import { EditableFormItem } from "@components/EditableFormItem/EditableFormItem";
import { HardSkills } from "@pages/Profile/Profile.Skills";

import styles from "./CreateVacancy.module.scss";

export const CreateVacancy = (): JSX.Element => {
  const [createVacancyForm] = Form.useForm();
  const [tags, setTags] = useState(["Unit-тестирование", "Долгие созвоны"]);
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleCreateVacancy = () => {
    const formData = createVacancyForm.getFieldsValue();
    const data = {
      ...formData,
      company_id: +state?.company_id,
      personal_qualities: tags.join(","),
      rate_id: 1
    };
    vacanciesApi.createVacancy(data);
    navigate(-1);
  };

  return (
    <Form form={createVacancyForm}>
      <Typography.Title>Создание вакансии</Typography.Title>
      <Row>
        <Col span={12}>
          <Typography.Title level={4}>Название вакансии</Typography.Title>
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Поле имя обязательно!" }]}
          >
            <Input
              placeholder="Введите название вакансии..."
              className={styles["big-input"]}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Typography.Title level={4}>Зарплата (тыс) ₽</Typography.Title>
          <Row gutter={[8, 8]}>
            <Col span={6}>
              <Form.Item name="salary_min">
                <InputNumber
                  placeholder="От..."
                  className={styles["number-input"]}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="salary_max">
                <InputNumber
                  placeholder="До..."
                  className={styles["number-input"]}
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
      <Col span={12}>
        <Typography.Title level={4}>Опыт</Typography.Title>
        <Row gutter={[8, 8]}>
          <Col span={6}>
            <Form.Item name="experience_min">
              <InputNumber
                placeholder="От..."
                className={styles["number-input"]}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="experience_max">
              <InputNumber
                placeholder="До..."
                className={styles["number-input"]}
              />
            </Form.Item>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Typography.Title level={4}>Требования</Typography.Title>
        <Form.Item name="description">
          <TextArea
            placeholder="Введите требования для вакансии..."
            className={styles["textarea"]}
          />
        </Form.Item>
      </Col>
      <EditableFormItem icon={<></>} readonly={false} title="Проф навыки">
        <HardSkills setTags={setTags} tags={tags} />
      </EditableFormItem>
      <Flex style={{ width: "100%" }} justify={"end"} align={"end"} gap={30}>
        <Form.Item>
          <Button type="text" size="large" onClick={() => navigate(-1)}>
            Отменить
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" size="large" onClick={handleCreateVacancy}>
            Сохранить
          </Button>
        </Form.Item>
      </Flex>
    </Form>
  );
};
