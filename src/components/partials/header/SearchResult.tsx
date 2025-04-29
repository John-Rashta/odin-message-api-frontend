import styled from "styled-components";
import { UserInfo } from "../../../../util/interfaces";

///PROPER ROUTES NEED TO BE DONE
export default function SearchResult({info} : {info: UserInfo}) {
    return (
        <StyledResult className="searchResult" data-id={info.id}>
            <div>{info.username}</div>
            <img src={info.customIcon?.url || info.icon.source} alt="" />
        </StyledResult>
    )
};

const StyledResult = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    padding: 5px;
    &:hover {
        background-color: rgb(194, 181, 181);
    }
`;