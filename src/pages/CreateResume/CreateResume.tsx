import {
  Button,
  Form,
  Col,
  Row,
  Divider,
  Typography,
  Input,
  Select,
  InputNumber,
  DatePicker
} from "antd";
import { Flex } from "antd";
import TextArea from "antd/es/input/TextArea";

import { useEffect, useState } from "react";

import { resumeApi } from "@api/resume/resume.api";
import { userApi } from "@api/user/user.api";
import { EditableFormItem } from "@components/EditableFormItem/EditableFormItem";
import { Loader } from "@components/Loader/Loader";
import { getRole } from "@infrastructure/axios/auth";
import { Role } from "@interfaces/user";

import styles from "./CreateResume.module.scss";
import { HardSkills } from "../Profile/Profile.Skills";

const educationType = [
  { id: 1, type: "Неполное среднее" },
  { id: 2, type: "Полное среднее" },
  { id: 3, type: "Высшее" }
];

const contactType = [
  { id: 1, contact: "telegram" },
  { id: 2, contact: "WhatsApp" },
  { id: 3, contact: "Email" },
  { id: 4, contact: "Phone" }
];

export const CreateResume = () => {
  const [createResumeForm] = Form.useForm();

  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<number>();
  const [resumeExist, setResumeExist] = useState(false);
  const [resumeId, setResumeId] = useState<number>();

  useEffect(() => {
    setLoading(true);
    userApi
      .getMyProfile({ role: getRole() as Role })
      .then((data) => {
        setUserId(data.user_id);
        resumeApi.getResumes().then((resumes) => {
          const currentResume = resumes.find(
            // eslint-disable-next-line
            (el: any) => +el.applicant_id === +data.user_id
          );
          console.log("currentResume", currentResume);
          if (currentResume) {
            createResumeForm.setFieldsValue(currentResume);
            createResumeForm.setFieldValue(
              "education",
              currentResume.educations
            );
            if (currentResume.personal_qualities !== "") {
              setTags(currentResume.personal_qualities.split(","));
            } else {
              setTags([]);
            }
            setResumeId(currentResume.id);
            setResumeExist(true);
          }
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const onFinish = () => {
    setLoading(true);
    const data = {
      applicant_id: userId,
      ...createResumeForm.getFieldsValue(),
      contacts: createResumeForm.getFieldValue("contacts") ?? [],
      employment_records:
        createResumeForm.getFieldValue("employment_records") ?? [],
      education: createResumeForm.getFieldValue("education") ?? [],
      personal_qualities: tags.join(",")
    };
    if (resumeExist) {
      resumeApi
        .updateResumes({ resumeId: resumeId, resume: data })
        .finally(() => setLoading(false));
    } else {
      resumeApi
        .createResumes({ resume: data })
        .finally(() => setLoading(false));
    }
  };

  if (loading) return <Loader active={loading} />;

  return (
    <>
      <Loader active={loading} />
      <Form
        layout={"vertical"}
        initialValues={{ layout: "horizontal" }}
        className={styles["profile-form"]}
        form={createResumeForm}
        onFinish={onFinish}
      >
        <Col span={24}>
          <Typography.Title>Моё резюме</Typography.Title>
          <Typography.Title level={5}>Название должности</Typography.Title>
          <Form.Item
            name="job_title"
            rules={[
              { required: true, message: "Напишите должность для резюме" }
            ]}
          >
            <Input placeholder="Введите название должности..." />
          </Form.Item>
          <Typography.Title level={5}>Описание резюме</Typography.Title>
          <Form.Item
            name="description"
            rules={[
              { required: true, message: "Напишите описание для резюме" }
            ]}
          >
            <TextArea
              placeholder="Введите описание резюме..."
              className={styles["textarea"]}
            />
          </Form.Item>
        </Col>
        <Divider style={{ borderColor: "#7E7E7E66" }} />
        <Row>
          <Col span={8}>
            <Typography.Title level={4}>Образование</Typography.Title>
            <Form.List name="education">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <div key={key}>
                      <Form.Item
                        {...restField}
                        name={[name, "education_id"]}
                        rules={[
                          { required: true, message: "Выберите образование" }
                        ]}
                      >
                        <Select
                          placeholder="Выберите образование"
                          options={educationType.map((option) => ({
                            value: option.id,
                            label: option.type
                          }))}
                          style={{ width: "80%" }}
                        />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "end_year"]}
                        rules={[
                          { required: true, message: "Введите год обучения" }
                        ]}
                      >
                        <InputNumber
                          className={styles["input"]}
                          placeholder="Год обучения"
                        />
                      </Form.Item>
                      <Button type="link" onClick={() => remove(name)}>
                        Удалить
                      </Button>
                    </div>
                  ))}
                  <Form.Item>
                    <Button type="text" onClick={() => add()} block>
                      Добавить образование
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Col>
          <Col span={8}>
            <Typography.Title level={4}>Опыт работы</Typography.Title>
            <Form.List name="employment_records">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <div key={key}>
                      <Form.Item
                        {...restField}
                        name={[name, "start_date"]}
                        rules={[
                          {
                            required: true,
                            message: "Выберите дату начала работы"
                          }
                        ]}
                      >
                        <DatePicker
                          className={styles["input"]}
                          placeholder="Дата начала работы"
                        />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "end_date"]}
                        rules={[
                          {
                            required: true,
                            message: "Выберите дату окончания работы"
                          }
                        ]}
                      >
                        <DatePicker
                          className={styles["input"]}
                          placeholder="Дата окончания работы"
                        />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "organization"]}
                        rules={[
                          {
                            required: true,
                            message: "Введите название организации"
                          }
                        ]}
                      >
                        <Input
                          className={styles["input"]}
                          placeholder="Название организации..."
                        />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "position"]}
                        rules={[
                          {
                            required: true,
                            message: "Введите название должности"
                          }
                        ]}
                      >
                        <Input
                          className={styles["input"]}
                          placeholder="Должность..."
                        />
                      </Form.Item>
                      <Button type="link" onClick={() => remove(name)}>
                        Удалить
                      </Button>
                    </div>
                  ))}
                  <Form.Item>
                    <Button type="text" onClick={() => add()} block>
                      Добавить опыт работы
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Col>
          <Col span={8}>
            <Typography.Title level={4}>Контакты</Typography.Title>
            <Form.List name="contacts">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <div key={key}>
                      <Form.Item
                        {...restField}
                        name={[name, "contact_id"]}
                        rules={[
                          { required: true, message: "Выберите контакты" }
                        ]}
                      >
                        <Select
                          placeholder="Выберите контакт"
                          options={contactType.map((option) => ({
                            value: option.id,
                            label: option.contact
                          }))}
                          style={{ width: "80%" }}
                        />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "extra_data"]}
                        rules={[
                          { required: true, message: "Введите номер телефона" }
                        ]}
                      >
                        <Input
                          className={styles["input"]}
                          placeholder="Номер телефона"
                        />
                      </Form.Item>
                      <Button type="link" onClick={() => remove(name)}>
                        Удалить
                      </Button>
                    </div>
                  ))}
                  <Form.Item>
                    <Button type="text" onClick={() => add()} block>
                      Добавить контакт
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Col>
        </Row>
        <Divider style={{ borderColor: "#7E7E7E66" }} />
        <Row>
          <Col span={24}>
            <EditableFormItem icon={<></>} readonly={false} title="Проф навыки">
              <HardSkills setTags={setTags} tags={tags} />
            </EditableFormItem>
          </Col>
        </Row>
        <Divider style={{ borderColor: "#7E7E7E66" }} />
        <Flex style={{ width: "100%" }} justify={"end"} align={"end"}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Сохранить
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </>
  );
};
