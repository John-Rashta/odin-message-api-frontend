import { MessageInfo } from "../../../../util/interfaces";
import { formatRelative } from "date-fns";
import { locale } from "../../../../util/helpers";
import { userOptionsClass } from "../../../../util/globalValues";
import styled from "styled-components";

export default function Message({info, previousMessageSenderId, adminList} : {info: MessageInfo, previousMessageSenderId?: string, adminList?: string[]}) {

    return (
        <StyledMessage data-messageid={info.id} data-userid={info.sender.id} className="optionsMessage">
                <StyledIconContainer>
                    {info.sender.id === previousMessageSenderId ? null : 
                    <StyledIcon className={userOptionsClass} data-userid={info.sender.id} {...(adminList && adminList.includes(info.sender.id)) ? {"data-admin" : true} : {}} src={info.sender.customIcon ? info.sender.customIcon.url : info.sender.icon.source} alt="user icon" />}
                </StyledIconContainer>
                <StyledMainMessage>
                    <StyledTopMessage>
                        <StyledUserTime>
                            {info.sender.id === previousMessageSenderId ? null : 
                            <StyledUsername className={userOptionsClass} data-userid={info.sender.id} {...(adminList && adminList.includes(info.sender.id)) ? {"data-admin" : true} : {}}>{info.sender.username}</StyledUsername>}
                            {info.sender.id === previousMessageSenderId ? null : 
                            <div>{formatRelative(new Date(info.sentAt), new Date(), {locale})}</div>}
                        </StyledUserTime>
                        {info.edited ? <StyledEdited>Edited</StyledEdited> : null}
                    </StyledTopMessage>
                    <div>
                        <div>{info.content}</div>
                        {typeof info.image?.url === "string" ? <StyledMessageImage className="messageImage" src={info.image.url} alt="message image"/> : null}
                    </div>
                </StyledMainMessage>
        </StyledMessage>
    )
};

const StyledIconContainer = styled.div`
    width: 60px;
`;

const StyledMessage = styled.div`
    display: flex;
    gap: 10px;
    &:hover {
        background-color: rgb(206, 235, 236);
    }
    border-radius: 10px;
    padding: 2px;
`;

const StyledUsername = styled.div`
    font-size: 1.1rem;
    &:hover {
        text-decoration: underline 2px;
    }
`;

const StyledIcon = styled.img`
    cursor: pointer;
`;

const StyledTopMessage = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 7px;
`;

const StyledUserTime = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`;

const StyledMainMessage = styled.div`
    flex-grow: 1;
`;

const StyledEdited = styled.div`
    font-size: 0.8rem;
`;

const StyledMessageImage = styled.img`
    max-width: 50%;
    height: auto;
    object-fit: contain;
`;