import { BasicUserInfo } from "../../../util/interfaces";
import { userOptionsClass } from "../../../util/globalValues";

export default function MiniMembers({member, confirmedAdmin} : {member: BasicUserInfo & {admin?: boolean}, confirmedAdmin?: boolean}) {
    return (
        <div className={userOptionsClass} {...((confirmedAdmin === true || member.admin === true) ? {admin: true} : {})} >
            <div>{member.username}</div>
            <img src={member.customIcon?.url || member.icon.source} alt="" />
        </div>
    )
};