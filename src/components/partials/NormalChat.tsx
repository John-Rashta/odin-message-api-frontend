import { useState } from "react";
import { ChatInfo } from "../../../util/interfaces";
import { ConversationTriggerType, FormType, TriggerType } from "../../../util/types";
import styled from "styled-components";
import EmotesDisplay from "./EmotesDisplay";
import { StyledEmoteOptionsBox } from "../../../util/style";

export default function NormalChat({trigger, info} : {trigger: TriggerType, info: ChatInfo}) {
    const [invalidSize, setInvalidSize] = useState(false);
    const [textValue, setTextValue ] = useState("");
    const [ showEmotes, setShowEmotes ] = useState(false);
    const handleClick = function handleSendingMessage(event: FormType ) {
        event.preventDefault();
        event.stopPropagation();
        const target = event.target as HTMLFormElement;
        const content = target.messageInput.value;
        if (content === "" && target.fileInput.files.length === 0) {
            return;
        };

        const newForm = new FormData;
        
        if (target.fileInput.files.length > 0) {
            const possibleFile = target.fileInput.files[0] as File;
            if (possibleFile) {
                if (Number(((possibleFile.size/1024)/1024).toFixed(4)) > 5) {
                    setInvalidSize(true);
                    return;
                }
                newForm.append("uploaded_file", possibleFile);
            };
        }
        
        newForm.append("content", content);
        if (info.type === "CONVERSATION") {
            newForm.append("conversationid", info.id);
            const checkTrigger = trigger as ConversationTriggerType;
            checkTrigger({message: newForm});
        } else if (info.type === "GROUP") {
            trigger({message: newForm, id: info.id});
        };

        setTextValue("");
        target.reset();
    }

    return (
        <form style={{position: "relative"}} onSubmit={handleClick} onClick={(e) => e.stopPropagation()}>
            {invalidSize && <div style={{position: "absolute"}}>File Too Big!(Max 5MB)</div>}
            <StyledFileDiv>
                <input type="text" id="messageInput" name="messageInput" value={textValue} onChange={(e) => setTextValue(e.target.value)}/>
                <StyledEmoteOptionsBox>
                    {showEmotes && <EmotesDisplay hideMe={() => setShowEmotes(false)} currentMessage={textValue} addEmote={setTextValue} />}
                    <button type="button" onClick={() => setShowEmotes(!showEmotes)}>&#x1F600;</button>
                </StyledEmoteOptionsBox>
                <StyledInputFile type="file" id="fileInput" name="fileInput"/>
            </StyledFileDiv>
            <button type="submit">Send</button>
        </form>
    )  
};

const StyledInputFile = styled.input`
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
`;

const StyledFileDiv = styled.div`
    position: relative;
`;