import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context"

export default function IsAnon({ children }) {

    const { isLoggedIn, isLoading } = useContext(AuthContext);
   
    if (isLoading) {
        return (
            <p>Loading...</p>
        )
    }
    if (isLoggedIn) {
        return (<Navigate to="/" />)
    } else {
        return children;
    }
}