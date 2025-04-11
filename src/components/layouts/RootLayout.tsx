import { selectAuthState } from "../../features/auth/auth-slice";
import { useSelector } from "react-redux";
import DefaultHeader from "../partials/DefaultHeader";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../partials/Footer";
import Header from "../partials/Header";
import { defaultPaths } from "../../../util/globalValues";
import HomePage from "../partials/HomePage";

import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0px;
    }

    #root {
        height: 100%;
        font-family: Times, "Times New Roman", Georgia, serif;
    }

    html {
        height: 100%;
    }

    body {
        height: 100%;
    }

    img {
        width: 50px;
        height: 50px;
    }
`;

export default function RootLayout() {
    const authState = useSelector(selectAuthState);
    const { pathname } = useLocation();

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
`