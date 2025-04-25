import { ClickType, EditStateType, SimpleFunctionType } from "../../../util/types";
import { useDeleteMessageMutation } from "../../features/message-api/message-api-slice";
import { useRef } from "react";
import  useClickOutside from "../../../util/useClickOutside";
import { CoordsProp } from "../../../util/interfaces";
import styled from "styled-components";

export default function MessageOptions({ messageid, changeVisible, coords, changeId, checkId } : {messageid: string, changeVisible: SimpleFunctionType, coords: CoordsProp, changeId: EditStateType, checkId: string }) {
    const [deleteMessage] = useDeleteMessageMutation();
    const optionsRef = useRef<HTMLDivElement>(null);
    useClickOutside(optionsRef, changeVisible);
    const handleOnClick = function handleClickingOption(event : ClickType) {
        const currentTarget = event.target as HTMLDivElement;

        if (checkId === messageid) {
            return;
        };
        if (currentTarget.dataset.type === "EDIT") {
            changeId(messageid);
            changeVisible();

        } else if (currentTarget.dataset.type === "DELETE") {
            deleteMessage({id: messageid});
            changeVisible();
        };
    };

    return (
        <StyledMessageOptions onClick={handleOnClick} className="messageOptionsContainer" ref={optionsRef} style={{position: "absolute", ...coords}}>
            <StyledOptions className="messageOption" data-type="EDIT">Edit</StyledOptions>
            <StyledOptions className="messageOption" data-type="DELETE">Delete</StyledOptions>
        </StyledMessageOptions>
    )
};

const StyledMessageOptions = styled.div`
    display: flex;
    background-color: rgb(76, 168, 230);
    border-radius: 10px;
`;

const StyledOptions = styled.div`
    padding: 10px;
    border-radius: 10px;
    &:hover {
        background-color: rgb(175, 195, 207);
    }
`;