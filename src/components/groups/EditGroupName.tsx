import { useState } from "react";
import { FormType } from "../../../util/types";
import SimpleForm from "../partials/SimpleForm";
import { useUpdateGroupMutation } from "../../features/message-api/message-api-slice";
import styled from "styled-components";

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
            {(editName ? <StyledEdit>
                <StyledForm fieldsName={fieldsName} possibleDefault={groupName || ""} buttonText={buttonText} submitFunc={(e) => handleSubmit(e, fieldsName)} />
                <StyledCancel onClick={() => setEditName(false)}>Cancel</StyledCancel>
            </StyledEdit> : <StyledButton onClick={() => setEditName(true)}>Edit Name</StyledButton>)}
        </div>
    )
};

const StyledButton = styled.button`
    padding: 3px;
    background-color: rgb(136, 202, 240);
    &:hover {
        opacity: 0.8;
    }
`;

const StyledEdit = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const StyledForm = styled(SimpleForm)`
    display: flex;
    gap: 5px;
    input {
        padding: 4px;
        background-color: rgb(182, 238, 255);
    }
    button {
    padding: 3px 5px;
    background-color: rgb(218, 244, 245);
    border: 1px solid;
    }
`;

const StyledCancel = styled.button`
    background-color: rgb(255, 73, 73);
    padding: 3px;
    border-radius: 5px;
    &:hover {
        opacity: 0.8;
    }
`