import MainWithOptions from "./MainWithOptions";
import SideBar from "./SideBar";
import FullChat from "./FullChat";
import { useGetGroupsQuery, useGetGroupQuery, useMessageGroupMutation, useLeaveGroupMutation } from "../../features/message-api/message-api-slice";
import { useSelector, useDispatch } from "react-redux";
import { selectGroupId, selectMyId, setGroupId } from "../../features/manager/manager-slice";
import { isUUID } from "validator";
import { skipToken } from "@reduxjs/toolkit/query";
import MiniGroupSide from "./MiniGroupSide";
import { getAdminIds } from "../../../util/helpers";
import { ButtonClickType } from "../../../util/types";
import GroupPeople from "./GroupPeople";

export default function Groups() {
    const groupId = useSelector(selectGroupId);
    const myId = useSelector(selectMyId);
    const dispatch = useDispatch();

    const { data, error, isLoading} = useGetGroupQuery((isUUID(groupId) ? {id: groupId} : skipToken));
    const [ sendMessage ] = useMessageGroupMutation();
    const [leaveGroup ] = useLeaveGroupMutation();
    const { data: groupsData, error: groupsError, isLoading: groupsLoading } = useGetGroupsQuery();

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

    return (
        <MainWithOptions {...((data && getAdminIds(data.group.admins).includes(myId)) ? {group: groupId} : {})}>
            {data && 
                <div>
                    <button onClick={handleClick}>Leave Group</button>
                    <GroupPeople admins={data.group.admins} members={data.group.members} />
                </div>
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