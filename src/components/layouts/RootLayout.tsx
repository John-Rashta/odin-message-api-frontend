import { selectAuthState } from "../../features/auth/auth-slice";
import { useSelector } from "react-redux";
import DefaultHeader from "../partials/DefaultHeader";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../partials/Footer";
import Header from "../partials/Header";
import { defaultPaths } from "../../../util/globalValues";
import HomePage from "../partials/HomePage";

export default function RootLayout() {
    const authState = useSelector(selectAuthState);
    const { pathname } = useLocation();

    return (
        <div>
            {authState ? <Header /> : <DefaultHeader />}
            {!authState && !defaultPaths.includes(pathname) ? <HomePage /> : <Outlet />}
            <Outlet />
            <Footer />
        </div>
    );
};