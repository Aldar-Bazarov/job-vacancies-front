import { Avatar, Button, Col, Divider, Flex, Form, Row, message } from "antd";

import { useEffect, useState, useReducer } from "react";
import { Link, useParams } from "react-router-dom";

import { UpdateCompanyError, companyApi } from "@api/company/company.api";
import { CompanyInfoDto } from "@api/company/types";
import { userApi } from "@api/user/user.api";
import { EditableFormItem } from "@components/EditableFormItem/EditableFormItem";
import { AboutCompanyIcon } from "@components/Icons/AboutCompanyIcon";
import { MultipleItemsIcon } from "@components/Icons/MultipleItemsIcon";
import { Loader } from "@components/Loader/Loader";
import { Role } from "@interfaces/user";

import { EditableAbout, ReadonlyAbout } from "./Company.About";
import { EditableHeader, ReadonlyHeader } from "./Company.Header";
import styles from "./Company.module.scss";
import { Vacancies } from "./Company.Vacancies";
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
      companyApi
        .getCompany(parseInt(companyId))
        .then((data) => {
          dispatch({
            type: "set_company",
            value: data
          });
          setCompanyName(data.name);
          userApi
            .getMyProfile({ role: Role.Recruiter })
            .then((user_data) => {
              if (user_data.user_id === data.owner_id) {
                setIsReadOnly(false);
              } else {
                setIsReadOnly(true);
              }
            })
            .catch((e: Error) => {
              message.error(e.message);
            });
        })
        .catch((e: UpdateCompanyError) => {
          message.error(e.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
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
                    <Vacancies />
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
