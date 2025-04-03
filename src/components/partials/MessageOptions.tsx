import { ClickType, EditStateType, SimpleFunctionType } from "../../../util/types";
import { useDeleteMessageMutation } from "../../features/message-api/message-api-slice";
import { useRef } from "react";
import  useClickOutside from "../../../util/useClickOutside";
import { CoordsProp } from "../../../util/interfaces";

export default function MessageOptions({ messageid, changeVisible, coords, changeId } : {messageid: string, changeVisible: SimpleFunctionType, coords: CoordsProp, changeId: EditStateType}) {
    const [deleteMessage] = useDeleteMessageMutation();
    const optionsRef = useRef<HTMLDivElement>(null);
    useClickOutside(optionsRef, changeVisible);
    const handleOnClick = function handleClickingOption(event : ClickType) {
        const currentTarget = event.target as HTMLDivElement;

        if (currentTarget.dataset.type === "EDIT") {
            changeId(messageid);
            changeVisible();

        } else if (currentTarget.dataset.type === "DELETE") {
            deleteMessage({id: messageid});
            changeVisible();
        };
    };

    return (
        <div onClick={handleOnClick} ref={optionsRef} style={{position: "absolute", ...coords}}>
            <div className="messageOption" data-type="EDIT">Edit</div>
            <div className="messageOption" data-type="DELETE">Delete</div>
        </div>
    )
};