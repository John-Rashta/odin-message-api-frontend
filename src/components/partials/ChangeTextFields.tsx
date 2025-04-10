import { FormType, MutationTriggerType } from "../../../util/types";
import { ReturnMessage, UserInfo } from "../../../util/interfaces";
import { useState } from "react";

type FieldNameOptions = "username" | "name" | "aboutMe";

export default function ChangeTextFields({myData, fieldname, updater, area} : {myData: UserInfo, fieldname : FieldNameOptions, updater: MutationTriggerType<FormData, ReturnMessage>, area?: boolean}) {
    const [showEdit, setShowEdit] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = function handleClickingEditSubmit(event: FormType) {
        event.preventDefault();
        event.stopPropagation();
        const target = event.target as HTMLFormElement;
        const updatedValue = target[fieldname].value;
        const newForm = new FormData;
        newForm.append(fieldname, updatedValue);
        updater(newForm).unwrap().then(() => {
            setShowEdit(false);
            setShowError(false);
            setErrorMessage("");
        }).catch((response) => {
            if (response.data.message) {
                setErrorMessage(response.data.message);
                setShowError(true);
            }
        })
    };

    return (
        <div>
            { (showEdit && 
            <form onSubmit={handleSubmit}>
                {showError &&  <div>{errorMessage}</div>}
                <label htmlFor={fieldname}></label>
                {area ? <textarea name={fieldname} id={fieldname} defaultValue={myData[fieldname] || ""}></textarea> : <input type="text" name={fieldname} id={fieldname} defaultValue={myData[fieldname] || ""} />}
                <button type="submit">Confirm</button>
                <button onClick={() => setShowEdit(false)}>Cancel</button>
            </form>
            )  || (!showEdit && <><div>{myData[fieldname]}</div> <button onClick={() => setShowEdit(true)}>Edit</button></>) }
        </div>
    )
};