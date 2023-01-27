import { useContext } from "react";
import { Link } from "react-router-dom";
import {AuthContext} from "../context/auth.context"

export default function Navbar() {
    const {isLoggedIn, user, logOutUser} = useContext(AuthContext);
    return (
        <nav>
            <Link to="/">
                <button>Home Page</button>
            </Link>
            {/* if is loggedin */}
            {isLoggedIn && (
                <div>
                    <Link to="/discoveries">
                        <button>Discoveries</button>
                    </Link>

                    <Link to="/secondHandGoods">
                        <button>Second-hand-Goods</button>
                    </Link>

                    <button onClick={logOutUser}>Logout</button>
                    <span>{user && user.name}</span>
                </div>
            )}
            {/* if not loggedin */}
            {!isLoggedIn && (
                <div>
                    <Link to="/signup">
                        <button>Sign Up</button>
                    </Link>
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                </div>

            )}
        </nav>
    )
}