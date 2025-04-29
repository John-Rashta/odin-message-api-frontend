import { useEffect, useState } from "react";
import { FormType, SimpleFunctionType } from "../../../../util/types";
import { useGetMessageQuery, useUpdateMessageMutation } from "../../../features/message-api/message-api-slice";
import EmotesDisplay from "../EmotesDisplay";
import { StyledChatForm, StyledEmoteButton, StyledEmoteOptionsBox, StyledInputMessage } from "../../../../util/style";
import styled from "styled-components";

export default function EditChat({info, changeEdit} : { info: string, changeEdit: SimpleFunctionType }) {
    const [updateMessage] = useUpdateMessageMutation();
    const [textValue, setTextValue ] = useState("");
    const [ showEmotes, setShowEmotes ] = useState(false);
    const { messageData } = useGetMessageQuery({id:info}, {selectFromResult: ({data}) => ({
        messageData: data?.message
    })});
    const handleSubmit = function handleSubmitingEdit(event: FormType) {
        event.preventDefault();
        event.stopPropagation();
        const target = event.target as HTMLFormElement;
        const content = target.editInput.value;
        if (!messageData) {
            return;
        }
        if (content === "" && !messageData.image) {
            return;
        };
        updateMessage({message: {content: content}, id: messageData.id}).unwrap().then().catch((e) => {
            if (e.data.message) {
                console.log(e.data.message);
            }
        }).finally(() => {
            changeEdit();
        })
    };

    useEffect(() => {
        const addMessageValue = function addValueToMessage() {
            if (!messageData) {
                return;
            }
            setTextValue(messageData.content);
        };
        addMessageValue();
    },[messageData]);
    
    return (
    <>
    {messageData &&
        <StyledChatForm onSubmit={handleSubmit} onClick={(e) =>  e.stopPropagation()}>
        <StyledInputMessage type="text" name="editInput" id="editInput" onChange={(e) => setTextValue(e.target.value)} value={textValue}/>
        <StyledEmoteOptionsBox>
            {showEmotes && <EmotesDisplay hideMe={() => setShowEmotes(false)} currentMessage={textValue} addEmote={setTextValue} />}
            <StyledEmoteButton type="button" onClick={() => setShowEmotes(!showEmotes)}>&#x1F600;</StyledEmoteButton>
        </StyledEmoteOptionsBox>
        <StyledCancel onClick={() => changeEdit()} type="button">Cancel</StyledCancel>
        <StyledConfirm type="submit">Confirm</StyledConfirm>
        </StyledChatForm>
    }  
    </>
    )
};

const StyledButtons = styled.button`
    padding: 7px;
    font-weight: bold;
`

const StyledCancel = styled(StyledButtons)`
    background-color: rgb(212, 0, 0);
`;

const StyledConfirm = styled(StyledButtons)`
    background-color: rgba(48, 204, 0, 0.65);
`;