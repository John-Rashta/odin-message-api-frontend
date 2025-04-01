import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "../../features/message-api/message-api-slice";
import isAscii from "validator/lib/isAscii";
import isAlphanumeric from "validator/lib/isAlphanumeric";
import usePasswordHandle from "../../../util/usePasswordHandle";
import PasswordConfirm from "./PasswordConfirm";

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

        const newForm = new FormData();
        newForm.append("username", username);
        newForm.append("password", password);

        createUser({data: newForm}).unwrap().then(() => {
            navigate("/");
        }).catch(() => {
            setWrongInputs(true);
            resetPws();
        });

    };
    return (
        <main>
            {wrongInputs ? <div>Username or Password wrong!</div> : null} 
            <form onSubmit={handleForm}>
                <label htmlFor="username">Username:
                    <p>Only Letters and/or Numbers</p>
                </label>
                <input type="text" name="username" id="username" required/>
                <PasswordConfirm passwordInfo={pwState} confirmPasswordInfo={confirmPwState}/>
                <button type="submit">Sign Me Up!</button>
            </form>
        </main>
    )

};