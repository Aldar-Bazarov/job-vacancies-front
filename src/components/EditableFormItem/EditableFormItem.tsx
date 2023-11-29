import { Button, Col, Flex, Row } from "antd";
import { Typography } from "antd";

import React, { useEffect, useState } from "react";

import { EditOutlined } from "@ant-design/icons";

import styles from "./EditableFormItem.module.scss";

interface IEditableFormItemProps {
  icon: React.ReactNode;
  title: string;
  readonly: boolean;
  children: React.ReactNode;
}

interface IEditableFormItemReadOnlyPart {
  children: React.ReactNode;
}

interface IEditableFormItemEditablePart {
  children: React.ReactNode;
}

interface IEditableFormItemCompound {
  ReadOnlyPart: React.FC<IEditableFormItemReadOnlyPart>;
  EditablePart: React.FC<IEditableFormItemEditablePart>;
}

interface IEditableFormItemContext {
  mode: "edit" | "readonly";
}

const EditableFormItemContext = React.createContext<IEditableFormItemContext>({
  mode: "readonly"
});

export const EditableFormItem: React.FC<IEditableFormItemProps> &
  IEditableFormItemCompound = ({ icon, title, readonly, children }) => {
  const [mode, setMode] = useState<"edit" | "readonly">("readonly");

  const handleChangeMode = () => {
    if (mode === "edit") setMode("readonly");
    else setMode("edit");
  };

  return (
    <section className={styles["editable-form"]}>
      <header>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {icon}
          <Typography.Title level={3}>{title}</Typography.Title>
          {!readonly && (
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={handleChangeMode}
            ></Button>
          )}
        </div>
      </header>
      <article>
        <EditableFormItemContext.Provider value={{ mode }}>
          {children}
        </EditableFormItemContext.Provider>
      </article>
    </section>
  );
};

const ReadOnlyPart: React.FC<IEditableFormItemReadOnlyPart> = ({
  children
}) => {
  const context = React.useContext(EditableFormItemContext);
  return context.mode === "readonly" ? <>{children}</> : <></>;
};

const EditablePart: React.FC<IEditableFormItemEditablePart> = ({
  children
}) => {
  const context = React.useContext(EditableFormItemContext);
  return context.mode === "edit" ? <>{children}</> : <></>;
};

EditableFormItem.ReadOnlyPart = ReadOnlyPart;
EditableFormItem.EditablePart = EditablePart;
