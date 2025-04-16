import styled from "styled-components";
import { PwInfo } from "../../../util/interfaces";
import { StyledInput, StyledDivFlex } from "../../../util/style";

export default function PasswordConfirm({passwordInfo, confirmPasswordInfo} : {passwordInfo : PwInfo, confirmPasswordInfo: PwInfo}) {

    return (
        <StyledPassContainer>
            {confirmPasswordInfo.checkValue !== "" && confirmPasswordInfo.checkValue !== passwordInfo.checkValue ? 
                <StyledWrongPass>Passwords don't match!</StyledWrongPass> : null}
            <StyledDivFlex>
                <label htmlFor="password">Password:</label>
                <StyledInput type="password" name="password" id="password" value={passwordInfo.checkValue} 
                onChange={(e) => {
                    passwordInfo.changeValue(e.target.value);
                }} required/>
            </StyledDivFlex>
            <StyledDivFlex>
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <StyledInput type="password" name="confirmPassword" id="confirmPassword" value={confirmPasswordInfo.checkValue} 
                onChange={(e) => {
                    confirmPasswordInfo.changeValue(e.target.value);
                }} required/>
            </StyledDivFlex>
        </StyledPassContainer>
    )
};

const StyledPassContainer = styled(StyledDivFlex)`
    gap: 10px;
    position: relative;
`;

const StyledWrongPass = styled.div`
    position: absolute;
    top: -23px;
    left: 65px;
    font-size: 1rem;
    color: rgb(116, 0, 0);

`