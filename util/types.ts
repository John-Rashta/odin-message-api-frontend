import React from "react";

type ClickType = React.MouseEvent<HTMLDivElement, MouseEvent>; /// React OnClick Function Type
type FormType = React.FormEvent<HTMLFormElement>;
type SimpleFunctionType = () => void; /// No Return No Input Function Type
type RequestTypes = "FRIEND" | "GROUP";
export { ClickType, SimpleFunctionType, FormType, RequestTypes };