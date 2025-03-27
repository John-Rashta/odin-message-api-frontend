import { NavLink } from "react-router-dom";

export default function DefaultHeader() {
    return (
        <header>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
        </header>
    )
};