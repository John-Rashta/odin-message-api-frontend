import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import SearchResult from "./SearchResult";
import { useLogoutUserMutation, useLazySearchUsersQuery } from "../../features/message-api/message-api-slice";
import { useDispatch } from "react-redux";
import { setUserId } from "../../features/manager/manager-slice";
import { ClickType } from "../../../util/types";
import styled from "styled-components";
import { headerBackgroundColor, headerPadding, navMenuValue } from "../../../util/style";
import NavMenu from "./NavMenu";
import { StyledNavLink } from "../../../util/style";


export default function Header() {
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
        <StyledHeader>
            <StyledNav>
                <StyledNavLink to="/">Home</StyledNavLink>
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
                <StyledNavLink to="/requests">Requests</StyledNavLink>
                <StyledExtraGroup>
                    <StyledNavLink to="/conversations">Conversations</StyledNavLink>
                    <StyledNavLink to="/groups">Groups</StyledNavLink>
                    <StyledNavLink to="/friends">Friends</StyledNavLink>
                </StyledExtraGroup>
                <NavMenu />
                <StyledNavLink to="/profile">Profile</StyledNavLink>
                <div onClick={() => {
                    logoutUser().unwrap().then(() => {
                        location.reload();
                    })
                }}>Logout</div>
            </StyledNav>
        </StyledHeader>
    )
};

const StyledExtraGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 3px;
    @media only screen and (max-width: ${navMenuValue}) {
        display: none;
    }
`;

const StyledNav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const StyledHeader = styled.header`
    background-color: ${headerBackgroundColor};
    padding: ${headerPadding};
`;