import styled from "styled-components";
import { BasicGroupInfo } from "../../../../util/interfaces";
import { ClickType } from "../../../../util/types";

type ClickFunction = (event: ClickType) => void;
export default function GroupOptions({groupsData, handleClick} : {groupsData: BasicGroupInfo[] | undefined, handleClick?: ClickFunction }) {
    return (
        <StyledOptions onClick={handleClick}>
        {groupsData && groupsData.length > 0 ? groupsData.map((group) => {
            return (
                <StyledGroupOption key={group.id} data-groupid={group.id} data-type="INVITEGROUP">{group.name}</StyledGroupOption>
            )
        }) : <StyledError>No Groups</StyledError> }
        </StyledOptions>
        )
};

const StyledOptions = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 1px;
    background-color: black;
    padding: 1px;
    width: 100px;
    z-index: 5;
    overflow: auto;
    max-height: 150px;
`;

const StyledGroupOption = styled.div`
    background-color: rgb(255, 255, 255);
    width: 100%;
    text-align: center;
    font-family: Georgia;
    padding: 3px;
    &:hover {
        background-color: rgb(112, 186, 223);
    }
`

const StyledError = styled.div`
    background-color: rgb(255, 255, 255);
    width: 100%;
    text-align: center;
`;
