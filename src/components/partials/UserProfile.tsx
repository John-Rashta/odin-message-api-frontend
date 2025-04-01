import { useState } from "react";
import { UserInfo } from "../../../util/interfaces";
import { ButtonClickType } from "../../../util/types";
import { useGetGroupsQuery, useMakeRequestMutation } from "../../features/message-api/message-api-slice";
import GroupSelection from "./GroupSelection";

export default function UserProfile({info} : {info: UserInfo}) {
    const [makeRequest] = useMakeRequestMutation();
    const [showOptions, setShowOptions] = useState(false);
    const { groupsData } = useGetGroupsQuery(undefined, {selectFromResult: ({data}) => ({
            groupsData: data?.user.groups
        })});

    const handleFriendRequest = function sendFriendRequestToUser(event : ButtonClickType) {
        event.stopPropagation();
        const target = event.target as HTMLButtonElement;
        target.disabled = true;
        makeRequest({targetid: info.id, type: "FRIEND"}).unwrap().then(() => {
            target.textContent = "Request Sent";
        }).catch((response) => {
            if (response.data.message === "Already Friends") {
                target.textContent = "Already Friends"
            } else {
                target.disabled = false;
            }
        })
    };

    return (
        <main>
            <img src={info.customIcon?.url || info.icon.source} alt="" />
            <div>{info.username}</div>
            <div>{info.name}</div>
            <button onClick={handleFriendRequest}>Add Friend</button>
            <div style={{position: "relative"}}>
                <div onClick={() => setShowOptions(!showOptions)}>invite to group</div>
                {showOptions && <GroupSelection groupsData={groupsData} userid={info.id} hideMe={() => setShowOptions(false)} />}
            </div>
            <div>{info.id}</div>
            <div>{info.joinedAt.toDateString()}</div>
            <div>{info.aboutMe}</div>
        </main>
    )
};