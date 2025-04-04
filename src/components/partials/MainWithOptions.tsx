import React from "react";
import useBothUserOptionsHandle from "../../../util/useBothUserOptionsHandle";
import { getFuncs } from "../../../util/helpers";
import { handleUserOptionsClick } from "../../../util/helpers";
import UserOptions from "./UserOptions";
import MinimalUserOptions from "./MinimalUserOptions";

export default function MainWithOptions({group, children} : {group?: string, children: React.ReactNode}) {
    const [full, min] = useBothUserOptionsHandle();
    return (
        <main style={{position: "relative"}} onContextMenu={(e) => handleUserOptionsClick(e, getFuncs([full.showFuncs, full.coordsFuncs, full.dataFuncs]))}
        onClick={(e) => handleUserOptionsClick(e, getFuncs([min.showFuncs, min.coordsFuncs, min.dataFuncs]))}>
                {(full.showFuncs.checkShow && !min.showFuncs.checkShow) && <UserOptions info={full.dataFuncs.checkData} changeVisible={() => full.showFuncs.changeShow(false)} coords={full.coordsFuncs.checkCoords} {...(typeof group === "string" ? {group} : {})} />}
                {(!full.showFuncs.checkShow && min.showFuncs.checkShow) && <MinimalUserOptions info={min.dataFuncs.checkData} changeVisible={() => min.showFuncs.changeShow(false)} coords={min.coordsFuncs.checkCoords} {...(typeof group === "string" ? {group} : {})} />}
            {children}
        </main>
    )
}