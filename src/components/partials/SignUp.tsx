import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "../../features/message-api/message-api-slice";
import isAscii from "validator/lib/isAscii";
import isAlphanumeric from "validator/lib/isAlphanumeric";
import usePasswordHandle from "../../../util";

export default function SignUp() {
    const [createUser] = useCreateUserMutation();
    const navigate = useNavigate(); 
    const [wrongInputs, setWrongInputs] = useState(false);
    const [passwordValue, setPasswordValue] = useState("");
    const [confirmPasswordValue, setConfirmPasswordValue] = useState("");

    const handleForm = function handleFormSubmitting(event: React.FormEvent) {
        event.preventDefault();
        if (!(passwordValue === confirmPasswordValue)) {
            return;
        }
        const currentTarget = event.target as HTMLFormElement;
        const username = currentTarget.username.value;
        const password = currentTarget.password.value;
        if (!isAlphanumeric(username) || !isAscii(password)) {
            setWrongInputs(true);
            setPasswordValue("");
            setConfirmPasswordValue("");
            return;
        };

        const newForm = new FormData();
        newForm.append("username", username);
        newForm.append("password", password);

        createUser({data: newForm}).unwrap().then(() => {
            navigate("/");
        }).catch(() => {
            setWrongInputs(true);
            setPasswordValue("");
            setConfirmPasswordValue("");
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
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" value={passwordValue} 
                onChange={(e) => {
                    setPasswordValue(e.target.value);
                }} required/>
                <label htmlFor="confirmPassword">Confirm Password:</label>
                {confirmPasswordValue !== "" && confirmPasswordValue !== passwordValue ? 
                <div style={{position: "absolute"}}>Passwords don't match!</div> : null}
                <input type="password" name="confirmPassword" id="confirmPassword" value={confirmPasswordValue} 
                onChange={(e) => {
                    setConfirmPasswordValue(e.target.value);
                }} required/>
                <button type="submit">Sign Me Up!</button>
            </form>
        </main>
    )

};