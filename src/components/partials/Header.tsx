import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import SearchResult from "./SearchResult";
import { useLogoutUserMutation, useLazySearchUsersQuery } from "../../features/message-api/message-api-slice";
import { useDispatch } from "react-redux";
import { setUserId } from "../../features/manager/manager-slice";
import { ClickType } from "../../../util/types";

export default function Header() {
    const [showOptions, setShowOptions] = useState(false);
    const [logoutUser] = useLogoutUserMutation();
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
        navigate("/users");
    };

    return (
        <header>
            <NavLink to="/">Home</NavLink>
            <div>
                <input type="text" name="searchBar" id="searchBar" onChange={(e) => {
                    if (e.target.value !== "") {
                        const he = searchUser(e.target.value);
                    }
                }} />
                {usersData &&  <div onClick={handleClick} style={{position: "absolute"}}>
                    {usersData.length > 0 ? usersData.map((user) => {
                            return (
                            <SearchResult info={user}/>
                        )
                        }) : <div>No Results Found</div>}
                </div>}
            </div>
            <div onClick={() =>  setShowOptions(!showOptions)}>Requests</div>
            {showOptions &&  
            <div>
                <NavLink to="">Received</NavLink>
                <NavLink to="">Sent</NavLink>
            </div>}
            <NavLink to="">Conversations</NavLink>
            <NavLink to="">Groups</NavLink>
            <NavLink to="">Friends</NavLink>
            <div onClick={() => {
                logoutUser().unwrap().then(() => {
                    navigate("/");
                })
            }}>Logout</div>
        </header>
    )
};