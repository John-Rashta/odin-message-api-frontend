import React, { useRef } from "react";
import useBothUserOptionsHandle from "../../../util/useBothUserOptionsHandle";
import { getFuncs } from "../../../util/helpers";
import { handleUserOptionsClick } from "../../../util/helpers";
import UserOptions from "./UserOptions";
import MinimalUserOptions from "./MinimalUserOptions";
import { useSelector } from "react-redux";
import { selectMyId } from "../../features/manager/manager-slice";

export default function MainWithOptions({group, children, members} : {group?: string, children: React.ReactNode, members?: string[]}) {
    const [full, min] = useBothUserOptionsHandle();
    const myId = useSelector(selectMyId);
    
    return (
        <main onContextMenu={(e) => {
            e.stopPropagation();
            e.preventDefault();
            if (min.showFuncs.checkShow) {
                min.showFuncs.changeShow(false);
                return;
            } else {
                handleUserOptionsClick(myId, e, getFuncs([full.showFuncs, full.coordsFuncs, full.dataFuncs]));
                return;
            }
        }}
        onClick={(e) =>{
            e.stopPropagation();
            e.preventDefault();
            const target = e.target as HTMLElement;
            if (full.showFuncs.checkShow) {
                full.showFuncs.changeShow(false);
                return;
            }else if (min.showFuncs.checkShow) {
                min.showFuncs.changeShow(false);
                return;
            }else if (target.closest(".sidebarOption")) {
                return;
            }else {
                handleUserOptionsClick(myId, e, getFuncs([min.showFuncs, min.coordsFuncs, min.dataFuncs]));
            }
            }}>
                {full.showFuncs.checkShow && <UserOptions info={full.dataFuncs.checkData} changeVisible={() => full.showFuncs.changeShow(false)} coords={full.coordsFuncs.checkCoords} {...((typeof group === "string" && members && members.includes(full.dataFuncs.checkData.user || "")) ? {group} : {})} />}
                {min.showFuncs.checkShow && <MinimalUserOptions info={min.dataFuncs.checkData} changeVisible={() => min.showFuncs.changeShow(false)} coords={min.coordsFuncs.checkCoords} {...((typeof group === "string" && members && members.includes(full.dataFuncs.checkData.user || "")) ? {group} : {})} />}
            {children}
        </main>
    )
}