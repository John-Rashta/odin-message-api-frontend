import { useGetUserQuery } from "../../../features/message-api/message-api-slice";
import { TargetUser, CoordsProp } from "../../../../util/interfaces";
import { SimpleFunctionType } from "../../../../util/types";
import StartConvoButton from "../StartConvoButton";
import { useState, useRef } from "react";
import UserOptions from "./UserOptions";
import useClickOutside from "../../../../util/useClickOutside";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setUserId } from "../../../features/manager/manager-slice";
import { useNavigate } from "react-router-dom";

export default function MinimalUserOptions({
  info,
  changeVisible,
  coords,
  group,
}: {
  info: TargetUser;
  changeVisible: SimpleFunctionType;
  coords: CoordsProp;
  group?: string;
}) {
  if (!info.user) {
    return <></>;
  }
  const [showOptions, setShowOptions] = useState(false);
  const { data, error, isLoading } = useGetUserQuery(info.user);
  const optionsRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useClickOutside(optionsRef, changeVisible);

  const onClickName = function clickingNameInOption() {
    if (!data) {
      return;
    }
    dispatch(setUserId(data.user.id));
    navigate("/users");
  };

  return (
    <StyledMiniOptions
      className="userOptions"
      onClick={(e) => e.stopPropagation()}
      ref={optionsRef}
      style={{ ...coords }}
    >
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
          <img
            src={data.user.customIcon?.url || data.user.icon.source}
            alt=""
          />
          <StyledName onClick={onClickName}>{data.user.username}</StyledName>
          <StyleStartConvo userid={data.user.id} />
          <div style={{ position: "relative" }}>
            <StyleBottomOptions
              onClick={(e) => {
                e.stopPropagation();
                setShowOptions(!showOptions);
              }}
            >
              Options
            </StyleBottomOptions>
            {showOptions && (
              <UserOptions
                changeVisible={() => null}
                coords={{ top: 0, left: 50 }}
                group={group}
                info={info}
              />
            )}
          </div>
        </>
      ) : (
        <>
          <div>User Not Found.</div>
        </>
      )}
    </StyledMiniOptions>
  );
}

const StyledName = styled.div`
  cursor: pointer;
  font-weight: bold;
  &:hover {
    text-decoration-line: underline;
  }
`;

const StyledMiniOptions = styled.div`
  z-index: 4;
  padding: 10px;
  background-color: rgb(138, 175, 209);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border: solid 2px;
  border-radius: 10px;
  font-size: 1.1rem;
  position: absolute;
`;

const StyleBottomOptions = styled.div`
  background-color: rgb(172, 201, 209);
  padding: 3px 6px;
  border-radius: 5px;
  cursor: default;
  &:hover {
    background-color: rgb(139, 204, 223);
  }
`;

const StyleStartConvo = styled(StartConvoButton)`
  padding: 3px 5px;
  background-color: rgb(164, 223, 240);
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  font-family: "Times New Roman";
  &:hover {
    background-color: rgb(17, 170, 212);
  }
`;
