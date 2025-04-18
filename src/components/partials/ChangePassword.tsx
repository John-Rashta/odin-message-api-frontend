import { useUpdateMeMutation } from "../../features/message-api/message-api-slice";
import PasswordConfirm from "./PasswordConfirm";
import usePasswordHandle from "../../../util/usePasswordHandle";
import { useNavigate } from "react-router-dom";
import isAscii from "validator/lib/isAscii";
import { useState } from "react";
import { StyledButton, StyledContainer, StyledDivFlex, StyledForm, StyledInput, StyledWrongInput } from "../../../util/style";
import styled from "styled-components";

export default function ChangePassword() {
    const [updatePw] = useUpdateMeMutation();
    const [pwState, confirmPwState, resetPws] = usePasswordHandle();
    const navigate = useNavigate();
    const [wrongInputs, setWrongInputs] = useState(false);

    const handleSubmit = function handleFormSubmitForPasswordChange(event: React.FormEvent) {
        event.preventDefault();
        if (!(pwState.checkValue === confirmPwState.checkValue)) {
            return;
        };
        const currentTarget = event.target as HTMLFormElement;
        const oldPassword = currentTarget.oldPassword.value;
        const password = currentTarget.password.value;
        if (!isAscii(password) || !isAscii(oldPassword)) {
            setWrongInputs(true);
            resetPws();
            return;
        }
        const newForm = new FormData;
        newForm.append("password", password);
        newForm.append("oldPassword", oldPassword);
        updatePw(newForm).unwrap().then(() => {
            navigate("/profile");
        }).catch(() => {
            setWrongInputs(true);
            resetPws();
        })

    }
    return (
        <main>
            <StyledContainer>
                <StyledExtraForm onSubmit={handleSubmit}>
                    {wrongInputs && <StyledExtraInvalid>Invalid Password!</StyledExtraInvalid>}
                    <StyledDivFlex>
                        <label htmlFor="oldPassword">Current Password:</label>
                        <StyledInput type="password" id="oldPassword" name="oldPassword" />
                    </StyledDivFlex>
                    <PasswordConfirm passwordInfo={pwState} confirmPasswordInfo={confirmPwState}/>
                    <StyledButton type="submit">Change Password</StyledButton>
                </StyledExtraForm>
            </StyledContainer>
        </main>
    )
};

const StyledExtraForm = styled(StyledForm)`
    gap: 45px;
    width: 270px;
`;

const StyledExtraInvalid = styled(StyledWrongInput)`
    left: 90px;
    font-weight: bold;
`;