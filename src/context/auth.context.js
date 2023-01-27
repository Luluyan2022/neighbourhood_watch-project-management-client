import axios from "axios";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthProviderWrapper(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsloading] = useState(true);
    const [user, setUser] = useState(null);

    const storeToken = (token => {
        localStorage.setItem("authToken", token);
    })

    const authenticateUser = () => {
        const storedToken = localStorage.getItem("authToken");
        if (storedToken) {
            // if the token exists
            axios.get(`${process.env.REACT_APP_API_URL}/auth/verify`, { headers: { Authorization: `Bearer ${storedToken}` } })
                .then((res) => {
                    const user = res.data;
                    setIsLoggedIn(true);
                    setIsloading(false);
                    setUser(user)
                })
                .catch((error) => {
                    setIsLoggedIn(false)
                    setIsloading(false)
                    setUser(user)
                })
        } else {
            // If the token is not available (or is removed)
            setIsLoggedIn(false);
            setIsloading(false);
            setUser(null)
        }
    }
    //logout, remove the token from the localStorage
    const removeToken = () => {
        localStorage.removeItem("authToken");
    }
    const logOutUser = () => {
        removeToken();
        authenticateUser()
    }

    useEffect(() => {
        authenticateUser()
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, isLoading, user, storeToken, authenticateUser, logOutUser }}>
            {props.children}
        </AuthContext.Provider>
    )

}

export { AuthProviderWrapper, AuthContext }