import { useUpdateMeMutation } from "../../features/message-api/message-api-slice";
import PasswordConfirm from "./PasswordConfirm";
import usePasswordHandle from "../../../util/usePasswordHandle";
import { useNavigate } from "react-router-dom";
import isAscii from "validator/lib/isAscii";
import { useState } from "react";

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
            <form onSubmit={handleSubmit}>
                {wrongInputs && <div>Invalid Password!</div>}
                <label htmlFor="oldPassword">Current Password:</label>
                <input type="password" id="oldPassword" name="oldPassword" />
                <PasswordConfirm passwordInfo={pwState} confirmPasswordInfo={confirmPwState}/>
                <button type="submit">Change Password</button>
            </form>
        </main>
    )
};