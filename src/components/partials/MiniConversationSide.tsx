import { UserConversation } from "../../../util/interfaces";

export default function MiniConversationSide({info} : {info: UserConversation}) {
    return (
        <div className="optionsUser" data-id={info.id} data-userid={info.members[0].id} >
            <img src={info.members[0].customIcon?.url || info.members[0].icon.source} alt="" />
            <div>{info.members[0].username}</div>
        </div>
    )
};