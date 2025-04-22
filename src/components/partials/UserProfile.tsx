import { useEffect, useRef, useState } from "react";
import { ButtonClickType } from "../../../util/types";
import { useGetGroupsQuery, useMakeRequestMutation, useGetUserQuery } from "../../features/message-api/message-api-slice";
import GroupSelection from "./GroupSelection";
import { selectMyId, selectUserId } from "../../features/manager/manager-slice";
import { useSelector } from "react-redux";
import StartConvoButton from "./StartConvoButton";
import { isUUID } from "validator";

export default function UserProfile() {
    const userid = useSelector(selectUserId);
    const myId = useSelector(selectMyId);
    const {data, error, isLoading } = useGetUserQuery(userid);
    const [makeRequest] = useMakeRequestMutation();
    const [showOptions, setShowOptions] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const { groupsData } = useGetGroupsQuery(undefined, {selectFromResult: ({data}) => ({
            groupsData: data?.user.groups
        })});

    useEffect(() => {
        const resetForm = function resetWhenNewUser() {
            if (!isUUID(userid)) {
                return;
            };

            if (buttonRef.current) {
                buttonRef.current.disabled = false;
                buttonRef.current.textContent = "Add Friend";
            };
        };

        resetForm();
    }, [userid]);

    const handleFriendRequest = function sendFriendRequestToUser(event : ButtonClickType) {
        event.stopPropagation();
        if (!data) {
            return;
        };
        if (myId === userid) {
            return;
        }
        const target = event.target as HTMLButtonElement;
        target.disabled = true;
        makeRequest({targetid: data.user.id, type: "FRIEND"}).unwrap().then(() => {
            target.textContent = "Request Sent";
        }).catch((response) => {
            if (response.data.message === "Already Friends") {
                target.textContent = "Already Friends";
            } else if (response.data.message === "Request Already Sent") {
                target.textContent = "Request Already Sent";
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
                    <div>Name:{data.user.name}</div>
                    <button ref={buttonRef} onClick={handleFriendRequest}>Add Friend</button>
                    <StartConvoButton userid={data.user.id} />
                    <div style={{position: "relative"}}>
                        <div onClick={() => setShowOptions(!showOptions)}>invite to group</div>
                        {showOptions && <GroupSelection groupsData={groupsData} userid={data.user.id} hideMe={() => setShowOptions(false)} />}
                    </div>
                    <div>{data.user.id}</div>
                    <div>{data.user.joinedAt.toString()}</div>
                    <div>About me:{data.user.aboutMe}</div>
                </>
            ) : <div>No User Found.</div>
            }
        </main>
    )
};