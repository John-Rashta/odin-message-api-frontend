import useOptionsHandle from "./useOptionsHandle";
import { TargetUser } from "./interfaces";
import { useState } from "react";

export default function  useUserOptionsHandle() {
    const  [targetData, setTargetData] = useState({
        user: undefined,
        admin: undefined,
        friend: undefined
    } as TargetUser);

    const [showOptions, coordsOptions] = useOptionsHandle();

    return [
        showOptions,
        coordsOptions,
        {
        checkData: targetData,
        changeData: setTargetData
        }
    ]
};