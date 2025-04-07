import RootLayout from "./components/layouts/RootLayout";
import { IndexRouteObject, NonIndexRouteObject } from "react-router-dom";
import HomePage from "./components/partials/HomePage";
import Conversations from "./components/partials/Conversations";
import Groups from "./components/partials/Groups";
import AllRequests from "./components/partials/AllRequests";
import Friends from "./components/partials/Friends";
import UserProfile from "./components/partials/UserProfile";
import MyProfile from "./components/partials/MyProfile";
import Login from "./components/partials/Login";
import SignUp from "./components/partials/SignUp";
import ChangePassword from "./components/partials/ChangePassword";

const routes : (IndexRouteObject | NonIndexRouteObject)[] = [
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "users",
                element: <UserProfile />,
            },
            {
                path: "friends",
                element: <Friends />,
            },
            {
                path: "password",
                element: <ChangePassword />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "signup",
                element: <SignUp />,
            },
            {
                path: "profile",
                element: <MyProfile />,
            },
            {
                path: "requests",
                element: <AllRequests />,
            },
            {
                path: "conversations",
                element: <Conversations />,
            },
            {
                path: "groups",
                element: <Groups />,
            },
        ]
    }
];

export default routes;