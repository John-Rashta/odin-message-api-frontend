import { FriendsInfo } from "../../../util/interfaces";
import { userOptionsClass } from "../../../util/globalValues";
import styled from "styled-components";
import { StyledReturn } from "../../../util/style";

export default function FriendDisplay({info} : {info: FriendsInfo}) {
    return (
        <ExtraReturn data-userid={info.id}  data-friend="true" className={userOptionsClass}>
            <StyledDiv>
                <div >{info.username}</div>
                <img src={info.customIcon?.url || info.icon.source} alt="" />
            </StyledDiv>
            <div>{info.online ? "Online" : "Offline"}</div>
        </ExtraReturn>
    )
};

const ExtraReturn = styled(StyledReturn)`
    align-items: center;
    font-size: 1.2rem;
    gap: 50px;
`;

const StyledDiv = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;