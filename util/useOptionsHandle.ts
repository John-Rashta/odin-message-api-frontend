import { useState } from "react";
import { TargetData, CoordsInfo } from "./interfaces";

export default function useOptionsHandle() {
    const [openStatus, setOpenStatus] = useState(false);
    const [coords, setCoords] = useState({top: 0, left: 0} as CoordsInfo);
    const  [targetData, setTargetData] = useState({
        user: undefined,
        message: undefined,
        admin: undefined,
        friend: undefined
    } as TargetData);

    return [
        {
            checkShow: openStatus,
            changeShow: setOpenStatus,
        },
        {
            checkCoords: coords,
            changeCoords: setCoords,
        },
        {
            checkData: targetData,
            changeData: setTargetData
        },
    ]
};