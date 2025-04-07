import { selectAuthState } from "../../features/auth/auth-slice";
import { useSelector} from "react-redux";
import { NavLink } from "react-router-dom";

export default function HomePage() {
    const authState = useSelector(selectAuthState);
    return (
        <main>
            {authState ? <p>Welcome to Odin Message App!</p> : <p>Join us by signing up <NavLink to="/signup">here</NavLink>!</p> }
        </main>
    )
}