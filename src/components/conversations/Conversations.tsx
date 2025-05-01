import { useSelector } from "react-redux";
import {
  useGetConversationQuery,
  useGetConversationsQuery,
  useMessageConversationMutation,
} from "../../features/message-api/message-api-slice";
import { selectConversationId } from "../../features/manager/manager-slice";
import { isUUID } from "validator";
import SideBar from "../partials/SideBar";
import MiniConversationSide from "./MiniConversationSide";
import FullChat from "../partials/chats/FullChat";
import { skipToken } from "@reduxjs/toolkit/query";
import MainWithOptions from "../partials/MainWithOptions";
import styled from "styled-components";
import {
  mainTextsHeight,
  sidebarColor,
  StyledExtraMessage,
} from "../../../util/style";

export default function Conversations() {
  const convoId = useSelector(selectConversationId);

  const { data, error, isLoading } = useGetConversationQuery(
    isUUID(convoId) ? { id: convoId } : skipToken,
  );
  const [sendMessage] = useMessageConversationMutation();
  const {
    data: convosData,
    error: convosError,
    isLoading: convosLoading,
  } = useGetConversationsQuery();
  return (
    <StyledMain>
      {convosLoading ? (
        <StyledSideError>Loading Conversations...</StyledSideError>
      ) : convosError ? (
        <StyledSideError>Failed getting Conversations!</StyledSideError>
      ) : convosData && convosData.user ? (
        (convosData.user.convos.length > 0 && (
          <SideBar
            data={convosData.user.convos}
            innerComp={MiniConversationSide}
            activeId={convoId}
          />
        )) || <StyledExtraMessage>No Conversations Yet!</StyledExtraMessage>
      ) : (
        <StyledExtraMessage>No Conversations Yet!</StyledExtraMessage>
      )}
      {isLoading ? (
        <StyledExtraMessage>Loading Conversation...</StyledExtraMessage>
      ) : error ? (
        <StyledExtraMessage>Error Loading Conversation!</StyledExtraMessage>
      ) : data ? (
        <FullChat
          info={data.conversation.contents}
          trigger={sendMessage}
          basicInfo={{ id: data.conversation.id, type: "CONVERSATION" }}
        />
      ) : (
        <StyledExtraMessage>Try Starting a Conversation!</StyledExtraMessage>
      )}
    </StyledMain>
  );
}

const StyledMain = styled(MainWithOptions)`
  display: grid;
  grid-template-columns: auto 1fr;
  overflow: hidden;
  max-height: ${mainTextsHeight};
`;

const StyledSideError = styled(StyledExtraMessage)`
  background-color: ${sidebarColor};
  padding: 20px;
`;
