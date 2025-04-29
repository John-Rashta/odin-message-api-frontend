import MainWithOptions from "../partials/MainWithOptions";
import SideBar from "../partials/SideBar";
import FullChat from "../partials/chats/FullChat";
import { useMakeRequestMutation, useCreateGroupMutation, useGetGroupsQuery, useGetGroupQuery, useMessageGroupMutation, useLeaveGroupMutation, useDeleteGroupMutation } from "../../features/message-api/message-api-slice";
import { useSelector, useDispatch } from "react-redux";
import { selectGroupId, selectMyId, setGroupId } from "../../features/manager/manager-slice";
import { isUUID } from "validator";
import MiniGroupSide from "./MiniGroupSide";
import { getAdminIds } from "../../../util/helpers";
import { ButtonClickType, FormType } from "../../../util/types";
import GroupPeople from "./GroupPeople";
import { useState } from "react";
import SimpleForm from "../partials/SimpleForm";
import EditGroupName from "./EditGroupName";
import styled from "styled-components";
import { mainBackgroundColor, mainTextsHeight, sidebarColor, StyledExtraMessage } from "../../../util/style";

export default function Groups() {
    const groupId = useSelector(selectGroupId);
    const myId = useSelector(selectMyId);
    const dispatch = useDispatch();
    const [showConfirm, setShowConfirm] = useState(false);
    const { data, error, isLoading} = useGetGroupQuery({id: groupId});
    const [ sendMessage ] = useMessageGroupMutation();
    const [leaveGroup ] = useLeaveGroupMutation();
    const [ createGroup ] = useCreateGroupMutation();
    const [ deleteGroup ] = useDeleteGroupMutation();
    const [inviteUser] = useMakeRequestMutation();
    const { data: groupsData, error: groupsError, isLoading: groupsLoading } = useGetGroupsQuery();

    const userIsAdmin = data && getAdminIds(data.group.admins).includes(myId);
    const membersIds = data && data.group.members.map((member) => member.id);

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
        <StyledMain {...((data && userIsAdmin) ? {group: groupId, members: membersIds} : {})}>
            <MainStyleDivs>
                <CreateButton onClick={() => createGroup({})}>Create Group</CreateButton>
                {groupsLoading ? <StyledSideError>Groups Loading...</StyledSideError> 
                : groupsError ? <StyledSideError>Error Loading Groups!</StyledSideError> 
                : groupsData ? <SideBar data={groupsData.user.groups} activeId={groupId} innerComp={MiniGroupSide} />  : <div>No Conversations Yet!</div> }
            </MainStyleDivs>
            {isLoading ?<StyledExtraMessage>Loading Group...</StyledExtraMessage> 
            : (data && !error) ? <>
                <MainStyleDivs>
                    <StyledGroupOptions>
                        {userIsAdmin && 
                        <>
                            <EditGroupName buttonText="Edit" groupId={groupId} fieldsName="newName" groupName={data.group.name || ""} />
                            <StyledForm submitFunc={(e) => handleSubmitInvite(e,"inviteUser")} fieldsName="inviteUser" buttonText="Invite" />
                        </>
                        }
                        <StyledGroupOptionsBottom>
                            <StyledLeave onClick={handleClick}>Leave Group</StyledLeave>
                            {
                                userIsAdmin && (showConfirm ? <StyledDeleteOptions> <StyledDeleteCancel onClick={() => setShowConfirm(false)}>Cancel</StyledDeleteCancel> <StyledDeleteConfirm onClick={() => {
                                    deleteGroup({id: groupId}).unwrap().then(() => {
                                        dispatch(setGroupId("0"));
                                    }).finally(() => {
                                        setShowConfirm(false);
                                    });
                                }}>Confirm</StyledDeleteConfirm> </StyledDeleteOptions> :<StyledDelete onClick={() => setShowConfirm(true)}>Delete Group</StyledDelete>)
                            }
                        </StyledGroupOptionsBottom>
                    </StyledGroupOptions>
                    <FullChat adminList={getAdminIds(data.group.admins)} basicInfo={{id: data.group.id, type: "GROUP"}} trigger={sendMessage} info={data.group.contents} />
                </MainStyleDivs>
                <GroupPeople admins={data.group.admins} members={data.group.members} />
            </> : <StyledExtraMessage>Try Starting a Group!</StyledExtraMessage>}
        </StyledMain>
    )
};

const StyledMain = styled(MainWithOptions)`
    display: grid;
    grid-template-columns: auto 1fr auto;
    overflow: hidden;
    max-height: ${mainTextsHeight};
`;

const MainStyleDivs = styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    div:nth-child(2) {
        flex-grow: 1;
    }
`;

const CreateButton = styled.button`
    padding: 5px;
    font-size: 1.2rem;
    background-color: rgb(190, 226, 231);
    border: 1px solid;
    &:hover {
        background-color: rgb(160, 206, 212);
    }
`;

const StyledGroupOptions = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    gap: 8px;
    background-color: rgb(187, 219, 255);
`;

const StyledForm = styled(SimpleForm)`
    display: flex;
    align-items: center;
    gap: 10px;
    button {
        border-radius: 5px;
        padding: 5px;
        background-color: rgb(205, 233, 232);
    }

    input {
        padding: 3px;
        background-color: rgb(198, 237, 255);
    }
`;

const StyledSideError = styled(StyledExtraMessage)`
    background-color: ${sidebarColor};
    padding: 20px;
`;

const StyledButtonDefault = styled.button`
    padding: 5px;
    &:hover {
        opacity: 0.7;
    };

    border: 1px solid;
`;

const StyledDelete = styled(StyledButtonDefault)`
    background-color: rgb(167, 181, 199);
`;

const StyledDeleteCancel = styled(StyledButtonDefault)`
    background-color: rgb(230, 0, 0);
`;

const StyledDeleteConfirm = styled(StyledButtonDefault)`
    background-color: rgb(0, 199, 60);
`;
const StyledLeave = styled(StyledButtonDefault)`
    background-color: rgb(222, 245, 255);
`;

const StyledDeleteOptions = styled.div`
    display: flex;
    gap: 5px;

`;

const StyledGroupOptionsBottom = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`