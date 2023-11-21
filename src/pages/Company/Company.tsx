import {
  Avatar,
  Button,
  Col,
  Flex,
  Form,
  Input,
  Row,
  Typography,
  Upload,
  UploadFile,
  UploadProps,
  message
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { RcFile, UploadChangeParam } from "antd/es/upload";

import { useEffect, useState, useReducer } from "react";
import { useParams } from "react-router-dom";

import { UploadOutlined } from "@ant-design/icons";
import {
  CompanyInfoDto,
  GetCompanyError,
  UpdateCompanyError,
  companyApi
} from "@api/company/company.api";
import { Loader } from "@components/Loader/Loader";
import { beforeUpload, getBase64 } from "@infrastructure/image-upload";

import styles from "./Company.module.scss";

type CompanyReducerAction = {
  type: "set_company" | "change_name" | "change_description"; // eslint-disable-next-line
  value?: any;
};
function reducer(
  state: CompanyInfoDto | null,
  action: CompanyReducerAction
): CompanyInfoDto | null {
  let data = null;
  if (state !== null) data = { ...state };
  switch (action.type) {
    case "set_company": {
      if (action.value === undefined)
        throw Error(
          `action.value must be not null for action.type === ${action.type}`
        );
      data = { ...action.value };
      return data;
    }
    case "change_name": {
      if (action.value === undefined)
        throw Error(
          `action.value must be not null for action.type === ${action.type}`
        );
      if (data === null) throw Error(`state must be not null`);
      data.name = action.value;
      return data;
    }
    case "change_description": {
      if (action.value === undefined)
        throw Error(
          `action.value must be not null for action.type === ${action.type}`
        );
      if (data === null) throw Error(`state must be not null`);
      data.description = action.value;
      return data;
    }
  }
}

export const Company = () => {
  const { companyId } = useParams();
  const [companyData, dispatch] = useReducer(reducer, null);
  const [isLoading, setIsLoading] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (companyId !== undefined) {
      setIsLoading(true);
      const mock: CompanyInfoDto = {
        created_at: new Date(),
        description: "description",
        id: 0,
        name: "name",
        owner_id: 0
      };
      dispatch({
        type: "set_company",
        value: mock
      });
      setIsReadOnly(false);
      setIsLoading(false);
      // companyApi
      //   .getCompany(parseInt(companyId))
      //   .then((data) => {
      //     dispatch({
      //       type: "set_company",
      //       value: data
      //     });
      //     setIsReadOnly(false);
      //   })
      //   .catch((e: UpdateCompanyError) => {
      //     message.error(e.message);
      //   })
      //   .finally(() => {
      //     setIsLoading(false);
      //   });
    } else {
      setIsReadOnly(true);
    }
  }, [companyId]);

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setIsLoading(true);
    } else if (info.file.status === "done") {
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setImageUrl(url);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  };
  // eslint-disable-next-line
  const dummyRequest = (options: any) => {
    // Пока что сделать заглушку для upload фото на сервер
    setTimeout(() => {
      options.onSuccess("ok");
    }, 0);
  };

  const handleSave = () => {
    if (!companyData) return;
    // setIsLoading(true);
    // companyApi
    //   .updateCompany({
    //     id: companyData.id,
    //     description: companyData.description,
    //     name: companyData.name,
    //     owner_id: companyData.owner_id
    //   })
    //   .then((data) => {
    //     dispatch({
    //       type: "set_company",
    //       value: data
    //     });
    //     setIsReadOnly(false);
    //   })
    //   .catch((e: UpdateCompanyError) => {
    //     message.error(e.message);
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
  };

  return (
    <>
      <Loader active={isLoading} />
      {!companyData ? (
        <div style={{ padding: "1rem" }}>
          <Typography.Title>Организация не найдена.</Typography.Title>
        </div>
      ) : (
        <Form
          layout={"vertical"}
          initialValues={{ layout: "horizontal" }}
          className={styles["company-form"]}
        >
          <Typography.Title>Организация</Typography.Title>
          <Row>
            <Col span={24}>
              <Row align="middle">
                <Col flex="210px">
                  <Avatar
                    size={200}
                    src={imageUrl ?? "/images/default-avatar.jpg"}
                  />
                </Col>

                <Col flex="auto">
                  <Row justify="space-between">
                    <Col span={8}>
                      <Form.Item label="Название">
                        <Input
                          value={companyData?.name}
                          onChange={(e) =>
                            dispatch({
                              type: "change_name",
                              value: e.target.value
                            })
                          }
                          readOnly={isReadOnly}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={14}>
                      {!isReadOnly && (
                        <Flex
                          style={{ width: "100%" }}
                          justify={"end"}
                          align={"end"}
                          gap={10}
                        >
                          <Upload
                            showUploadList={false}
                            customRequest={dummyRequest}
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                          >
                            <Button
                              icon={<UploadOutlined />}
                              type="primary"
                              size="large"
                            >
                              Добавить фото
                            </Button>
                          </Upload>
                          <Button
                            danger
                            style={{ backgroundColor: "white" }}
                            size="large"
                          >
                            Удалить
                          </Button>
                        </Flex>
                      )}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item label="Почта">
                <Input placeholder="Soon..." readOnly={isReadOnly} />
              </Form.Item>
              <Form.Item label="Номер телефона">
                <Input placeholder="Soon..." readOnly={isReadOnly} />
              </Form.Item>
              <Form.Item label="Telegram">
                <Input placeholder="Soon..." readOnly={isReadOnly} />
              </Form.Item>
              <Form.Item label="О компании">
                <TextArea
                  value={companyData?.description}
                  onChange={(e) =>
                    dispatch({
                      type: "change_description",
                      value: e.target.value
                    })
                  }
                  rows={4}
                  style={{ height: 120, resize: "none" }}
                  readOnly={isReadOnly}
                />
              </Form.Item>
            </Col>
          </Row>

          {!isReadOnly && (
            <Flex style={{ width: "100%" }} justify={"end"} align={"end"}>
              <Form.Item>
                <Button type="primary" size="large" onClick={handleSave}>
                  Сохранить
                </Button>
              </Form.Item>
            </Flex>
          )}
        </Form>
      )}
    </>
  );
};
