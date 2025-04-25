import styled from "styled-components";
import emotesArr from "../../../util/emotes";
import { ClickType, SimpleFunctionType, EditStateType } from "../../../util/types";
import useClickOutside from "../../../util/useClickOutside";
import { useRef } from "react";

export default function EmotesDisplay({hideMe, addEmote, currentMessage} : {hideMe: SimpleFunctionType, addEmote: EditStateType, currentMessage: string}) {
    const handleClick = function handleClickingEmote(event: ClickType) {
        event.stopPropagation();
        event.preventDefault();
        const target = event.target as HTMLDivElement;
        if (!target.classList.contains("emoteOption")) {
            return;
        };
        const newMessage = currentMessage + target.textContent;
        addEmote(newMessage);
        hideMe();
    };
    const emotesRef = useRef<HTMLDivElement>(null);
    useClickOutside(emotesRef, hideMe);
    return (
        <StyledEmotesContainer ref={emotesRef} onClick={handleClick}>
            {emotesArr.map((emote, index) => {
                return (
                    <div key={index} className="emoteOption">
                        {String.fromCodePoint(Number("0x" + emote))}
                    </div>
                )
            })}
        </StyledEmotesContainer>
    )
};

const StyledEmotesContainer = styled.div`
    position: absolute;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(25px, 1fr));
    overflow: auto;
    width: 200px;
    height: 150px;
    bottom: 110%;
    right: 0;
    border: solid 1px;
    background-color: rgb(242, 255, 254);
    padding: 3px;
    font-size: 1.2rem;
    cursor: pointer;
`;