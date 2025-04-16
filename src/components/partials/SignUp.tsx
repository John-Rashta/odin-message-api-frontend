import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "../../features/message-api/message-api-slice";
import isAscii from "validator/lib/isAscii";
import isAlphanumeric from "validator/lib/isAlphanumeric";
import usePasswordHandle from "../../../util/usePasswordHandle";
import PasswordConfirm from "./PasswordConfirm";
import styled from "styled-components";
import { StyledDivFlex, StyledButton, StyledForm, StyledContainer, StyledWrongInput, StyledInput } from "../../../util/style";

export default function SignUp() {
    const [createUser] = useCreateUserMutation();
    const navigate = useNavigate(); 
    const [wrongInputs, setWrongInputs] = useState(false);
    const [pwState, confirmPwState, resetPws] = usePasswordHandle();

    const handleForm = function handleFormSubmitting(event: React.FormEvent) {
        event.preventDefault();
        if (!(pwState.checkValue === confirmPwState.checkValue)) {
            return;
        }
        const currentTarget = event.target as HTMLFormElement;
        const username = currentTarget.username.value;
        const password = currentTarget.password.value;
        if (!isAlphanumeric(username) || !isAscii(password)) {
            setWrongInputs(true);
            resetPws();
            return;
        };

        createUser({username, password}).unwrap().then(() => {
            navigate("/");
        }).catch((response) => {
            console.log(response)
            setWrongInputs(true);
            resetPws();
        });

    };
    return (
        <main>
            <StyledContainer> 
                <StyledExtraForm onSubmit={handleForm}>
                    {wrongInputs ? <StyledExtraWrong>Username or Password wrong!</StyledExtraWrong> : null} 
                    <StyledDivFlex>
                        <label htmlFor="username">Username:</label>
                        <StyledInput type="text" name="username" id="username" placeholder="Only Letters and/or Numbers" required/>
                    </StyledDivFlex>
                    <PasswordConfirm passwordInfo={pwState} confirmPasswordInfo={confirmPwState}/>
                    <StyledButton type="submit">Sign Me Up!</StyledButton>
                </StyledExtraForm>
            </StyledContainer>
        </main>
    )

};


const StyledExtraForm = styled(StyledForm)`
    width: 300px;
    gap: 50px;  
`;

const StyledExtraWrong = styled(StyledWrongInput)`
    left: 70px;
`