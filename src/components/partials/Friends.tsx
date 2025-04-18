import FriendDisplay from "./FriendDisplay";
import { useGetFriendsQuery } from "../../features/message-api/message-api-slice";
import MainWithOptions from "./MainWithOptions";
import styled from "styled-components";
import { StyledErrorMessage as ExtraMessage } from "../../../util/style";

export default function Friends() {
    const { data, error, isLoading } = useGetFriendsQuery();
    return (
        <StyledMain>
            {isLoading ? <StyledErrorMessage>Loading Friends...</StyledErrorMessage>
            : error ? <StyledErrorMessage>Failed Getting Friends!</StyledErrorMessage>
            : data ? (data.friends.friendlist.length > 0 &&  data.friends.friendlist.map((friend) => {
                return <FriendDisplay key={friend.users[0].id} info={friend.users[0]} />
            })) || <StyledErrorMessage>No Friends Yet!</StyledErrorMessage>  : <StyledErrorMessage>No Friends Yet!</StyledErrorMessage>
            }
        </StyledMain>
    )
};

const StyledMain = styled(MainWithOptions)`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const StyledErrorMessage = styled(ExtraMessage)`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
`