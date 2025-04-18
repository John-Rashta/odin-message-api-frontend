import { useGetUserQuery } from "../../features/message-api/message-api-slice";
import { TargetUser, CoordsProp } from "../../../util/interfaces";
import { SimpleFunctionType } from "../../../util/types";
import StartConvoButton from "./StartConvoButton";
import { useState, useRef } from "react";
import UserOptions from "./UserOptions";
import useClickOutside from "../../../util/useClickOutside";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setUserId } from "../../features/manager/manager-slice";
import { useNavigate } from "react-router-dom";

export default function MinimalUserOptions({ info, changeVisible, coords, group } : {info: TargetUser, changeVisible: SimpleFunctionType, coords: CoordsProp, group?: string}) {
    if (!info.user) {
        return <></>;
    };
    const [showOptions, setShowOptions] = useState(false);
    const { data, error, isLoading } = useGetUserQuery(info.user);
    const optionsRef = useRef<HTMLDivElement>(null);
    const closeOptions = function closeThisOptionsComponent() {
        setShowOptions(false)
    };

    const dispatch  = useDispatch();
    const navigate = useNavigate();

    useClickOutside(optionsRef, changeVisible);

    const onClickName = function clickingNameInOption() {
        if (!data) {
            return;
        };
        dispatch(setUserId(data.user.id));
        navigate("/users");
    };

    return (
        <div ref={optionsRef} style={{position: "absolute", ...coords}}>
            {isLoading ? (
                <>
                    <div>Loading...</div>
                </>
            ) : error ? (
                <>
                    <div>Error Loading!</div>
                </>
            ) : data && data.user ? (
                <>
                    <img src={data.user.customIcon?.url || data.user.icon.source} alt="" />
                    <StyledName onClick={onClickName} >{data.user.username}</StyledName>
                    <StartConvoButton userid={data.user.id} />
                    <div style={{position: "relative"}}>
                        <div onClick={(e) => {
                            e.stopPropagation();
                            setShowOptions(!showOptions);
                        }}>Options</div>
                        {showOptions && <UserOptions changeVisible={closeOptions} coords={{top: 0, left: 50}} group={group} info={info}  />}
                    </div>
                </>
            ) : (
                <>
                    <div>User Not Found.</div>
                </>
            )
            }

        </div>
    );
};

const StyledName = styled.div`
    &:hover {
        text-decoration-line: underline;
    }
`;