import { Button } from "antd";
import { Typography } from "antd";

import React, { useState } from "react";

import { EditOutlined } from "@ant-design/icons";

import styles from "./EditableFormItem.module.scss";
import { EditableFormItemContext } from "./EditableFormItemContext";

interface IEditableFormItemProps {
  icon: React.ReactNode;
  title: string;
  readonly: boolean;
  notAlternate?: boolean;
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
  NotAlternatePart: React.FC<IEditableFormItemEditablePart>;
}

export const EditableFormItem: React.FC<IEditableFormItemProps> &
  IEditableFormItemCompound = ({
  icon,
  title,
  readonly,
  notAlternate,
  children
}) => {
  const [mode, setMode] = useState<"edit" | "readonly">("readonly");

  const handleChangeMode = () => {
    if (mode === "edit") setMode("readonly");
    else setMode("edit");
  };

  return (
    <section className={styles["editable-form"]}>
      <header>
        <div className={styles["editable-form_header"]}>
          {icon}
          <Typography.Title level={3} style={{ marginBottom: "0" }}>
            {title}
          </Typography.Title>
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
        <EditableFormItemContext.Provider
          value={{ mode, notAlternate: notAlternate ?? false }}
        >
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
  return !context.notAlternate && context.mode === "readonly" ? (
    <>{children}</>
  ) : (
    <></>
  );
};

const EditablePart: React.FC<IEditableFormItemEditablePart> = ({
  children
}) => {
  const context = React.useContext(EditableFormItemContext);
  return !context.notAlternate && context.mode === "edit" ? (
    <>{children}</>
  ) : (
    <></>
  );
};

const NotAlternatePart: React.FC<IEditableFormItemEditablePart> = ({
  children
}) => {
  const context = React.useContext(EditableFormItemContext);
  return context.notAlternate ? <>{children}</> : <></>;
};

EditableFormItem.ReadOnlyPart = ReadOnlyPart;
EditableFormItem.EditablePart = EditablePart;
EditableFormItem.NotAlternatePart = NotAlternatePart;

EditableFormItem.defaultProps = { notAlternate: false };
