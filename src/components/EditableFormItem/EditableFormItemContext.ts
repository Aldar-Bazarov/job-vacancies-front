import React from "react";

interface IEditableFormItemContext {
  mode: "edit" | "readonly";
  notAlternate: boolean;
}

export const EditableFormItemContext =
  React.createContext<IEditableFormItemContext>({
    mode: "readonly",
    notAlternate: false
  });
