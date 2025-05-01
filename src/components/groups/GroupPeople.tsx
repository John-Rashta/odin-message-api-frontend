import styled from "styled-components";
import { BasicUserInfo } from "../../../util/interfaces";
import MiniMembers from "./MiniMembers";
import { styledOverflow } from "../../../util/style";

export default function GroupPeople({
  admins,
  members,
}: {
  admins: BasicUserInfo[];
  members: BasicUserInfo[];
}) {
  return (
    <StyledMembersSide>
      <div>
        <StyledTitles>Admins</StyledTitles>
        {admins.map((member) => {
          return (
            <MiniMembers
              key={member.id}
              confirmedAdmin={true}
              member={member}
            />
          );
        })}
      </div>
      <div>
        <StyledTitles>Members</StyledTitles>
        {members.map((member) => {
          return <MiniMembers key={member.id} member={member} />;
        })}
      </div>
    </StyledMembersSide>
  );
}

const StyledMembersSide = styled.div`
  padding: 20px;
  background-color: rgb(86, 161, 190);
  display: flex;
  flex-direction: column;
  ${styledOverflow}
`;

const StyledTitles = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.64);
`;
