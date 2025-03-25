import { useSelector } from "react-redux";
import { selectMyId } from "../../features/manager/manager-slice";
import { RequestInfo } from "../../../util/interfaces";

export default function Request({info} : {info: RequestInfo}) {
    const myId = useSelector(selectMyId);

    if (info.type === "GROUP") {

        if (!info.group) {
            return;
        };
        return (
            <div data-id={info.id} data-group={info.group.id}>
                {info.sender.id === myId ? `You invited ${info.receiver.username} to ${info.group.name}` : 
                `${info.sender.username} invited you to ${info.group.name}`}
            </div>
        )
    } else if (info.type === "FRIEND") {
        return (
            <div data-id={info.id}>
                {info.sender.id === myId ? `You sent a Friend Request to ${info.receiver.username}`: 
                `${info.sender.username} sent you a Friend Request`}
            </div>
        )
    } else {
        return;
    };
};