import { BasicUserInfo } from "../../../util/interfaces";
import { userOptionsClass } from "../../../util/globalValues";
import styled from "styled-components";

export default function MiniMembers({
  member,
  confirmedAdmin,
}: {
  member: BasicUserInfo & { admin?: boolean };
  confirmedAdmin?: boolean;
}) {
  return (
    <StyledMembers
      className={userOptionsClass}
      data-userid={member.id}
      {...(confirmedAdmin === true || member.admin === true
        ? { "data-admin": "true" }
        : {})}
    >
      <div>{member.username}</div>
      <img src={member.customIcon?.url || member.icon.source} alt="" />
    </StyledMembers>
  );
}

const StyledMembers = styled.div`
  display: flex;
  padding: 5px;
  gap: 10px;
  align-items: center;
  word-break: break-word;
  justify-content: space-between;
  img {
    width: 40px;
    height: 40px;
  }
`;
