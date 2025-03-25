import { UserConversation } from "../../../util/interfaces";

export default function Conversation({info} : {info: UserConversation}) {
    return (
        <div data-id={info.id}>
            <img src={info.members[0].customIcon?.url || info.members[0].icon.source} alt={info.members[0].username} />
            <div>{info.members[0].username}</div>
        </div>
    )
};