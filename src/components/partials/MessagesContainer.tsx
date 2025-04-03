import Message from "./Message";
import { MessageInfo } from "../../../util/interfaces";
import { getFuncs, handleMessageOptionsClick } from "../../../util/helpers";
import useMessageOptionsHandle from "../../../util/useMessageOptionsHandle";
import MessageOptions from "./MessageOptions";
import { EditStateType } from "../../../util/types";

export default function MessagesContainer({info, admin, setEditId} : {info: MessageInfo[], setEditId: EditStateType, admin?: boolean}) {
    const [showFuncs, coordsFuncs, dataFuncs] = useMessageOptionsHandle();

    return (
        <div onMouseEnter={(e) => getFuncs([showFuncs, coordsFuncs, dataFuncs])} onMouseLeave={() => showFuncs.changeShow(false)}>
            {(showFuncs.checkShow && dataFuncs.checkData.message) ? <MessageOptions changeId={setEditId} coords={coordsFuncs.checkCoords} changeVisible={() => showFuncs.changeShow(false)} messageid={dataFuncs.checkData.message} /> : null}
            {info.map((currentMessage, index) => {
                return (
                    <Message info={currentMessage} {...(index > 0 ? {previousMessageSenderId: info[index-1].sender.id} : {})} 
                    {...(typeof admin === "boolean" ? {admin: admin} : {})} />
                )
            })}
        </div>
    )
};