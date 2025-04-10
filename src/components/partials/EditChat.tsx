import { FullMessageInfo } from "../../../util/interfaces";
import { FormType, SimpleFunctionType } from "../../../util/types";
import { useUpdateMessageMutation } from "../../features/message-api/message-api-slice";

export default function EditChat({info, changeEdit} : { info: FullMessageInfo, changeEdit: SimpleFunctionType }) {
    const [updateMessage] = useUpdateMessageMutation();
    const handleSubmit = function handleSubmitingEdit(event: FormType) {
        event.preventDefault();
        event.stopPropagation();
        const target = event.target as HTMLFormElement;
        const content = target.editInput.value;
        if (content === "" && !info.image) {
            return;
        };
        const newForm = new FormData;
        newForm.append("content", content);
        updateMessage({message: newForm, id: info.id}).unwrap().then().catch().finally(() => {
            changeEdit();
        })
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="editInput" id="editInput" defaultValue={info.content}/>
            {typeof info.image?.url === "string" ? <img src={info.image.url} alt="message image"/> : null}
            <button type="submit">Confirm</button>
        </form>
    )
};