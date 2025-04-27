import { useState } from "react";
import { FormType } from "../../../util/types";
import SimpleForm from "./SimpleForm";
import { useUpdateGroupMutation } from "../../features/message-api/message-api-slice";

export default function EditGroupName({fieldsName, groupId, groupName, buttonText} : {buttonText: string, groupId: string, fieldsName: string, groupName: string | null}) {
    const [editName, setEditName] = useState(false);
    const [updateName] = useUpdateGroupMutation();

    const handleSubmit = function handleSubmitingNameChange(event: FormType, fieldName: string) {
        event.preventDefault();
        event.stopPropagation();
        const target = event.target as HTMLFormElement;
        const possibleName = target[fieldName].value;
        if (!possibleName || possibleName === "") {
            return;
        }
        updateName({id: groupId, info: {name: possibleName}}).unwrap().finally(() => {
            setEditName(false);
        });

        target.reset();
    };

    return (
        <div>
            {(editName ? <div onClick={() => setEditName(false)}>Cancel</div> : <div onClick={() => setEditName(true)}>Edit Name</div>)}
            {(editName &&
            <SimpleForm fieldsName={fieldsName} possibleDefault={groupName || ""} buttonText={buttonText} submitFunc={(e) => handleSubmit(e, fieldsName)} />
            )}
        </div>
    )
};