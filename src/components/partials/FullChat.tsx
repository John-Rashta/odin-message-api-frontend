import { useState } from "react";
import { ChatInfo, MessageInfo } from "../../../util/interfaces";
import MessagesContainer from "./MessagesContainer";
import { isUUID } from "validator";
import NormalChat from "./NormalChat";
import { TriggerType } from "../../../util/types";
import EditChat from "./EditChat";
import styled from "styled-components";


export default function FullChat({info, adminList, basicInfo, trigger} : {info: MessageInfo[], basicInfo: ChatInfo, trigger: TriggerType , adminList?: string[]}) {
    const [editId, setEditId] = useState("0");
    const clearEdit = function clearEditAfterEditing() {
        setEditId("0");
    };
    
    return (
        <StyledFullChat>
            <MessagesContainer basicId={basicInfo.id} checkId={editId} info={info} setEditId={setEditId} {...(adminList ? {adminList} : {})} />
            {!isUUID(editId) && <NormalChat trigger={trigger} info={basicInfo}/>}
            {isUUID(editId) && <EditChat info={editId} changeEdit={clearEdit} />}
        </StyledFullChat>
    )
};

const StyledFullChat = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    overflow: hidden;
    gap: 15px;
`;