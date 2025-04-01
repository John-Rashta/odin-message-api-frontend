import React from "react";
import { TypedLazyQueryTrigger, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

type LazyGetTriggerType<T, U> = TypedLazyQueryTrigger<
  U, ///response
  T, ///parameters
  BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>
>;
type ClickType = React.MouseEvent<HTMLDivElement, MouseEvent>; /// React OnClick Function Type
type FormType = React.FormEvent<HTMLFormElement>;
type SimpleFunctionType = () => void; /// No Return No Input Function Type
type RequestTypes = "FRIEND" | "GROUP";
type ButtonClickType = React.MouseEvent<HTMLButtonElement, MouseEvent>;
export { ClickType, SimpleFunctionType, FormType, RequestTypes, LazyGetTriggerType, ButtonClickType };