import { NavLink } from "react-router-dom";
import styled from "styled-components";

const navMenuValue = `800px`;
const mainBackgroundColor = `rgb(183, 218, 235)`;
const headerBackgroundColor = `rgb(106, 192, 231)`;
const headerPadding = `20px 10px`;
const StyledNavLink = styled(NavLink)`
    border: solid transparent 2px;
    border-radius: 3px;
    text-decoration: none;
    &:hover {
        border-color: rgb(0, 0, 0);
    }
    padding: 8px;
    &.active {
        background-color: rgb(247, 199, 109);
    }
`;

const StyledContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 1.1rem;
`;

const StyledForm = styled.form`
    border: 2px solid;
    display: flex;
    flex-direction: column;
    padding: 30px;
    gap: 5px;
    background-color: rgb(141, 188, 209);
    position: relative;
`;

const StyledButton = styled.button`
    align-self: center;
    margin-top: 20px;
    padding: 5px 10px;
    background-color: rgb(148, 213, 231);
    border: 2px solid rgb(0, 124, 158);
`;

const StyledInput = styled.input`
    padding: 5px;
    background-color:rgb(224, 241, 245);
    border: 1px solid rgb(122, 122, 122);
`;

const StyledWrongInput = styled.div`
    position: absolute;
    top: -50px;
    left: 10px;
    width: 150%;
`;

const StyledDivFlex = styled.div`
    display: flex;
    flex-direction: column;
`


export { 
    StyledButton, 
    StyledContainer, 
    StyledForm, 
    StyledWrongInput, 
    StyledInput, 
    StyledNavLink, 
    headerPadding, 
    headerBackgroundColor, 
    navMenuValue, 
    mainBackgroundColor,
    StyledDivFlex,
};