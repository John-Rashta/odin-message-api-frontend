import { useSelector } from "react-redux";
import { useGetConversationQuery, useGetConversationsQuery, useMessageConversationMutation } from "../../features/message-api/message-api-slice";
import { selectConversationId } from "../../features/manager/manager-slice";
import { isUUID } from "validator";
import SideBar from "./SideBar";
import MiniConversationSide from "./MiniConversationSide";
import FullChat from "./FullChat";
import { handleUserOptionsClick, getFuncs } from "../../../util/helpers";
import UserOptions from "./UserOptions";
import MinimalUserOptions from "./MinimalUserOptions";
import useBothUserOptionsHandle from "../../../util/useBothUserOptionsHandle";

export default function Conversations() {
    const convoId = useSelector(selectConversationId);
    if (!isUUID(convoId)) {
        return (
            <main>
                <div>Start a Conversation!</div>
            </main>
        )
    }
    
    const { data, error, isLoading } = useGetConversationQuery({id: convoId});
    const [sendMessage] = useMessageConversationMutation();
    const [full, min] = useBothUserOptionsHandle();
    const { data: convosData, error: convosError, isLoading: convosLoading } = useGetConversationsQuery();
    return (
        <main style={{position: "relative"}} onContextMenu={(e) => handleUserOptionsClick(e, getFuncs([full.showFuncs, full.coordsFuncs, full.dataFuncs]))}
        onClick={(e) => handleUserOptionsClick(e, getFuncs([min.showFuncs, min.coordsFuncs, min.dataFuncs]))}>
            {(full.showFuncs.checkShow && !min.showFuncs.checkShow) && <UserOptions info={full.dataFuncs.checkData} changeVisible={() => full.showFuncs.changeShow(false)} coords={full.coordsFuncs.checkCoords} />}
            {(!full.showFuncs.checkShow && min.showFuncs.checkShow) && <MinimalUserOptions info={min.dataFuncs.checkData} changeVisible={() => min.showFuncs.changeShow(false)} coords={min.coordsFuncs.checkCoords} />}
            {convosLoading ? <div>Loading Conversations...</div>
            : convosError ? <div>Failed getting Conversations!</div> 
            : convosData && convosData.user ? <SideBar data={convosData.user.convos} innerComp={MiniConversationSide} activeId={convoId} /> : <div>No Conversations Yet!</div> }
            <div>
                <div></div>
                {isLoading ? <div>Loading Conversation...</div> : error ? <div>Error Loading Conversation!</div> : data 
                    ? <FullChat info={data.conversation.contents} trigger={sendMessage} basicInfo={{id: data.conversation.id, type:  "CONVERSATION"}}/>
                    : <div>Try Starting a Conversation!</div>
                }
            </div>
        </main>
    )
};