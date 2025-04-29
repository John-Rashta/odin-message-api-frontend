import Message from "./Message";
import { MessageInfo } from "../../../../util/interfaces";
import { getFuncs, handleMessageOptionsClick } from "../../../../util/helpers";
import useMessageOptionsHandle from "../../../../util/useMessageOptionsHandle";
import MessageOptions from "../options/MessageOptions";
import { EditStateType } from "../../../../util/types";
import { useSelector } from "react-redux";
import { selectMyId } from "../../../features/manager/manager-slice";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { styledOverflow } from "../../../../util/style";

export default function MessagesContainer({info, adminList, setEditId, checkId, basicId} : {info: MessageInfo[], setEditId: EditStateType, checkId: string, adminList?: string[], basicId: string}) {
    const [showFuncs, coordsFuncs, dataFuncs] = useMessageOptionsHandle();
    const myId = useSelector(selectMyId);
    const chatRef = useRef<HTMLDivElement>(null);
    const [currentId, setCurrentId] = useState("");
    useEffect(() => {
        const autoScroll = function autoScrollChat() {
            if (!chatRef.current) {
                return;
            };

            const { scrollTop, scrollHeight, clientHeight } = chatRef.current;

            const maxScroll = scrollHeight * 0.9;
            if (scrollTop + clientHeight >= maxScroll) {
                chatRef.current.scrollTop = scrollHeight;
                return;
            } else {
                return;
            }
        };

        autoScroll();
    },[info]);

    useEffect(() => {

        const scrollOnChange = function scrollPageToEndWhenChangingConvo() {
            if (!chatRef.current) {
                return;
            };
            const { scrollHeight } = chatRef.current;

            if (basicId !== currentId) {
                chatRef.current.scrollTop = scrollHeight;
                setCurrentId(basicId);
                return;
            };

        };

        scrollOnChange();
    },[basicId]);

    return (
        <StyledMessagesContainer ref={chatRef} onMouseOver={(e) => {
            const target = e.target as HTMLElement;
                if (target.closest(".messageOptionsContainer")) {
                    return;
                };
            handleMessageOptionsClick(myId, e, getFuncs([showFuncs, coordsFuncs, dataFuncs]));
            }} onMouseOut={(e) => {
                const target = e.relatedTarget as HTMLElement;
                if (target && target.closest(".messageOptionsContainer")) {
                    return;
                };
                showFuncs.changeShow(false)
                }}>
            {(showFuncs.checkShow && dataFuncs.checkData.message) ? <MessageOptions checkId={checkId} changeId={setEditId} coords={coordsFuncs.checkCoords} changeVisible={() => showFuncs.changeShow(false)} messageid={dataFuncs.checkData.message} /> : null}
            {info.map((currentMessage, index) => {
                return (
                    <Message key={currentMessage.id} info={currentMessage} {...(index > 0 ? {previousMessageSenderId: info[index-1].sender.id} : {})} 
                    {...( Array.isArray(adminList) ? {adminList} : {})} />
                )
            })}
        </StyledMessagesContainer>
    )
};

const StyledMessagesContainer = styled.div`
    ${styledOverflow}
    display: flex;
    flex-direction: column;
    gap: 10px;
`;