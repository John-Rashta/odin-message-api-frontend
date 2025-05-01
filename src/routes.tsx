import RootLayout from "./components/layouts/RootLayout";
import { IndexRouteObject, NonIndexRouteObject } from "react-router-dom";
import HomePage from "./components/defaults/HomePage";
import Conversations from "./components/conversations/Conversations";
import Groups from "./components/groups/Groups";
import AllRequests from "./components/requests/AllRequests";
import Friends from "./components/friends/Friends";
import UserProfile from "./components/profiles/UserProfile";
import MyProfile from "./components/profiles/MyProfile";
import Login from "./components/defaults/Login";
import SignUp from "./components/defaults/SignUp";
import ChangePassword from "./components/partials/ChangePassword";

const routes: (IndexRouteObject | NonIndexRouteObject)[] = [
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
    ],
  },
];

export default routes;
