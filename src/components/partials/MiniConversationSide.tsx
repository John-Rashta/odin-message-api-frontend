import { UserConversation } from "../../../util/interfaces";
import { userOptionsClass, sidebarOptionClass } from "../../../util/globalValues";
import styled from "styled-components";

export default function MiniConversationSide({info, activeId} : {info: UserConversation, activeId?: string}) {
    return (
        <StyledConvoSide className={`${sidebarOptionClass} ${userOptionsClass} ${activeId === info.id ? "selected" : ""}`} data-convoid={info.id} data-userid={info.members[0].id}>
            <img src={info.members[0].customIcon?.url || info.members[0].icon.source} alt="" />
            <div>{info.members[0].username}</div>
        </StyledConvoSide>
    )
};

const StyledConvoSide = styled.div`
    display: flex;
    padding: 5px;
    gap: 10px;
    align-items: center;
    word-break: break-word;
    &.selected {
        background-color: rgb(159, 201, 231);
        border-radius: 10px;
    }
    img {
        width: 60px;
        height: 60px;
    }
    font-size: 1.2rem;
`;