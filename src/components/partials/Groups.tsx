import MainWithOptions from "./MainWithOptions";
import SideBar from "./SideBar";
import FullChat from "./FullChat";
import { useMakeRequestMutation, useCreateGroupMutation, useGetGroupsQuery, useGetGroupQuery, useMessageGroupMutation, useLeaveGroupMutation, useDeleteGroupMutation } from "../../features/message-api/message-api-slice";
import { useSelector, useDispatch } from "react-redux";
import { selectGroupId, selectMyId, setGroupId } from "../../features/manager/manager-slice";
import { isUUID } from "validator";
import { skipToken } from "@reduxjs/toolkit/query";
import MiniGroupSide from "./MiniGroupSide";
import { getAdminIds } from "../../../util/helpers";
import { ButtonClickType, FormType } from "../../../util/types";
import GroupPeople from "./GroupPeople";
import { useState } from "react";
import SimpleForm from "./SimpleForm";
import EditGroupName from "./EditGroupName";

export default function Groups() {
    const groupId = useSelector(selectGroupId);
    const myId = useSelector(selectMyId);
    const dispatch = useDispatch();
    const [showConfirm, setShowConfirm] = useState(false);

    const { data, error, isLoading} = useGetGroupQuery((isUUID(groupId) ? {id: groupId} : skipToken));
    const [ sendMessage ] = useMessageGroupMutation();
    const [leaveGroup ] = useLeaveGroupMutation();
    const [ createGroup ] = useCreateGroupMutation();
    const [ deleteGroup ] = useDeleteGroupMutation();
    const [inviteUser] = useMakeRequestMutation();
    const { data: groupsData, error: groupsError, isLoading: groupsLoading } = useGetGroupsQuery();

    const userIsAdmin = data && getAdminIds(data.group.admins).includes(myId);

    const handleClick = function handleClickingToLeaveGroup(event: ButtonClickType) {
        event.preventDefault();
        event.stopPropagation();
        if (!isUUID(groupId)) {
            return;
        }
        leaveGroup({id: groupId}).unwrap().then(() => {
            dispatch(setGroupId("0"));
        }).catch();
    };

    const handleSubmitInvite = function handleSubmitingAnInvite(event: FormType, fieldName: string) {
        event.preventDefault();
        event.stopPropagation();
        const target = event.target as HTMLFormElement;
        const possibleUser = target[fieldName].value;
        if (!possibleUser || !isUUID(possibleUser)) {
            return;
        };

        inviteUser({
            type: "GROUP",
            targetid: possibleUser,
            groupid : groupId
        }).catch( (response) => {
            if (response.data.message) {
                console.log(response.data.message)
            }
        })
    };

    return (
        <MainWithOptions {...((data && userIsAdmin) ? {group: groupId} : {})}>
            <button onClick={() => createGroup({})}>Create Group</button>
            {data && 
                <div>
                    {userIsAdmin && 
                    <>
                        <EditGroupName buttonText="Edit" groupId={groupId} fieldsName="newName" groupName={data.group.name || ""} />
                        <SimpleForm submitFunc={(e) => handleSubmitInvite(e,"inviteUser")} fieldsName="inviteUser" buttonText="Invite" />
                    </>
                    }
                    <button onClick={handleClick}>Leave Group</button>
                    <GroupPeople admins={data.group.admins} members={data.group.members} />
                </div>
            }
            {
                (data && userIsAdmin) && (showConfirm ? <button onClick={() => {
                    deleteGroup({id: groupId}).unwrap().then(() => {
                        dispatch(setGroupId("0"));
                    }).finally(() => {
                        setShowConfirm(false);
                    });
                }}>Confirm</button> :<button onClick={() => setShowConfirm(true)}>Delete Group</button>)
            }
            {groupsLoading ? <div>Groups Loading...</div> 
            : groupsError ? <div>Error Loading Groups!</div> 
            : groupsData ? <SideBar data={groupsData.user.groups} activeId={groupId} innerComp={MiniGroupSide} />  : <div>No Conversations Yet!</div> }
            {isLoading ?<div>Loading Group...</div> 
            : error ? <div>Failed Loading Group!</div>
            : data ? <FullChat adminList={getAdminIds(data.group.admins)} basicInfo={{id: data.group.id, type: "GROUP"}} trigger={sendMessage} info={data.group.contents} /> : <div>Try Starting a Group!</div>}
        </MainWithOptions>
    )

}