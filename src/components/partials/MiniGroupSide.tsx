import { BasicGroupInfo } from "../../../util/interfaces";

export default function MiniGroupSide({info, activeId} : {info: BasicGroupInfo, activeId?: string}) {
    return (
        <div data-id={info.id} {...(activeId === info.id ? {className: "selected"}  : {})}>
            <div>{info.name}</div>
            <div>{info.members.map(user => user.username).toString()}</div>
        </div>
)};