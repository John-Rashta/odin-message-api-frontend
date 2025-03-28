import { useState } from "react";
import { CoordsInfo } from "./interfaces";

export default function useOptionsHandle() {
    const [openStatus, setOpenStatus] = useState(false);
    const [coords, setCoords] = useState({top: 0, left: 0} as CoordsInfo);

    return [
        {
            checkShow: openStatus,
            changeShow: setOpenStatus,
        },
        {
            checkCoords: coords,
            changeCoords: setCoords,
        },
    ]
};