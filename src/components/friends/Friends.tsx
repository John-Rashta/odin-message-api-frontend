import FriendDisplay from "./FriendDisplay";
import { useGetFriendsQuery } from "../../features/message-api/message-api-slice";
import MainWithOptions from "../partials/MainWithOptions";
import styled from "styled-components";
import { StyledExtraMessage } from "../../../util/style";

export default function Friends() {
  const { data, error, isLoading } = useGetFriendsQuery();
  return (
    <StyledMain>
      {isLoading ? (
        <StyledExtraMessage>Loading Friends...</StyledExtraMessage>
      ) : error ? (
        <StyledExtraMessage>Failed Getting Friends!</StyledExtraMessage>
      ) : data ? (
        (data.friends.friendlist.length > 0 &&
          data.friends.friendlist.map((friend) => {
            return (
              <FriendDisplay key={friend.users[0].id} info={friend.users[0]} />
            );
          })) || <StyledExtraMessage>No Friends Yet!</StyledExtraMessage>
      ) : (
        <StyledExtraMessage>No Friends Yet!</StyledExtraMessage>
      )}
    </StyledMain>
  );
}

const StyledMain = styled(MainWithOptions)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;
