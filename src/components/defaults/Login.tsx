import React, { useState } from "react";
import { setMyId } from "../../features/manager/manager-slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../features/message-api/message-api-slice";
import isAscii from "validator/lib/isAscii";
import isAlphanumeric from "validator/lib/isAlphanumeric";
import { setAuthState } from "../../features/auth/auth-slice";
import {
  StyledButton,
  StyledForm,
  StyledContainer,
  StyledWrongInput,
  StyledInput,
  StyledDivFlex,
} from "../../../util/style";

export default function Login() {
  const [loginUser] = useLoginUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [wrongInputs, setWrongInputs] = useState(false);

  const handleForm = function handleFormSubmitting(event: React.FormEvent) {
    event.preventDefault();
    const currentTarget = event.target as HTMLFormElement;
    const username = currentTarget.username.value;
    const password = currentTarget.password.value;
    if (!isAlphanumeric(username) || !isAscii(password)) {
      setWrongInputs(true);
      return;
    }

    loginUser({ username, password })
      .unwrap()
      .then((result) => {
        dispatch(setMyId(result.id));
        dispatch(setAuthState(true));
        navigate("/");
      })
      .catch(() => {
        setWrongInputs(true);
      });
  };

  return (
    <main>
      <StyledContainer>
        <StyledForm onSubmit={handleForm}>
          {wrongInputs ? (
            <StyledWrongInput>Username or Password wrong!</StyledWrongInput>
          ) : null}
          <label htmlFor="username">Username:</label>
          <StyledInput type="text" name="username" id="username" required />
          <label htmlFor="password">Password:</label>
          <StyledInput type="password" name="password" id="password" required />
          <StyledButton type="submit">Login</StyledButton>
        </StyledForm>
      </StyledContainer>
    </main>
  );
}
