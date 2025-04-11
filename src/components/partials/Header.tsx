import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import SearchResult from "./SearchResult";
import { useLogoutUserMutation, useLazySearchUsersQuery } from "../../features/message-api/message-api-slice";
import { useDispatch } from "react-redux";
import { setMyId, setUserId } from "../../features/manager/manager-slice";
import { ClickType } from "../../../util/types";
import { setAuthState } from "../../features/auth/auth-slice";

export default function Header() {
    const [showOptions, setShowOptions] = useState(false);
    const [logoutUser] = useLogoutUserMutation();
    const [searchValue, setSearchValue] = useState("");
    const [searchUser, {usersData}] = useLazySearchUsersQuery({selectFromResult: ({data}) => ({
        usersData: data?.users
    })});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    ///TODO ADD THE ACTUAL ROUTES-- ADD THE SEARCHING-- MISSING THE COMPONENT TO RENDER
    /// SEARCH RESULTS

    const handleClick = function handleClickingSearchResult(event : ClickType) {
        const target = event.target as HTMLElement;
        const realTarget = target.closest(".searchResult");
        if (!realTarget || !(realTarget instanceof HTMLElement)) {
            return;
        };
        const possibleUser = realTarget.dataset.id;
        if (!possibleUser) {
            return;
        };

        dispatch(setUserId(possibleUser));
        setSearchValue("");
        navigate("/users");
    };

    return (
        <header>
            <NavLink to="/">Home</NavLink>
            <div style={{position: "relative"}}>
                <input type="text" name="searchBar" id="searchBar" value={searchValue} onChange={(e) => {
                    setSearchValue(e.target.value)
                    if (e.target.value !== "") {
                        const he = searchUser(e.target.value);
                    }
                }} />
                {(usersData && searchValue !== "") &&  <div onClick={handleClick} style={{position: "absolute"}}>
                    {usersData.length > 0 ? usersData.map((user) => {
                            return (
                            <SearchResult key={user.id} info={user}/>
                        )
                        }) : <div>No Results Found</div>}
                </div>}
            </div>
            <div onClick={() =>  setShowOptions(!showOptions)}>Requests</div>
            {showOptions &&  
            <div>
                <NavLink to="/requests">Received</NavLink>
                <NavLink to="/requests" state={{type: "SENT"}}>Sent</NavLink>
            </div>}
            <NavLink to="/conversations">Conversations</NavLink>
            <NavLink to="/groups">Groups</NavLink>
            <NavLink to="/friends">Friends</NavLink>
            <NavLink to="/profile">Profile</NavLink>
            <div onClick={() => {
                logoutUser().unwrap().then(() => {
                    location.reload();
                })
            }}>Logout</div>
        </header>
    )
};