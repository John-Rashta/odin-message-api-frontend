import { useState } from "react";
import { ButtonClickType } from "../../../util/types";
import { useGetGroupsQuery, useMakeRequestMutation, useGetUserQuery } from "../../features/message-api/message-api-slice";
import GroupSelection from "./GroupSelection";
import { selectUserId } from "../../features/manager/manager-slice";
import { useSelector } from "react-redux";
import StartConvoButton from "./StartConvoButton";
import { isUUID } from "validator";

export default function UserProfile() {
    const userid = useSelector(selectUserId);
    if (!isUUID(userid)) {
        return (
            <main>
                <div>Try searching a User in the search bar!</div>
            </main>
            )
    };
    const {data, error, isLoading } = useGetUserQuery(userid);
    const [makeRequest] = useMakeRequestMutation();
    const [showOptions, setShowOptions] = useState(false);
    const { groupsData } = useGetGroupsQuery(undefined, {selectFromResult: ({data}) => ({
            groupsData: data?.user.groups
        })});

    const handleFriendRequest = function sendFriendRequestToUser(event : ButtonClickType) {
        event.stopPropagation();
        if (!data) {
            return;
        }
        const target = event.target as HTMLButtonElement;
        target.disabled = true;
        makeRequest({targetid: data.user.id, type: "FRIEND"}).unwrap().then(() => {
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
            {
            isLoading  ? (
                <div>Loading </div>
            ) : error ? (
                <div>Error loading!</div>
            ) : data && data.user ? (
                <>
                     <img src={data.user.customIcon?.url || data.user.icon.source} alt="" />
                    <div>{data.user.username}</div>
                    <div>{data.user.name}</div>
                    <button onClick={handleFriendRequest}>Add Friend</button>
                    <StartConvoButton userid={data.user.id} />
                    <div style={{position: "relative"}}>
                        <div onClick={() => setShowOptions(!showOptions)}>invite to group</div>
                        {showOptions && <GroupSelection groupsData={groupsData} userid={data.user.id} hideMe={() => setShowOptions(false)} />}
                    </div>
                    <div>{data.user.id}</div>
                    <div>{data.user.joinedAt.toDateString()}</div>
                    <div>{data.user.aboutMe}</div>
                </>
            ) : <div>No User Found.</div>
            }
        </main>
    )
};