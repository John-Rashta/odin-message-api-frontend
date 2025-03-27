import { BasicGroupInfo } from "../../../util/interfaces";

export default function MiniGroupSide({info} : {info: BasicGroupInfo}) {
    return (
        <div data-id={info.id}>
            <div>{info.name}</div>
            <div>{info.members.map(user => user.username).toString()}</div>
        </div>
)};