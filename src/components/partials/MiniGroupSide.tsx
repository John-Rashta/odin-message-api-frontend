import { BasicGroupInfo } from "../../../util/interfaces";
import { sidebarOptionClass } from "../../../util/globalValues";

export default function MiniGroupSide({info, activeId} : {info: BasicGroupInfo, activeId?: string}) {
    return (
        <div data-groupid={info.id} className={`${sidebarOptionClass} ${(activeId === info.id ? "selected"  : "")}` }>
            {typeof info.name === "string" ? <div>{info.name}</div> : null}
            <div>{info.members.map(user => user.username).toString()}</div>
        </div>
)};