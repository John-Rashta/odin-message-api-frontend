import { ClickType, SimpleFunctionType } from "../../../util/types";
import { setEditId } from "../../features/manager/manager-slice";
import { useDeleteMessageMutation } from "../../features/message-api/message-api-slice";
import { useRef } from "react";
import  useClickOutside from "../../../util/useClickOutside";

export default function MessageOptions({ messageid, makeVisible } : {messageid: string, makeVisible: SimpleFunctionType}) {
    const [deleteMessage] = useDeleteMessageMutation();
    const optionsRef = useRef<HTMLDivElement>(null);
    useClickOutside(optionsRef, makeVisible);
    
    const handleOnClick = function handleClickingOption(event : ClickType) {
        const currentTarget = event.target as HTMLDivElement;

        if (currentTarget.dataset.type === "EDIT") {
            setEditId(messageid);

        } else if (currentTarget.dataset.type === "DELETE") {
            deleteMessage({id: messageid});
        };
    };

    return (
        <div onClick={handleOnClick} ref={optionsRef}>
            <div className="messageOption" data-type="EDIT">Edit</div>
            <div className="messageOption" data-type="DELETE">Delete</div>
        </div>
    )
};