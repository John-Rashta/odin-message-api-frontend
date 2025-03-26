import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLogoutUserMutation, useLazySearchUsersQuery } from "../../features/message-api/message-api-slice";

export default function Header() {
    const [showOptions, setShowOptions] = useState(false);
    const [logoutUser] = useLogoutUserMutation();
    const [searchUser, {usersData}] = useLazySearchUsersQuery({selectFromResult: ({data}) => ({
        usersData: data?.users
    })});
    const navigate = useNavigate();
    ///TODO ADD THE ACTUAL ROUTES-- ADD THE SEARCHING-- MISSING THE COMPONENT TO RENDER
    /// SEARCH RESULTS
    return (
        <header>
            <NavLink to="/">Home</NavLink>
            <NavLink to="">Conversations</NavLink>
            <NavLink to="">Groups</NavLink>
            <div>
                <input type="text" name="searchBar" id="searchBar" onChange={(e) => {
                    if (e.target.value !== "") {
                        searchUser(e.target.value);
                    }
                }} />
                <div style={{position: "absolute"}}></div>
            </div>
            <div style={{position: "absolute"}}>
                {usersData && usersData.map((user) => {
                    return (
                    <div></div>
                )
                })}
            </div>
            <div onClick={() =>  setShowOptions(!showOptions)}>Requests</div>
            {showOptions?  
            <div>
                <NavLink to="">Received</NavLink>
                <NavLink to="">Sent</NavLink>
            </div> : null}
            <NavLink to="">Friends</NavLink>
            <div onClick={() => {
                logoutUser().unwrap().then(() => {
                    navigate("/");
                })
            }}>Logout</div>
        </header>
    )
};