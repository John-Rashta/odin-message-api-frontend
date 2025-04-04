import { BasicGroupInfo } from "../../../util/interfaces";

export default function MiniGroupSide({info, activeId} : {info: BasicGroupInfo, activeId?: string}) {
    return (
        <div data-groupid={info.id} className={`sidebarOption ${(activeId === info.id ? "selected"  : "")}` }>
            {typeof info.name === "string" ? <div>{info.name}</div> : null}
            <div>{info.members.map(user => user.username).toString()}</div>
        </div>
)};