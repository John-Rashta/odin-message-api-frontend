import { UserInfo } from "../../../util/interfaces";

export default function UserProfile({info} : {info: UserInfo}) {
    return (
        <main>
            <img src={info.customIcon?.url || info.icon.source} alt="" />
            <div>{info.username}</div>
            <div>{info.name}</div>
            <div>{info.id}</div>
            <div>{info.joinedAt.toDateString()}</div>
            <div>{info.aboutMe}</div>
        </main>
    )
};