import { useState } from "react";

export default function usePasswordHandle() {
    const [passwordValue, setPasswordValue] = useState("");
    const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
    return [
        {
            checkValue: passwordValue,
            changeValue: setPasswordValue,
        },
        {
            checkValue: confirmPasswordValue,
            changeValue: setConfirmPasswordValue
        },
    ]
};