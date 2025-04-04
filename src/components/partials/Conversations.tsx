import { useSelector } from "react-redux";
import { useGetConversationQuery, useGetConversationsQuery, useMessageConversationMutation } from "../../features/message-api/message-api-slice";
import { selectConversationId } from "../../features/manager/manager-slice";
import { isUUID } from "validator";
import SideBar from "./SideBar";
import MiniConversationSide from "./MiniConversationSide";
import FullChat from "./FullChat";
import { skipToken } from "@reduxjs/toolkit/query";
import MainWithOptions from "./MainWithOptions";

export default function Conversations() {
    const convoId = useSelector(selectConversationId);
    
    const { data, error, isLoading } = useGetConversationQuery((isUUID(convoId) ? {id: convoId} : skipToken));
    const [sendMessage] = useMessageConversationMutation();
    const { data: convosData, error: convosError, isLoading: convosLoading } = useGetConversationsQuery();
    return (
        <MainWithOptions>
            {convosLoading ? <div>Loading Conversations...</div>
            : convosError ? <div>Failed getting Conversations!</div> 
            : convosData && convosData.user ? <SideBar data={convosData.user.convos} innerComp={MiniConversationSide} activeId={convoId} /> : <div>No Conversations Yet!</div> }
            {isLoading ? <div>Loading Conversation...</div> : error ? <div>Error Loading Conversation!</div> : data 
                ? <FullChat info={data.conversation.contents} trigger={sendMessage} basicInfo={{id: data.conversation.id, type:  "CONVERSATION"}}/>
                : <div>Try Starting a Conversation!</div>
            }
        </MainWithOptions>
    )
};