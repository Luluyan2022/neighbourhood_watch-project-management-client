import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav>
            <Link to="/">
                <button>Home Page</button>
            </Link>
            <Link to="/discoveries">
                <button>Discoveries</button>
            </Link>
            <Link to="/secondHandGoods">
                <button>Second-hand-Goods</button>
            </Link>
        </nav>
    )
}