import { useState } from "react";
import { ChatInfo } from "../../../util/interfaces";
import { ConversationTriggerType, FormType, TriggerType } from "../../../util/types";

export default function NormalChat({trigger, info} : {trigger: TriggerType, info: ChatInfo}) {
    const [invalidSize, setInvalidSize] = useState(false);
    const handleClick = function handleSendingMessage(event: FormType ) {
        event.preventDefault();
        event.stopPropagation();
        const target = event.target as HTMLFormElement;
        const content = target.messageInput.value;
        if (content === "") {
            return;
        };
        const possibleFile = target.files.length > 0 && target.files[0] as File;
        const newForm = new FormData;
        if (possibleFile) {
            if (Number(((possibleFile.size/1024)/1024).toFixed(4)) > 5) {
                setInvalidSize(true);
                return;
            }
            newForm.append("uploaded_file", possibleFile);
        }
        newForm.append("content", content);
        if (info.type === "CONVERSATION") {
            newForm.append("conversationid", info.id);
            const checkTrigger = trigger as ConversationTriggerType;
            checkTrigger({message: newForm});
        } else if (info.type === "GROUP") {
            trigger({message: newForm, id: info.id});
        }
    }

    return (
        <form onSubmit={handleClick}>
            {invalidSize && <div style={{position: "absolute"}}>File Too Big!(Max 5MB)</div>}
            <input type="text" id="messageInput" name="messageInput"/>
            <input type="file" id="fileInput" name="fileInput"/>
            <button type="submit">Send</button>
        </form>
       
    )
    
};