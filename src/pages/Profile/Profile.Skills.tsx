import { Form } from "antd";

import React from "react";

import { EditableFormItemContext } from "@components/EditableFormItem/EditableFormItemContext";
import { TagPool } from "@components/TagPool/TagPool";

import { IHardSkillsProps } from "./Profile.Types";
import { ProfileContext } from "./ProfileContext";

export const HardSkills: React.FC<IHardSkillsProps> = ({ setTags, tags }) => {
  const profileContext = React.useContext(ProfileContext);
  const editableFormItemContext = React.useContext(EditableFormItemContext);

  return (
    <Form.Item>
      <TagPool
        tags={tags}
        setTags={setTags}
        readOnly={
          editableFormItemContext.mode === "readonly" ||
          profileContext?.isReadOnly
        }
      />
    </Form.Item>
  );
};
