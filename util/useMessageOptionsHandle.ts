import useOptionsHandle from "./useOptionsHandle";
import { TargetMessage } from "./interfaces";
import { useState } from "react";

export default function useMessageOptionsHandle() {
    const  [targetData, setTargetData] = useState({
        message: undefined,
    } as TargetMessage);

    const [showOptions, coordsOptions] = useOptionsHandle();

    return [
        showOptions,
        coordsOptions,
        {
        checkData: targetData,
        changeData: setTargetData
        }
    ]
}