import { useEffect, useRef, useState } from "react";
import { ButtonClickType } from "../../../util/types";
import { useGetGroupsQuery, useMakeRequestMutation, useGetUserQuery } from "../../features/message-api/message-api-slice";
import GroupSelection from "./GroupSelection";
import { selectMyId, selectUserId } from "../../features/manager/manager-slice";
import { useSelector } from "react-redux";
import StartConvoButton from "./StartConvoButton";
import { isUUID } from "validator";
import { aboutMeStyle, StyledExtraMessage, StyledProfileImg, StyledProfileMain } from "../../../util/style";
import styled from "styled-components";
import { format } from "date-fns";

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
        <StyledProfileMain>
            {
            isLoading  ? (
                <StyledExtraMessage>Loading </StyledExtraMessage>
            ) : error ? (
                <StyledExtraMessage>Error loading!</StyledExtraMessage>
            ) : data && data.user ? (
                <>
                    <StyledImageContainer>
                        <StyledProfileImg src={data.user.customIcon?.url || data.user.icon.source} alt="" />
                    </StyledImageContainer>
                    <div>Username: {data.user.username}</div>
                    <div>Name: {data.user.name}</div>
                    <StyledActionsContainer>
                        <StyledButtonsContainer>
                            <StyledAddFriend ref={buttonRef} onClick={handleFriendRequest}>Add Friend</StyledAddFriend>
                            <StyledStartConvo userid={data.user.id} />
                        </StyledButtonsContainer>
                        <StyledGroupButtonContainer style={{position: "relative"}}>
                            <StyledInvite onClick={() => setShowOptions(!showOptions)}>invite to group</StyledInvite>
                            {showOptions && <GroupSelection groupsData={groupsData} userid={data.user.id} hideMe={() => setShowOptions(false)} />}
                        </StyledGroupButtonContainer>
                    </StyledActionsContainer>
                    <div>User ID: {data.user.id}</div>
                    <div>Joined: {format(data.user.joinedAt,  'MM/dd/yyyy')}</div>
                    <StyledAboutContainer>
                        <div>About me:</div>
                        <StyledAboutMe>{data.user.aboutMe}</StyledAboutMe>
                    </StyledAboutContainer>
                </>
            ) : <StyledExtraMessage>No User Found.</StyledExtraMessage>
            }
        </StyledProfileMain>
    )
};

const StyledAboutMe = styled.div`
    ${aboutMeStyle}
`;

const StyledAboutContainer = styled.div`
    display: flex;
    gap: 5px;
`;

const StyledImageContainer = styled.div`
    border-bottom: 2px solid;
    padding: 10px;
`;

const StyledActionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const StyledButtonsContainer = styled.div`
    display: flex;
    gap: 10px;
`;

const StyledGroupButtonContainer = styled.div`
    align-self: center;
`;

const StyledAddFriend = styled.button`
    padding: 5px 10px;
    font-weight: bold;
    background-color: rgb(118, 196, 83);
    border: 1px solid;
`;

const StyledStartConvo = styled(StartConvoButton)`
    padding: 5px 10px;
    font-weight: bold;
    background-color: rgb(149, 239, 255);
    border: 1px solid;
`;

const StyledInvite = styled.button`
    padding: 5px 5px;
    font-weight: bold;
    background-color: rgb(103, 156, 255);
`;




