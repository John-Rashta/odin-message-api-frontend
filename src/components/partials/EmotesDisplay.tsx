import styled from "styled-components";
import emotesArr from "../../../util/emotes";
import { ClickType, SimpleFunctionType, EditStateType } from "../../../util/types";

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
    return (
        <StyledEmotesContainer onClick={handleClick}>
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
    width: 120px;
    height: 100px;
`;