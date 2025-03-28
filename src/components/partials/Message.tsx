import { MessageInfo } from "../../../util/interfaces";
import { formatRelative } from "date-fns";
import { locale } from "../../../util/helpers";

export default function Message({info, previousMessage, admin} : {info: MessageInfo, previousMessage: MessageInfo, admin?: boolean}) {

    return (
        <div data-messageid={info.id} data-userid={info.sender.id} className="optionsMessage">
            {info.edited ? <div>Edited</div> : null}
            <div>
                <div>
                    <img className="optionsUser" data-userid={info.sender.id} {...(typeof admin === "boolean") ? {"data-admin" : admin} : {}} src={info.sender.customIcon ? info.sender.customIcon.url : info.sender.icon.source} alt="user icon" />
                </div>
                <div>
                    <div>
                        <div className="optionsUser" data-userid={info.sender.id} {...(typeof admin === "boolean") ? {"data-admin" : admin} : {}}>{info.sender.username}</div>
                        {info.sender.id === previousMessage.sender.id ? null : 
                        <div>{formatRelative(new Date(info.sentAt), new Date(), {locale})}</div>}
                    </div>
                    <div>{info.content}</div>
                    {typeof info.image?.url === "string" ? <img src={info.image.url} alt="message image"/> : null}
                </div>
            </div>
        </div>
    )
};