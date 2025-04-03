import React from "react";
import { BasicGroupInfo, UserConversation } from "../../../util/interfaces";

type CompType = ({info, activeId} : {info: UserConversation | BasicGroupInfo,
    activeId?: string}) => React.JSX.Element;
    
export default function SideBar({innerComp : InnerComp, data, activeId} : { innerComp: CompType, data: BasicGroupInfo[] | UserConversation[], activeId?: string}) {
    return (
        <div>
            {data.map((info) => {
                return (<InnerComp info={info} {...(activeId === info.id ? {activeId} : {})} />)
            })}
        </div>
    )
};