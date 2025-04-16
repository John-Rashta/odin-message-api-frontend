import { NavLink } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import { navMenuValue, StyledNavLink } from "../../../util/style";
import { Ellipsis } from "lucide-react";

export default function NavMenu() {
    const [openState, setOpenState] = useState(false);

    return (
        <div>
            <StyledButton onClick={() =>  setOpenState(!openState)}><Ellipsis /></StyledButton>
            {openState && 
            <StyledNav>
                <StyledNavLink to="">Conversations</StyledNavLink>
                <StyledNavLink to="">Groups</StyledNavLink>
                <StyledNavLink to="">Friends</StyledNavLink>
            </StyledNav> 
            }
        </div>
    )
};

const StyledNav = styled.nav`
    position: absolute;
`;

const StyledButton = styled.button`

@media only screen and (min-width: ${navMenuValue}) {
    display: none;
}
`;