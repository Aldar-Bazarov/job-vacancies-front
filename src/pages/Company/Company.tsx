import { Avatar, Button, Col, Divider, Flex, Form, Row, message } from "antd";

import { useEffect, useState, useReducer } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import {
  CreateCompanyError,
  UpdateCompanyError,
  companyApi
} from "@api/company/company.api";
import { CompanyInfoDto } from "@api/company/types";
import { userApi } from "@api/user/user.api";
import { EditableFormItem } from "@components/EditableFormItem/EditableFormItem";
import { AboutCompanyIcon } from "@components/Icons/AboutCompanyIcon";
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
  const location = useLocation();
  const navigator = useNavigate();
  const [createMode, setCreateMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const BACKEND_URL = "https://jobhunter.woopwoopserver.com";

  useEffect(() => {
    setIsLoading(true);
    userApi
      .getMyProfile({ role: Role.Recruiter })
      .then((user_data) => {
        // колхозный способ получения текущего владельца
        setUserId(user_data.user_id);
      })
      .catch(() => {
        setUserId(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
    if (location.pathname === "/company/create") {
      setCreateMode(true);
      setIsReadOnly(false);
      const emptyCompany: CompanyInfoDto = {
        address: "",
        description: "",
        email: "",
        name: "",
        phone: "",
        population: 0,
        owner_id: userId ?? -1
      };
      dispatch({
        type: "set_company",
        value: emptyCompany
      });
    } else if (companyId !== undefined) {
      setCreateMode(false);
      setIsLoading(true);
      companyApi
        .getCompany(parseInt(companyId))
        .then((data) => {
          dispatch({
            type: "set_company",
            value: data
          });
          setCompanyName(data.name ?? "");
          if (data.logo_path === "" || data.logo_path === null) {
            setImageUrl(null);
          } else {
            setImageUrl(BACKEND_URL + data.logo_path?.substring(0));
          }
          if (userId === data.owner_id) {
            setIsReadOnly(false);
          } else {
            setIsReadOnly(true);
          }
        })
        .catch(() => {
          setIsReadOnly(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [companyId, location.pathname, userId]);

  const handleSave = () => {
    if (!companyData) return;
    let method = companyApi.updateCompany({
      id: companyData.id ?? -1,
      description: companyData.description ?? "",
      name: companyData.name ?? "",
      owner_id: companyData.owner_id ?? -1,
      phone: companyData.phone ?? "",
      email: companyData.email ?? "",
      population: companyData.population ?? 0,
      address: companyData.address ?? ""
    });
    if (createMode) {
      method = companyApi.createCompany({
        description: companyData.description ?? "",
        name: companyData.name ?? "",
        owner_id: companyData.owner_id ?? -1,
        phone: companyData.phone ?? "",
        email: companyData.email ?? "",
        population: companyData.population ?? 0,
        address: companyData.address ?? ""
      });
    }
    setIsLoading(true);
    method
      .then((data) => {
        dispatch({
          type: "set_company",
          value: data
        });
        setCompanyName(data.name ?? "");
        if (
          data.logo_path !== imageUrl &&
          data.id != null &&
          imageUrl !== null
        ) {
          companyApi.loadPhoto(data.id, imageUrl);
        }
        setIsReadOnly(false);
        if (createMode) {
          navigator(`/company/${data.id}`);
        }
      })
      .catch((e: UpdateCompanyError) => {
        message.error(e.message);
      })
      .catch((e: CreateCompanyError) => {
        message.error(e.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCreateVacancy = () => {
    navigator("/create-vacancy", { state: { company_id: companyId } });
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

            {!createMode && companyId && (
              <Row>
                <Col span={24}>
                  <EditableFormItem
                    icon={<></>}
                    title={"Вакансии"}
                    readonly={isReadOnly}
                  >
                    <Vacancies company_id={+companyId} />
                  </EditableFormItem>
                </Col>
              </Row>
            )}
            {!isReadOnly && (
              <Button
                type="primary"
                style={{ marginTop: "15px" }}
                onClick={handleCreateVacancy}
              >
                Создать вакансию
              </Button>
            )}
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
