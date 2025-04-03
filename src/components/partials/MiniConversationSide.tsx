import { UserConversation } from "../../../util/interfaces";

export default function MiniConversationSide({info, activeId} : {info: UserConversation, activeId?: string}) {
    return (
        <div className={`optionsUser${activeId === info.id ? "selected" : ""}`} data-id={info.id} data-userid={info.members[0].id}>
            <img src={info.members[0].customIcon?.url || info.members[0].icon.source} alt="" />
            <div>{info.members[0].username}</div>
        </div>
    )
};