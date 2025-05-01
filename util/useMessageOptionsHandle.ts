import useOptionsHandle from "./useOptionsHandle";
import {
  TargetMessage,
  CoordsType,
  ShowType,
  MessageDataType,
} from "./interfaces";
import { useState } from "react";

type MessageOptionsType = [ShowType, CoordsType, MessageDataType];

export default function useMessageOptionsHandle() {
  const [targetData, setTargetData] = useState({
    message: undefined,
  } as TargetMessage);

  const [showOptions, coordsOptions] = useOptionsHandle();

  return [
    showOptions,
    coordsOptions,
    {
      checkData: targetData,
      changeData: setTargetData,
    },
  ] as MessageOptionsType;
}
