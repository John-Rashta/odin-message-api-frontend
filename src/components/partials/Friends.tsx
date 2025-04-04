import FriendDisplay from "./FriendDisplay";
import { useGetFriendsQuery } from "../../features/message-api/message-api-slice";
import MainWithOptions from "./MainWithOptions";

export default function Friends() {
    const { data, error, isLoading } = useGetFriendsQuery();
    return (
        <MainWithOptions>
            {isLoading ? <div>Loading Friends...</div>
            : error ? <div>Failed Getting Friends!</div>
            : data ? data.friends.friendlist.map((friend) => {
                return <FriendDisplay info={friend.users[0]} />
            }) : <div>No Friends Yet!</div>
            }
        </MainWithOptions>
    )
};