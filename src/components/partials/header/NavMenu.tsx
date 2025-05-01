import { useState } from "react";
import styled from "styled-components";
import { navMenuValue, StyledNavLink } from "../../../../util/style";
import { Ellipsis } from "lucide-react";

export default function NavMenu() {
  const [openState, setOpenState] = useState(false);

  return (
    <StyledDiv>
      <StyledButton onClick={() => setOpenState(!openState)}>
        <Ellipsis />
      </StyledButton>
      {openState && (
        <StyledNav onClick={() => setOpenState(false)}>
          <StyledNavLink to="/conversations">Conversations</StyledNavLink>
          <StyledNavLink to="/groups">Groups</StyledNavLink>
          <StyledNavLink to="/friends">Friends</StyledNavLink>
        </StyledNav>
      )}
    </StyledDiv>
  );
}

const StyledNav = styled.nav`
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: rgb(212, 208, 208);
`;

const StyledDiv = styled.div`
  @media only screen and (min-width: ${navMenuValue}) {
    display: none;
  }
`;

const StyledButton = styled.button`
  background-color: rgb(223, 220, 220);
`;
