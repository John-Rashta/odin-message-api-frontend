import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateConversationMutation } from "../../features/message-api/message-api-slice";
import { ButtonClickType } from "../../../util/types";
import { setConversationId } from "../../features/manager/manager-slice";

export default function StartConvoButton({userid, customText} : { userid: string, customText?: string}) {
    const [createConvo] = useCreateConversationMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = function handleClickingStartConversation(event: ButtonClickType) {
            event.stopPropagation();
            const target = event.target as HTMLButtonElement;
            target.disabled = true;
            createConvo({targetid: userid}).unwrap().then((response) => {
                dispatch(setConversationId(response.conversation));
                navigate("/conversations");
            }).catch(() => {
                target.disabled = false;
            })
        };

    return (
        <>
            <button onClick={handleClick}>{typeof customText === "string" && customText || "Start Conversation"} </button>
        </>
    )

};