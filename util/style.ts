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
`;

const StyledErrorMessage = styled.div`
    align-self: center;
    font-size: 1.4rem;
`;

const StyledReturn = styled.div`
    display: flex;
    gap: 20px;
    box-shadow: 0 -1px 0 black;
    justify-content: space-between;
    padding: 20px;
`;

const StyledEmoteOptionsBox = styled.div`
    position: relative;
`;

const StyledExtraMessage = styled(StyledErrorMessage)`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
`;

const StyledProfileMain = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    gap: 20px;
    font-size: 1.1rem;
`;

const StyledProfileImg = styled.img`
    width: 150px;
    height: 150px;
`;

const aboutMeStyle = `
     width: 400px;
    max-height: 150px;
    height: 150px;
    overflow: auto;
    background-color: white;
`;

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
    StyledErrorMessage,
    StyledReturn,
    StyledEmoteOptionsBox,
    StyledExtraMessage,
    StyledProfileMain,
    StyledProfileImg,
    aboutMeStyle,
};