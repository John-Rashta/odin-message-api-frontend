import { BasicGroupInfo } from "../../../util/interfaces";
import { sidebarOptionClass } from "../../../util/globalValues";
import styled from "styled-components";
import { StyledSides } from "../../../util/style";

export default function MiniGroupSide({info, activeId} : {info: BasicGroupInfo, activeId?: string}) {
    return (
        <StyleGroupSide data-groupid={info.id} className={`${sidebarOptionClass} ${(activeId === info.id ? "selected"  : "")}` }>
            {typeof info.name === "string" ? <div>{info.name}</div> : null}
            <StyledMembers>{`(${info.members.map(user => user.username).toString()})`}</StyledMembers>
        </StyleGroupSide>
)};


const StyleGroupSide = styled(StyledSides)`
`;

const StyledMembers = styled.div`
    font-size: 1rem;
    text-overflow: ellipsis;
    word-break: keep-all;
    overflow: hidden;
`;