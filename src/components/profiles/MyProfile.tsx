import { useState } from "react";
import {
  useGetSelfQuery,
  useUpdateMeMutation,
  useGetIconsQuery,
} from "../../features/message-api/message-api-slice";
import { ButtonClickType, ClickType, FormType } from "../../../util/types";
import { useNavigate } from "react-router-dom";
import ChangeTextFields from "../partials/ChangeTextFields";
import styled from "styled-components";
import {
  aboutMeStyle,
  StyledExtraMessage,
  StyledProfileImg,
  StyledProfileMain,
} from "../../../util/style";
import { format } from "date-fns";

export default function MyProfile() {
  const { data, error, isLoading } = useGetSelfQuery();
  const [invalidSize, setInvalidSize] = useState(false);
  const [failedUpload, setFailedUpload] = useState(false);
  const [iconOptions, setIconOptions] = useState(false);
  const [updateMe] = useUpdateMeMutation();
  const {
    data: iconData,
    error: iconError,
    isLoading: iconLoading,
  } = useGetIconsQuery();
  const navigate = useNavigate();

  const handleSubmitImage = function handleSubmitingImage(event: FormType) {
    event.preventDefault();
    event.stopPropagation();
    const target = event.target as HTMLFormElement;
    if (target.imageInput.files.length === 0) {
      return;
    }

    const currentFile = target.imageInput.files[0] as File;
    if (Number((currentFile.size / 1024 / 1024).toFixed(4)) > 5) {
      if (!invalidSize) {
        setTimeout(() => {
          setInvalidSize(false);
        }, 5000);
      }
      setInvalidSize(true);
      return;
    }

    const newForm = new FormData();
    newForm.append("uploaded_file", currentFile);
    updateMe(newForm)
      .unwrap()
      .then()
      .catch(() => {
        if (!failedUpload) {
          setTimeout(() => {
            setFailedUpload(false);
          }, 5000);
        }
        setFailedUpload(true);
      })
      .finally(() => {
        target.reset();
      });
  };

  const handleChangePassword = function handleClickingChangePassword(
    event: ButtonClickType,
  ) {
    event.stopPropagation();
    navigate("/password");
  };

  const handleClickIconOption = function handleClickingIconOption(
    event: ClickType,
  ) {
    event.stopPropagation();
    const target = event.target as HTMLDivElement;
    if (target.dataset.type === "ICONOPTION") {
      const possibleId = target.dataset.iconid;
      if (!possibleId) {
        return;
      }
      const newForm = new FormData();
      newForm.append("icon", possibleId);
      updateMe(newForm);
      setIconOptions(false);
    }
  };

  return (
    <StyledMain>
      {isLoading ? (
        <StyledExtraMessage>Loading...</StyledExtraMessage>
      ) : error ? (
        <StyledExtraMessage>Error Loading!</StyledExtraMessage>
      ) : data && data.user ? (
        <>
          <StyledTopContainer>
            <StyledProfileImg
              src={data.user.customIcon?.url || data.user.icon.source}
              alt=""
            />
            <StyledTopOptions>
              <StyledForm
                onSubmit={handleSubmitImage}
                onClick={(e) => e.stopPropagation()}
              >
                <StyledInnerForm>
                  <StyledFileDiv>
                    <StyledImgLabel htmlFor="imageInput">
                      Choose image for icon(max 5MB)
                    </StyledImgLabel>
                    <StyledInputFile
                      type="file"
                      id="imageInput"
                      name="imageInput"
                      accept=".png,.webp,.jpeg,.jpg"
                    />
                  </StyledFileDiv>
                  <StyledSubmit type="submit">Submit</StyledSubmit>
                  <StyledFirstError>
                    {failedUpload && <div>Failed to upload.</div>}
                    {invalidSize && <div>Size Over Limit!</div>}
                  </StyledFirstError>
                </StyledInnerForm>
              </StyledForm>
              <StyledIconsDiv onClick={handleClickIconOption}>
                <StyledIconButton onClick={() => setIconOptions(!iconOptions)}>
                  Icons
                </StyledIconButton>
                {iconOptions && iconData && (
                  <StyledIconsDisplay>
                    {iconData.icons.map((icon) => {
                      return (
                        <img
                          key={icon.id}
                          src={icon.source}
                          alt=""
                          data-iconid={icon.id}
                          data-type="ICONOPTION"
                        />
                      );
                    })}
                  </StyledIconsDisplay>
                )}
              </StyledIconsDiv>
            </StyledTopOptions>
          </StyledTopContainer>
          <StyledTextDivs>
            <StyledTextLabels>Username:</StyledTextLabels>
            <ChangeTextFields
              fieldname="username"
              myData={data.user}
              updater={updateMe}
            />
          </StyledTextDivs>
          <StyledTextDivs>
            <StyledTextLabels>Name:</StyledTextLabels>
            <ChangeTextFields
              fieldname="name"
              myData={data.user}
              updater={updateMe}
            />
          </StyledTextDivs>
          <StyledChangePw onClick={handleChangePassword}>
            Change Password
          </StyledChangePw>
          <StyledTextDivs>
            <div>About Me:</div>
            <StyledChangeFields
              fieldname="aboutMe"
              myData={data.user}
              updater={updateMe}
              area={true}
            />
          </StyledTextDivs>
          <div>Joined: {format(data.user.joinedAt, "MM/dd/yyyy")}</div>
          <div>User ID: {data.user.id}</div>
        </>
      ) : (
        <StyledExtraMessage>Something went wrong...</StyledExtraMessage>
      )}
    </StyledMain>
  );
}

