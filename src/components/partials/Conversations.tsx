import { useSelector } from "react-redux";
import { useGetConversationQuery, useGetConversationsQuery, useMessageConversationMutation } from "../../features/message-api/message-api-slice";
import { selectConversationId } from "../../features/manager/manager-slice";
import { isUUID } from "validator";
import SideBar from "./SideBar";
import MiniConversationSide from "./MiniConversationSide";
import FullChat from "./FullChat";
import useUserOptionsHandle from "../../../util/useUserOptionsHandle";
import { handleUserOptionsClick } from "../../../util/helpers";
import UserOptions from "./UserOptions";
import MinimalUserOptions from "./MinimalUserOptions";

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
    const [showFuncs, coordsFuncs, dataFuncs] = useUserOptionsHandle();
    const [showMinFuncs, coordsMinFuncs, dataMinFuncs] = useUserOptionsHandle();
    const { data: convosData, error: convosError, isLoading: convosLoading } = useGetConversationsQuery();
    return (
        <main style={{position: "relative"}} onContextMenu={(e) => handleUserOptionsClick(e, {changeShow: showFuncs.changeShow, changeCoords: coordsFuncs.changeCoords, changeData: dataFuncs.changeData})}
        onClick={(e) => handleUserOptionsClick(e, {changeShow: showMinFuncs.changeShow, changeCoords: coordsMinFuncs.changeCoords, changeData: dataMinFuncs.changeData})}>
            {(showFuncs.checkShow && !showMinFuncs.checkShow) && <UserOptions info={dataFuncs.checkData} changeVisible={() => showFuncs.changeShow(false)} coords={coordsFuncs.checkCoords} />}
            {(!showFuncs.checkShow && showMinFuncs.checkShow) && <MinimalUserOptions info={dataMinFuncs.checkData} changeVisible={() => showMinFuncs.changeShow(false)} coords={coordsMinFuncs.checkCoords} />}
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