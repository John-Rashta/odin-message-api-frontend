import { TargetUser, CoordsProp } from "../../../util/interfaces";
import { SimpleFunctionType, ClickType } from "../../../util/types";
import { setUserId } from "../../features/manager/manager-slice";
import { useDispatch } from "react-redux";
import { useMakeRequestMutation, useUpdateGroupMutation, useDeleteFriendMutation, useGetGroupsQuery } from "../../features/message-api/message-api-slice";
import { useRef, useState } from "react";
import useClickOutside from "../../../util/useClickOutside";
import { useNavigate } from "react-router-dom";

export default function UserOptions({ info, changeVisible, coords, group } : {info: TargetUser, changeVisible: SimpleFunctionType, coords: CoordsProp, group?: string}) {
    const [showOptions, setShowOptions] = useState(false);
    const dispatch = useDispatch();
    const { groupsData } = useGetGroupsQuery(undefined, {selectFromResult: ({data}) => ({
        groupsData: data?.user.groups
    })});
    const [makeRequest] = useMakeRequestMutation();
    const [changeGroup] = useUpdateGroupMutation();
    const [deleteFriend] = useDeleteFriendMutation();
    const optionsRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    useClickOutside(optionsRef, changeVisible);

    const groupOptions = function GroupOptionsToDisplay() {

        return (
           <>
                <div data-type="REMOVEGROUP">
                    Remove From Group
                </div>
                <div></div>
                {info.admin ? <div data-type="DEMOTEGROUP">Demote</div> : <div data-type="PROMOTEGROUP">Promote</div>}
           </>
        )
    };

    const handleClick = function handleClickingAnOption(event : ClickType) {
        const currentTarget = event.target as HTMLDivElement;
        const possibleType = currentTarget.dataset.type;
        if (!info.user) {
            return;
        };
        if (possibleType === "PROFILE") {
            dispatch(setUserId(info.user));
            navigate("/users");
            changeVisible();
        }  else if (possibleType === "ADDFRIEND") {
            makeRequest({targetid: info.user, type: "FRIEND"}).unwrap().then(() => {
                currentTarget.textContent = "Sent";
                delete currentTarget.dataset.type;
            }).catch((response) => {
                if (response.data.message === "Request Already Sent") {
                    currentTarget.textContent = "Already Sent";
                    delete currentTarget.dataset.type;
                }
            })
        } else if (possibleType === "REMOVEFRIEND") {
            deleteFriend({id: info.user}).unwrap().then(() => {
                currentTarget.textContent = "Add Friend";
                currentTarget.dataset.type = "ADDFRIEND";
            }).catch();
        } else if (possibleType === "INVITEGROUP") {
            const possibleGroup = currentTarget.dataset.groupid;
            if (!possibleGroup) {
                return;
            };
            makeRequest({targetid: info.user, type: "GROUP", groupid: possibleGroup}).unwrap().then(() => {
                currentTarget.remove();
            }).catch((response) => {
                if (response.data.message === "Request Already Sent") {
                    currentTarget.remove();
                }
            });
            setShowOptions(false);
        } else if (possibleType === "REMOVEGROUP") {
            if (!group) {
                return;
            };
            changeGroup({id: group, info: {
                targetid: info.user,
                action: "REMOVE"
            }});
        } else if (possibleType === "PROMOTEGROUP") {
            if (!group) {
                return;
            };
            changeGroup({id: group, info: {
                targetid: info.user,
                action: "PROMOTE"
            }}).unwrap().then(()=> {
                currentTarget.textContent = "Demote";
                currentTarget.dataset.type = "DEMOTEGROUP";
            }).catch()
        } else if (possibleType === "DEMOTEGROUP") {
            if (!group) {
                return;
            };
            changeGroup({id: group, info: {
                targetid: info.user,
                action: "DEMOTE"
            }}).unwrap().then(() => {
                currentTarget.textContent = "Promote";
                currentTarget.dataset.type = "PROMOTEGROUP";
            }).catch()
        }
    };

    return (
        <div ref={optionsRef} style={{position: "absolute", ...coords}} onClick={handleClick}>
            <div data-type="PROFILE">Profile</div>
            {info.friend ? <div data-type="REMOVEFRIEND">Remove Friend</div> : <div data-type="ADDFRIEND">Add Friend</div>}
            <div onMouseEnter={() => setShowOptions(true)} onMouseLeave={() => setShowOptions(false)} style={{position: "relative"}}>
                <div>Invite to Groups</div>
                {showOptions && <div style={{position: "absolute"}}>
                    {groupsData && groupsData.length > 0 ? groupsData.map((group) => {
                        return (
                            <div data-groupid={group.id} data-type="INVITEGROUP">{group.name}</div>
                        )
                    }) : <div>No Groups</div> }
                </div>}
            </div>
            {group && groupOptions()}
        </div>
    )

};