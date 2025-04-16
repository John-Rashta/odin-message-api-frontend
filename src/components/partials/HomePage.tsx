import { selectAuthState } from "../../features/auth/auth-slice";
import { useSelector} from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

export default function HomePage() {
    const authState = useSelector(selectAuthState);
    return (
        <StyledMain>
            {authState ? <p>Welcome to Odin Message App!</p> : <p>Join us by signing up <NavLink to="/signup">here</NavLink>!</p> }
        </StyledMain>
    )
};


const StyledMain = styled.main`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
`