import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function NavMenu() {
    const [openState, setOpenState] = useState(false);

    return (
        <div>
            <button onClick={() =>  setOpenState(!openState)}>Open</button>
            {openState && 
            <nav>
                <NavLink to="">Conversations</NavLink>
                <NavLink to="">Groups</NavLink>
                <NavLink to="">Friends</NavLink>
            </nav> 
            }
        </div>
    )
};