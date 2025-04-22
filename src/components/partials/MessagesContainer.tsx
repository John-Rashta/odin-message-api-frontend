import Message from "./Message";
import { MessageInfo } from "../../../util/interfaces";
import { getFuncs, handleMessageOptionsClick } from "../../../util/helpers";
import useMessageOptionsHandle from "../../../util/useMessageOptionsHandle";
import MessageOptions from "./MessageOptions";
import { EditStateType } from "../../../util/types";
import { useSelector } from "react-redux";
import { selectMyId } from "../../features/manager/manager-slice";

export default function MessagesContainer({info, adminList, setEditId, checkId} : {info: MessageInfo[], setEditId: EditStateType, checkId: string, adminList?: string[]}) {
    const [showFuncs, coordsFuncs, dataFuncs] = useMessageOptionsHandle();
    const myId = useSelector(selectMyId);

    return (
        <div onMouseOver={(e) => {
            const target = e.target as HTMLElement;
                if (target.closest(".messageOptionsContainer")) {
                    return;
                };
            handleMessageOptionsClick(myId, e, getFuncs([showFuncs, coordsFuncs, dataFuncs]));
            }} onMouseOut={(e) => {
                const target = e.relatedTarget as HTMLElement;
                if (target && target.closest(".messageOptionsContainer")) {
                    return;
                };
                showFuncs.changeShow(false)
                }}>
            {(showFuncs.checkShow && dataFuncs.checkData.message) ? <MessageOptions checkId={checkId} changeId={setEditId} coords={coordsFuncs.checkCoords} changeVisible={() => showFuncs.changeShow(false)} messageid={dataFuncs.checkData.message} /> : null}
            {info.map((currentMessage, index) => {
                return (
                    <Message key={currentMessage.id} info={currentMessage} {...(index > 0 ? {previousMessageSenderId: info[index-1].sender.id} : {})} 
                    {...( Array.isArray(adminList) ? {adminList} : {})} />
                )
            })}
        </div>
    )
};