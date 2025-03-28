import { ClickType, SimpleFunctionType } from "../../../util/types";
import { setEditId } from "../../features/manager/manager-slice";
import { useDeleteMessageMutation } from "../../features/message-api/message-api-slice";
import { useRef } from "react";
import  useClickOutside from "../../../util/useClickOutside";
import { CoordsProp, FullMessageInfo, UId } from "../../../util/interfaces";
import { useDispatch } from "react-redux";
import { LazyGetTriggerType } from "../../../util/types";

export default function MessageOptions({ messageid, changeVisible, coords, trigger } : {messageid: string, changeVisible: SimpleFunctionType, coords: CoordsProp, trigger: LazyGetTriggerType<UId, FullMessageInfo>}) {
    const [deleteMessage] = useDeleteMessageMutation();
    const optionsRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    useClickOutside(optionsRef, changeVisible);
    const handleOnClick = function handleClickingOption(event : ClickType) {
        const currentTarget = event.target as HTMLDivElement;

        if (currentTarget.dataset.type === "EDIT") {
            dispatch(setEditId(messageid));
            trigger({id: messageid});
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