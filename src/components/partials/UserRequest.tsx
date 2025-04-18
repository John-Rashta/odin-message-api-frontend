import { useSelector } from "react-redux";
import { selectMyId } from "../../features/manager/manager-slice";
import { RequestInfo } from "../../../util/interfaces";
import { useAcceptRequestMutation, useDeleteRequestMutation } from "../../features/message-api/message-api-slice";
import { locale } from "../../../util/helpers";
import { formatRelative } from "date-fns";
import styled from "styled-components";
import { StyledDivFlex, StyledReturn as ExtraReturn } from "../../../util/style";

export default function UserRequest({info} : {info: RequestInfo}) {
    const myId = useSelector(selectMyId);
    const [acceptRequest] = useAcceptRequestMutation();
    const [deleteRequest] = useDeleteRequestMutation();

    const generateOptions = function displayRequestOptions() {
        return (
            <>
                {info.sender.id === myId ? <StyledButtonContainer> <StyledOptions onClick={()=> deleteRequest({id: info.id})} >Cancel</StyledOptions> </StyledButtonContainer> :   
                    <StyledButtonContainer> 
                        <StyledAccept onClick={() =>  acceptRequest({id: info.id})} >Accept</StyledAccept>
                        <StyledOptions onClick={() => deleteRequest({id: info.id})}>Reject</StyledOptions>
                    </StyledButtonContainer>
                }
            </>
        )
    };

    if (info.type === "GROUP") {

        if (!info.group) {
            return <></>;
        };
        return (
            <StyledReturn>
                <div>
                    <div data-id={info.id} data-group={info.group.id}>
                        {info.sender.id === myId ? `You invited ${info.receiver.username} to ${info.group.name}` : 
                        `${info.sender.username} invited you to ${info.group.name}`}
                    </div>
                    <div>{formatRelative(new Date(info.sentAt), new Date(), {locale})}</div>
                </div>
                {generateOptions()}
            </StyledReturn>
        )
    } else if (info.type === "FRIEND") {
        return (
            <StyledReturn>
                <StyledText>
                    <div data-id={info.id}>
                        {info.sender.id === myId ? `You sent a Friend Request to ${info.receiver.username}`: 
                        `${info.sender.username} sent you a Friend Request`}
                    </div>
                    <div>{formatRelative(new Date(info.sentAt), new Date(), {locale})}</div>
                </StyledText>
                {generateOptions()}
            </StyledReturn>
        )
    } else {
        return (
            <></>
        )
    };
};

const StyledReturn = styled(ExtraReturn)`
    &:hover {
        background-color: rgb(255, 255, 255);
    }
`;

const StyledOptions = styled.button`
    padding: 10px;
    font-weight: bold;
    background-color: rgba(255, 0, 0, 0.88);
    color: rgb(255, 255, 255);
    border-radius: 20px;
    &:hover {
        background-color: rgba(4, 0, 255, 0.88);
    }
`;

const StyledAccept = styled(StyledOptions)`
    background-color: rgb(11, 134, 0);
`

const StyledButtonContainer = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`;

const StyledText = styled(StyledDivFlex)`
    gap: 5px;
    font-size: 1.1rem;

`