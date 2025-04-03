import React from "react";
import { TypedLazyQueryTrigger, BaseQueryFn, FetchArgs, FetchBaseQueryError, TypedMutationTrigger } from '@reduxjs/toolkit/query/react';
import { MessageForm, ReturnMessage, UId } from "./interfaces";

type MutationTriggerType<T, U> = TypedMutationTrigger<
  U, ///response
  T, ///parameters
  BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>
>;
type LazyGetTriggerType<T, U> = TypedLazyQueryTrigger<
  U, ///response
  T, ///parameters
  BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>
>;

type BasicClickType = React.MouseEvent<HTMLElement, MouseEvent>;
type ClickType = React.MouseEvent<HTMLDivElement, MouseEvent>; /// React OnClick Function Type
type FormType = React.FormEvent<HTMLFormElement>;
type SimpleFunctionType = () => void; /// No Return No Input Function Type
type RequestTypes = "FRIEND" | "GROUP";
type ButtonClickType = React.MouseEvent<HTMLButtonElement, MouseEvent>;
type EditStateType = React.Dispatch<React.SetStateAction<string>>;
type ConversationTriggerType = MutationTriggerType<MessageForm, ReturnMessage>;
type GroupTriggerType = MutationTriggerType<MessageForm & UId, ReturnMessage>;
type TriggerType = ConversationTriggerType | GroupTriggerType ;

export { BasicClickType, ConversationTriggerType, GroupTriggerType, TriggerType, EditStateType, MutationTriggerType, ClickType, SimpleFunctionType, FormType, RequestTypes, LazyGetTriggerType, ButtonClickType };