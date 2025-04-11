import { FormType, SimpleFunctionType } from "../../../util/types";
import { useGetMessageQuery, useUpdateMessageMutation } from "../../features/message-api/message-api-slice";

export default function EditChat({info, changeEdit} : { info: string, changeEdit: SimpleFunctionType }) {
    const [updateMessage] = useUpdateMessageMutation();
    const { messageData } = useGetMessageQuery({id:info}, {selectFromResult: ({data}) => ({
        messageData: data?.message
    })});
    const handleSubmit = function handleSubmitingEdit(event: FormType) {
        event.preventDefault();
        event.stopPropagation();
        const target = event.target as HTMLFormElement;
        const content = target.editInput.value;
        if (!messageData) {
            return;
        }
        if (content === "" && !messageData.image) {
            return;
        };
        updateMessage({message: {content: content}, id: messageData.id}).unwrap().then().catch((e) => {
            if (e.data.message) {
                console.log(e.data.message);
            }
        }).finally(() => {
            changeEdit();
        })
    };

    return (
    <>
    {messageData &&
        <form onSubmit={handleSubmit} onClick={(e) =>  e.stopPropagation()}>
        <input type="text" name="editInput" id="editInput" defaultValue={messageData.content}/>
        {typeof messageData.image?.url === "string" ? <img src={messageData.image.url} alt="message image"/> : null}
        <button onClick={() => changeEdit()} type="button">Cancel</button>
        <button type="submit">Confirm</button>
        </form>
    }  
    </>
    )
};