import { ClickType, SimpleFunctionType } from "../../../util/types";
import { setEditId } from "../../features/manager/manager-slice";
import { useDeleteMessageMutation } from "../../features/message-api/message-api-slice";
import { useRef } from "react";
import  useClickOutside from "../../../util/useClickOutside";
import { CoordsProp } from "../../../util/interfaces";
import { useDispatch } from "react-redux";

export default function MessageOptions({ messageid, makeVisible, coords } : {messageid: string, makeVisible: SimpleFunctionType, coords: CoordsProp}) {
    const [deleteMessage] = useDeleteMessageMutation();
    const optionsRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    useClickOutside(optionsRef, makeVisible);
    
    const handleOnClick = function handleClickingOption(event : ClickType) {
        const currentTarget = event.target as HTMLDivElement;

        if (currentTarget.dataset.type === "EDIT") {
            dispatch(setEditId(messageid));

        } else if (currentTarget.dataset.type === "DELETE") {
            deleteMessage({id: messageid});
        };
    };

    return (
        <div onClick={handleOnClick} ref={optionsRef} style={{position: "absolute", ...coords}}>
            <div className="messageOption" data-type="EDIT">Edit</div>
            <div className="messageOption" data-type="DELETE">Delete</div>
        </div>
    )
};