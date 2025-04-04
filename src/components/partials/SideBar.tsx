import React from "react";
import { BasicGroupInfo, UserConversation } from "../../../util/interfaces";
import { useDispatch } from "react-redux";
import { setConversationId, setGroupId } from "../../features/manager/manager-slice";
import { ClickType } from "../../../util/types";
import { isUUID } from "validator";

type CompType = ({info, activeId} : {info: UserConversation | BasicGroupInfo,
    activeId?: string}) => React.JSX.Element;
    
export default function SideBar({innerComp : InnerComp, data, activeId} : { innerComp: CompType, data: BasicGroupInfo[] | UserConversation[], activeId?: string}) {
    const dispatch = useDispatch();
    const handleClick = function handleClickingSideBarOption(event: ClickType) {
        event.preventDefault();
        event.stopPropagation();
        const target = event.target as HTMLElement;
        const realTarget = target.closest("sidebarOption") as HTMLDivElement;
        if (!realTarget) {
            return;
        };

        const possibleConvo = realTarget.dataset.convoid;
        const possibleGroup = realTarget.dataset.groupid;

        if (possibleConvo && isUUID(possibleConvo)) {
            dispatch(setConversationId(possibleConvo));
        } else if (possibleGroup && isUUID(possibleGroup)) {
            dispatch(setGroupId(possibleGroup))
        };

    }
    return (
        <div onClick={handleClick}>
            {data.map((info) => {
                return (<InnerComp info={info} {...(activeId === info.id ? {activeId} : {})} />)
            })}
        </div>
    )
};