import { Avatar, Button, Col, Divider, Flex, Form, Row } from "antd";

import { useEffect, useState, useReducer } from "react";
import { Link, useParams } from "react-router-dom";

import { CompanyInfoDto } from "@api/company/types";
import { EditableFormItem } from "@components/EditableFormItem/EditableFormItem";
import { AboutCompanyIcon } from "@components/Icons/AboutCompanyIcon";
import { MultipleItemsIcon } from "@components/Icons/MultipleItemsIcon";
import { Loader } from "@components/Loader/Loader";

import { EditableAbout, ReadonlyAbout } from "./Company.About";
import { EditableHeader, ReadonlyHeader } from "./Company.Header";
import styles from "./Company.module.scss";
import { CompanyContext } from "./CompanyContext";
import { CompanyReducer } from "./CompanyReducer";

export const Company = () => {
  const [companyData, dispatch] = useReducer(CompanyReducer, null);
  const { companyId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    if (companyId !== undefined) {
      setIsLoading(true);
      const mock: CompanyInfoDto = {
        created_at: new Date(),
        description: "description",
        id: 0,
        name: "name",
        owner_id: 0,
        vacancies: [
          {
            id: 0,
            description: "Vacancy 1",
            created_at: new Date(),
            company_id: 0,
            status_id: 0
          },
          {
            id: 1,
            description: "Vacancy 2",
            created_at: new Date(),
            company_id: 0,
            status_id: 1
          }
        ]
      };
      dispatch({
        type: "set_company",
        value: mock
      });
      setCompanyName(mock.name);
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
      {companyData && (
        <CompanyContext.Provider
          value={{
            dispatch,
            isReadOnly,
            companyData,
            setIsLoading
          }}
        >
          <Form
            layout={"vertical"}
            initialValues={{ layout: "horizontal" }}
            className={styles["company-form"]}
          >
            <Row>
              <Col span={24}>
                <Row align="middle" justify="start">
                  <Col flex="110px" style={{ marginBottom: "auto" }}>
                    <Avatar
                      size={100}
                      src={imageUrl ?? "/images/default-avatar.jpg"}
                    />
                  </Col>
                  <Col flex="auto">
                    <EditableFormItem
                      icon={<></>}
                      title={companyName}
                      readonly={isReadOnly}
                    >
                      <EditableFormItem.EditablePart>
                        <EditableHeader setImageUrl={setImageUrl} />
                      </EditableFormItem.EditablePart>
                      <EditableFormItem.ReadOnlyPart>
                        <ReadonlyHeader />
                      </EditableFormItem.ReadOnlyPart>
                    </EditableFormItem>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Divider style={{ borderColor: "#7E7E7E66" }} />

            <Row>
              <Col span={24}>
                <EditableFormItem
                  icon={<AboutCompanyIcon />}
                  title={"О компании"}
                  readonly={isReadOnly}
                >
                  <EditableFormItem.EditablePart>
                    <EditableAbout />
                  </EditableFormItem.EditablePart>
                  <EditableFormItem.ReadOnlyPart>
                    <ReadonlyAbout />
                  </EditableFormItem.ReadOnlyPart>
                </EditableFormItem>
              </Col>
            </Row>
            <Divider style={{ borderColor: "#7E7E7E66" }} />

            <Row>
              <Col span={24}>
                <EditableFormItem
                  icon={<MultipleItemsIcon />}
                  title={"Вакансии"}
                  readonly={isReadOnly}
                >
                  <EditableFormItem.NotAlternatePart>
                    <p>"Soon..."</p>
                  </EditableFormItem.NotAlternatePart>
                </EditableFormItem>
              </Col>
            </Row>
            <Divider style={{ borderColor: "#7E7E7E66" }} />

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
        </CompanyContext.Provider>
      )}
    </>
  );
};
