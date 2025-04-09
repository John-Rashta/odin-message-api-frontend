import Message from "./Message";
import { MessageInfo } from "../../../util/interfaces";
import { getFuncs, handleMessageOptionsClick } from "../../../util/helpers";
import useMessageOptionsHandle from "../../../util/useMessageOptionsHandle";
import MessageOptions from "./MessageOptions";
import { EditStateType } from "../../../util/types";
import { useSelector } from "react-redux";
import { selectMyId } from "../../features/manager/manager-slice";

export default function MessagesContainer({info, adminList, setEditId} : {info: MessageInfo[], setEditId: EditStateType, adminList?: string[]}) {
    const [showFuncs, coordsFuncs, dataFuncs] = useMessageOptionsHandle();
    const myId = useSelector(selectMyId);

    return (
        <div onMouseEnter={(e) => handleMessageOptionsClick(myId, e, getFuncs([showFuncs, coordsFuncs, dataFuncs]))} onMouseLeave={() => showFuncs.changeShow(false)}>
            {(showFuncs.checkShow && dataFuncs.checkData.message) ? <MessageOptions changeId={setEditId} coords={coordsFuncs.checkCoords} changeVisible={() => showFuncs.changeShow(false)} messageid={dataFuncs.checkData.message} /> : null}
            {info.map((currentMessage, index) => {
                return (
                    <Message key={currentMessage.id} info={currentMessage} {...(index > 0 ? {previousMessageSenderId: info[index-1].sender.id} : {})} 
                    {...( Array.isArray(adminList) ? {adminList} : {})} />
                )
            })}
        </div>
    )
};