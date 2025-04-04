import { selectAuthState } from "../../features/auth/auth-slice";
import { useSelector } from "react-redux";
export default function RootLayout() {
    const authState = useSelector(selectAuthState);

    ///TODO SHOULD RETURN A DIFERENT HEADER AND MAYBE BODY COMPONENT
    if (!authState) {
        return;
    }



    return (
        <>
        </>
    )
};