import { FriendsInfo } from "../../../util/interfaces";
import { userOptionsClass } from "../../../util/globalValues";

export default function FriendDisplay({info} : {info: FriendsInfo}) {
    return (
        <div data-userid={info.id}  data-friend={true} className={userOptionsClass}>
            <div >{info.username}</div>
            <img src={info.customIcon?.url || info.icon.source} alt="" />
            <div>{info.online ? "Online" : "Offline"}</div>
        </div>
    )
};