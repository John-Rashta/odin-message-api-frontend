import { BasicUserInfo } from "../../../util/interfaces";
import MiniMembers from "./MiniMembers";

export default function GroupPeople({admins, members} : {admins: BasicUserInfo[], members: BasicUserInfo[]}) {

    return (
        <div>
            <div>
                <p>Admins</p>
                {admins.map((member) => {
                    return (
                    <MiniMembers confirmedAdmin={true} member={member} />
                    )
                })}
            </div>
            <div>
                <p>Members</p>
                {members.map((member) => {
                    return (
                        <MiniMembers member={member} />
                    )
                })}
            </div>
        </div>
    )

};