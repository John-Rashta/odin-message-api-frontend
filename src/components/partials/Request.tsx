import { useSelector } from "react-redux";
import { selectMyId } from "../../features/manager/manager-slice";
import { RequestInfo } from "../../../util/interfaces";
import { useAcceptRequestMutation, useDeleteRequestMutation } from "../../features/message-api/message-api-slice";

export default function Request({info} : {info: RequestInfo}) {
    const myId = useSelector(selectMyId);
    const [acceptRequest] = useAcceptRequestMutation();
    const [deleteRequest] = useDeleteRequestMutation();

    const generateOptions = function displayRequestOptions() {
        return (
            <>
                {info.sender.id === myId ? <div> <button onClick={()=> deleteRequest({id: info.id})} >Cancel</button> </div> :   
                    <div> 
                        <button onClick={() =>  acceptRequest({id: info.id})} >Accept</button>
                        <button onClick={() => deleteRequest({id: info.id})}>Reject</button>
                    </div>
                }
            </>
        )
    };

    if (info.type === "GROUP") {

        if (!info.group) {
            return;
        };
        return (
            <div>
                <div data-id={info.id} data-group={info.group.id}>
                    {info.sender.id === myId ? `You invited ${info.receiver.username} to ${info.group.name}` : 
                    `${info.sender.username} invited you to ${info.group.name}`}
                </div>
                {generateOptions()}
            </div>
        )
    } else if (info.type === "FRIEND") {
        return (
            <div>
                <div data-id={info.id}>
                    {info.sender.id === myId ? `You sent a Friend Request to ${info.receiver.username}`: 
                    `${info.sender.username} sent you a Friend Request`}
                </div>
                {generateOptions()}
            </div>
        )
    } else {
        return;
    };
};