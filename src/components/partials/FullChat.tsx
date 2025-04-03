import { useState } from "react";
import { ChatInfo, MessageInfo } from "../../../util/interfaces";
import MessagesContainer from "./MessagesContainer";
import { useGetMessageQuery } from "../../features/message-api/message-api-slice";
import { isUUID } from "validator";
import { skipToken } from "@reduxjs/toolkit/query";
import NormalChat from "./NormalChat";
import { TriggerType } from "../../../util/types";
import EditChat from "./EditChat";


export default function FullChat({info, admin, basicInfo, trigger} : {info: MessageInfo[], basicInfo: ChatInfo, trigger: TriggerType , admin?: boolean}) {
    const [editId, setEditId] = useState("0");
    const { data } = useGetMessageQuery((isUUID(editId) && {id: editId}) || skipToken);
    const clearEdit = function clearEditAfterEditing() {
        setEditId("0");
    }
    return (
        <div>
            <MessagesContainer info={info} setEditId={setEditId} {...(admin ? {admin} : {})} />
            {(!isUUID(editId) && !data )&& <NormalChat trigger={trigger} info={basicInfo}/>}
            {(isUUID(editId) && data) && <EditChat info={data} changeEdit={clearEdit} />}
        </div>
    )
};