const StyledInputFile = styled.input`
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
`;

const StyledFileDiv = styled.div`
  position: relative;
`;

const StyledMain = styled(StyledProfileMain)``;

const StyledTopContainer = styled.div`
  display: flex;
`;

const StyledTopOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledIconsDiv = styled.div`
  position: relative;
  align-self: center;
`;

const StyledIconsDisplay = styled.div`
  position: absolute;
  padding: 5px;
  background-color: rgb(255, 255, 255);
  text-align: center;
  border: 1px solid;
  max-width: 250px;
  width: 250px;
  z-index: 5;
`;

const StyledImgLabel = styled.label`
  background-color: rgb(108, 202, 211);
  padding: 10px;
  border: 2px solid;
`;

const StyledInnerForm = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledTextDivs = styled.div`
  display: flex;
  gap: 5px;
`;

const StyledChangeFields = styled(ChangeTextFields)`
  div {
    ${aboutMeStyle}
    padding: 5px;
  }

  textarea {
    ${aboutMeStyle}
    max-width: 400px;
    background-color: rgb(196, 248, 255);
    padding: 5px;
  }
`;

const StyledTextLabels = styled.div`
  align-self: center;
`;

const StyledFirstError = styled.div`
  position: absolute;
  top: 150%;
  left: 5px;
  color: rgb(204, 5, 5);
`;

const StyledForm = styled.form`
  position: relative;
`;

const StyledChangePw = styled.button`
  padding: 3px 5px;
  border: solid 1px black;
  background-color: rgb(152, 199, 206);
  font-weight: bold;
  &:hover {
    background-color: rgb(30, 160, 180);
  }
`;

const StyledSubmit = styled.button`
  padding: 4px 8px;
  border-radius: 10px;
  border: 1px solid rgb(1, 146, 168);
  background-color: rgb(108, 175, 219);
  font-weight: bold;
  &:hover {
    background-color: rgb(172, 189, 201);
  }
`;

const StyledIconButton = styled.button`
  padding: 5px;
  border-radius: 5px;
  border: 1px solid;
  background-color: rgb(149, 193, 255);
  &:hover {
    background-color: rgb(166, 215, 255);
  }
`;
