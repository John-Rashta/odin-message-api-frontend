import { selectAuthState, setAuthState } from "../../features/auth/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import DefaultHeader from "../partials/DefaultHeader";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../partials/Footer";
import Header from "../partials/Header";
import { defaultPaths } from "../../../util/globalValues";
import HomePage from "../partials/HomePage";
import styled, { createGlobalStyle } from "styled-components";
import { selectMyId, setMyId } from "../../features/manager/manager-slice";
import { useGetSelfQuery } from "../../features/message-api/message-api-slice";
import { useEffect } from "react";
import { mainBackgroundColor } from "../../../util/style";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0px;
    }

    #root {
        font-family: Times, "Times New Roman", Georgia, serif;
    }

    main,
    #root,
    body,
    html {
        height: 100%;
        background-color: ${mainBackgroundColor};
    }

    img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
`;

export default function RootLayout() {
    const authState = useSelector(selectAuthState);
    const dispatch = useDispatch();
    const myId = useSelector(selectMyId);
    const { pathname } = useLocation();
    const { data } = useGetSelfQuery();

    useEffect(() => {
        const checkSession = function checkIfActiveSession() {
            if (data) {
                if (data.user.id === myId) {
                    return;
                };

                dispatch(setMyId(data.user.id));
                dispatch(setAuthState(true));
            }
        }

        checkSession();
    },[data]);

    return (
        <StyledDiv>
            <GlobalStyle />
            {authState ? <Header /> : <DefaultHeader />}
            {!authState && !defaultPaths.includes(pathname) ? <HomePage /> : authState && defaultPaths.includes(pathname) ? <HomePage /> : <Outlet />}
            <Footer />
        </StyledDiv>
    );
};

const StyledDiv = styled.div`
    min-height: 100%;
    position: relative;
    display: grid;
    grid-template-rows: auto 1fr auto;
`