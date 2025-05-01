import { TargetUser, CoordsProp } from "../../../../util/interfaces";
import { SimpleFunctionType, ClickType } from "../../../../util/types";
import {
  setUserId,
  setConversationId,
} from "../../../features/manager/manager-slice";
import { useDispatch } from "react-redux";
import {
  useCreateConversationMutation,
  useMakeRequestMutation,
  useUpdateGroupMutation,
  useDeleteFriendMutation,
  useGetGroupsQuery,
} from "../../../features/message-api/message-api-slice";
import { useRef, useState } from "react";
import useClickOutside from "../../../../util/useClickOutside";
import { useNavigate } from "react-router-dom";
import GroupSelection from "./GroupSelection";
import styled from "styled-components";

export default function UserOptions({
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
  const [showOptions, setShowOptions] = useState(false);
  const dispatch = useDispatch();
  const { groupsData } = useGetGroupsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      groupsData: data?.user.groups,
    }),
  });
  const [makeRequest] = useMakeRequestMutation();
  const [changeGroup] = useUpdateGroupMutation();
  const [deleteFriend] = useDeleteFriendMutation();
  const [createConvo] = useCreateConversationMutation();
  const optionsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  useClickOutside(optionsRef, changeVisible);

  const groupOptions = function GroupOptionsToDisplay() {
    return (
      <>
        <StyledTextOptions data-type="REMOVEGROUP">
          Remove From Group
        </StyledTextOptions>
        {info.admin ? (
          <StyledTextOptions data-type="DEMOTEGROUP">Demote</StyledTextOptions>
        ) : (
          <StyledTextOptions data-type="PROMOTEGROUP">
            Promote
          </StyledTextOptions>
        )}
      </>
    );
  };

  const handleClick = function handleClickingAnOption(event: ClickType) {
    event.stopPropagation();
    const currentTarget = event.target as HTMLDivElement;
    const possibleType = currentTarget.dataset.type;
    if (!info.user) {
      return;
    }
    if (possibleType === "PROFILE") {
      dispatch(setUserId(info.user));
      navigate("/users");
    } else if (possibleType === "ADDFRIEND") {
      makeRequest({ targetid: info.user, type: "FRIEND" })
        .unwrap()
        .then(() => {
          changeVisible();
        })
        .catch((response) => {
          if (response.data.message === "Request Already Sent") {
            console.log(response.data);
            currentTarget.textContent = "Already Sent";
            delete currentTarget.dataset.type;
          }

          if (response.data.message === "Already Friends") {
            currentTarget.textContent = "Already Friends";
            delete currentTarget.dataset.type;
          }
        });
    } else if (possibleType === "REMOVEFRIEND") {
      deleteFriend({ id: info.user })
        .unwrap()
        .then(() => {
          changeVisible();
        })
        .catch();
    } else if (possibleType === "STARTCONVO") {
      createConvo({ targetid: info.user })
        .unwrap()
        .then((response) => {
          dispatch(setConversationId(response.conversation));
          navigate("/conversations");
        })
        .catch();
    } else if (possibleType === "REMOVEGROUP") {
      if (!group) {
        return;
      }
      changeGroup({
        id: group,
        info: {
          targetid: info.user,
          action: "REMOVE",
        },
      });
    } else if (possibleType === "PROMOTEGROUP") {
      if (!group) {
        return;
      }
      changeGroup({
        id: group,
        info: {
          targetid: info.user,
          action: "PROMOTE",
        },
      })
        .unwrap()
        .then(() => {
          currentTarget.textContent = "Demote";
          currentTarget.dataset.type = "DEMOTEGROUP";
        })
        .catch();
    } else if (possibleType === "DEMOTEGROUP") {
      if (!group) {
        return;
      }
      changeGroup({
        id: group,
        info: {
          targetid: info.user,
          action: "DEMOTE",
        },
      })
        .unwrap()
        .then(() => {
          currentTarget.textContent = "Promote";
          currentTarget.dataset.type = "PROMOTEGROUP";
        })
        .catch();
    }
  };

  return (
    <StyledOptions
      className="userOptions"
      ref={optionsRef}
      style={{ ...coords }}
      onClick={handleClick}
    >
      <StyledTextOptions data-type="PROFILE">Profile</StyledTextOptions>
      {info.friend ? (
        <StyledTextOptions data-type="REMOVEFRIEND">
          Remove Friend
        </StyledTextOptions>
      ) : (
        <StyledTextOptions data-type="ADDFRIEND">Add Friend</StyledTextOptions>
      )}
      <StyledTextOptions data-type="STARTCONVO">
        Start Conversation
      </StyledTextOptions>
      {group && groupOptions()}
      <div
        onMouseEnter={() => setShowOptions(true)}
        onMouseLeave={() => setShowOptions(false)}
        style={{ position: "relative" }}
      >
        <StyledTextOptions>Invite to Groups</StyledTextOptions>
        {showOptions && (
          <GroupSelection
            userid={info.user}
            hideMe={() => setShowOptions(false)}
            groupsData={groupsData}
          />
        )}
      </div>
    </StyledOptions>
  );
}

const StyledOptions = styled.div`
  position: absolute;
  padding: 8px;
  background-color: rgb(131, 208, 231);
  z-index: 5;
  font-size: 1rem;
  font-family: Times;
  border: 2px solid;
`;

const StyledTextOptions = styled.div`
  font-size: 1.1rem;
  padding: 2px;
  &:hover {
    background-color: rgb(61, 184, 221);
  }
`;
