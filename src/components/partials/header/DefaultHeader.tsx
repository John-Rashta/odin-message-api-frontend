import styled from "styled-components";
import { headerBackgroundColor, headerHeight, headerPadding, StyledNavLink } from "../../../../util/style";

export default function DefaultHeader() {
    return (
        <StyledHeader>
            <StyledNavLink to="/">Home</StyledNavLink>
            <StyledNavContainer>
                <StyledNavLink to="/login">Login</StyledNavLink>
                <StyledNavLink to="/signup">Sign Up</StyledNavLink>
            </StyledNavContainer>
        </StyledHeader>
    )
};


const StyledHeader = styled.header`
    background-color: ${headerBackgroundColor};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${headerPadding};
    font-size: 1.3rem;
    max-height: ${headerHeight};
    height: ${headerHeight};
`;

const StyledNavContainer = styled.div`
    display: flex;
    gap: 10px;
`;