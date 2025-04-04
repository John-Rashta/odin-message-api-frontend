import { SimpleSubmitFunctionType } from "../../../util/types";

export default function SimpleForm({fieldsName, submitFunc, buttonText, possibleDefault} : {fieldsName: string, submitFunc: SimpleSubmitFunctionType, buttonText: string, possibleDefault?: string }) {
    return (
        <form onSubmit={submitFunc}>
        <input type="text" name={fieldsName} id={fieldsName} defaultValue={possibleDefault || ""} />
        <button type="submit">{buttonText}</button>
        </form>
    )
};