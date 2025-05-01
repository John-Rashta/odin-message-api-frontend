import { useState } from "react";
import { ChatInfo } from "../../../../util/interfaces";
import {
  ConversationTriggerType,
  FormType,
  TriggerType,
} from "../../../../util/types";
import styled from "styled-components";
import EmotesDisplay from "../EmotesDisplay";
import {
  StyledEmoteOptionsBox,
  StyledChatForm as StyledForm,
  StyledInputMessage,
  StyledEmoteButton,
} from "../../../../util/style";
import { Image } from "lucide-react";

export default function NormalChat({
  trigger,
  info,
}: {
  trigger: TriggerType;
  info: ChatInfo;
}) {
  const [invalidSize, setInvalidSize] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [showEmotes, setShowEmotes] = useState(false);
  const handleClick = function handleSendingMessage(event: FormType) {
    event.preventDefault();
    event.stopPropagation();
    const target = event.target as HTMLFormElement;
    const content = target.messageInput.value;
    if (content === "" && target.fileInput.files.length === 0) {
      return;
    }

    const newForm = new FormData();

    if (target.fileInput.files.length > 0) {
      const possibleFile = target.fileInput.files[0] as File;
      if (possibleFile) {
        if (Number((possibleFile.size / 1024 / 1024).toFixed(4)) > 5) {
          if (!invalidSize) {
            setTimeout(() => {
              setInvalidSize(false);
            }, 5000);
          }
          setInvalidSize(true);
          return;
        }
        newForm.append("uploaded_file", possibleFile);
      }
    }

    newForm.append("content", content);
    if (info.type === "CONVERSATION") {
      newForm.append("conversationid", info.id);
      const checkTrigger = trigger as ConversationTriggerType;
      checkTrigger({ message: newForm });
    } else if (info.type === "GROUP") {
      trigger({ message: newForm, id: info.id });
    }

    setTextValue("");
    target.reset();
  };

  return (
    <StyledForm
      style={{ position: "relative" }}
      onSubmit={handleClick}
      onClick={(e) => e.stopPropagation()}
    >
      <StyledInputMessage
        type="text"
        id="messageInput"
        name="messageInput"
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
      />
      <StyledFileDiv>
        {invalidSize && (
          <StyledFileError>File Too Big!(Max 5MB)</StyledFileError>
        )}
        <StyledLabel htmlFor="fileInput">
          <Image />
        </StyledLabel>
        <StyledInputFile type="file" id="fileInput" name="fileInput" />
      </StyledFileDiv>
      <StyledEmoteOptionsBox className="otherOptions">
        {showEmotes && (
          <EmotesDisplay
            hideMe={() => setShowEmotes(false)}
            currentMessage={textValue}
            addEmote={setTextValue}
          />
        )}
        <StyledEmoteButton
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setShowEmotes(!showEmotes);
          }}
        >
          &#x1F600;
        </StyledEmoteButton>
      </StyledEmoteOptionsBox>
      <StyledSendButton type="submit">Send</StyledSendButton>
    </StyledForm>
  );
}

const StyledInputFile = styled.input`
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
`;

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(255, 255, 255);
`;

const StyledSendButton = styled.button`
  padding: 8px;
  background-color: rgb(161, 209, 231);
  font-weight: bold;
`;

const StyledFileError = styled.div`
  position: absolute;
  bottom: 120%;
  right: -65px;
  width: 150px;
  text-align: center;
  color: rgb(206, 0, 0);
`;

const StyledFileDiv = styled.div`
  position: relative;
`;
