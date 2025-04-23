import { FormType, MutationTriggerType } from "../../../util/types";
import { ReturnMessage, UserInfo } from "../../../util/interfaces";
import { useState } from "react";
import styled from "styled-components";

type FieldNameOptions = "username" | "name" | "aboutMe";

export default function ChangeTextFields({myData, fieldname, updater, area, className} : {myData: UserInfo, fieldname : FieldNameOptions, updater: MutationTriggerType<FormData, ReturnMessage>, area?: boolean, className?: string}) {
    const [showEdit, setShowEdit] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("ERROR HERE ASDA");

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
                if (!showError) {
                    setTimeout(() => {
                        setErrorMessage("");
                        setShowError(false);
                    }, 5000);
                }
                setErrorMessage(response.data.message);
                setShowError(true);
            }
        })
    };

    return (
        <StyledDiv className={className}>
            { (showEdit && 
            <StyledForm onSubmit={handleSubmit}>
                {showError && <StyledError>{errorMessage}</StyledError>}
                <label htmlFor={fieldname}></label>
                {area ? <StyledTextArea name={fieldname} id={fieldname} defaultValue={myData[fieldname] || ""}></StyledTextArea> : <StyledInput type="text" name={fieldname} id={fieldname} defaultValue={myData[fieldname] || ""} />}
                <StyledConfirmButton type="submit">Confirm</StyledConfirmButton>
                <StyledCancelButton type="button" onClick={() => setShowEdit(false)}>Cancel</StyledCancelButton>
            </StyledForm>
            )  || (!showEdit && <><div className="textField">{myData[fieldname]}</div> <StyledEditButton onClick={() => setShowEdit(true)}>Edit</StyledEditButton></>) }
        </StyledDiv>
    )
};

const StyledDiv = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`;

const StyledForm = styled.form`
    display: flex;
    gap: 5px;
    align-items: center;
    position: relative;
`;

const StyledEditButton = styled.button`
    padding: 5px 7px;
    background-color: rgb(233, 214, 42);
    border: 1px solid;
`;

const StyledCancelButton = styled.button`
    padding: 5px 7px;
    background-color: rgb(255, 53, 38);
    font-weight: bold;
    border-radius: 10px;
`;

const StyledConfirmButton = styled.button`
    padding: 5px 7px;
    background-color: rgb(79, 219, 14);
    font-weight: bold;
    border-radius: 10px;
`;

const StyledInput = styled.input`
    background-color:  rgb(196, 248, 255);
    padding: 5px;
`;

const StyledTextArea = styled.textarea`
    background-color:  rgb(196, 248, 255);
`;

const StyledError = styled.p`
    position: absolute;
    top: -20px;
    left: 20px;
    color: rgb(204, 5, 5);
    z-index: 3;
`;