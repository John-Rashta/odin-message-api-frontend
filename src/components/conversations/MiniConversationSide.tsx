import { UserConversation } from "../../../util/interfaces";
import {
  userOptionsClass,
  sidebarOptionClass,
} from "../../../util/globalValues";
import styled from "styled-components";
import { StyledSides } from "../../../util/style";

export default function MiniConversationSide({
  info,
  activeId,
}: {
  info: UserConversation;
  activeId?: string;
}) {
  return (
    <StyledConvoSide
      className={`${sidebarOptionClass} ${userOptionsClass} ${activeId === info.id ? "selected" : ""}`}
      data-convoid={info.id}
      data-userid={info.members[0].id}
    >
      <img
        src={info.members[0].customIcon?.url || info.members[0].icon.source}
        alt=""
      />
      <div>{info.members[0].username}</div>
    </StyledConvoSide>
  );
}

const StyledConvoSide = styled(StyledSides)`
  img {
    width: 60px;
    height: 60px;
  }
`;
