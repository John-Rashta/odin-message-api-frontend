import { MessageInfo } from "../../../util/interfaces";
import { formatRelative } from "date-fns";
import { locale } from "../../../util/helpers";

export default function Message({info, previousMessage} : {info: MessageInfo, previousMessage: MessageInfo}) {

    return (
        <>
            {info.edited ? <div>Edited</div> : null}
            <div>
                <div>
                    <img src={info.sender.customIcon ? info.sender.customIcon.url : info.sender.icon.source} alt="user icon" />
                </div>
                <div>
                    <div>
                        <div>{info.sender.username}</div>
                        {info.sender.id === previousMessage.sender.id ? null : 
                        <div>{formatRelative(new Date(info.sentAt), new Date(), {locale})}</div>}
                    </div>
                    <div>{info.content}</div>
                    {typeof info.image?.url === "string" ? <img src={info.image.url} alt="message image"/> : null}
                </div>
            </div>
        </>
    )
};