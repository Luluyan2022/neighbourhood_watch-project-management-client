import { useContext } from "react";
import icon from "../images/support.png"
import { AuthContext } from "../context/auth.context"
import Nav from 'react-bootstrap/Nav';
import { Button } from "react-bootstrap";

export default function Navbar() {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

    const navStyle = {
        height: '3em',
        backgroundColor: '#f0f5fb'
    }
    const imgStyle = {
        width: '2em'
    }
    const navLinkStyle = {
        fontWeight: 'bold',
        color: '#828484'
    }
    const userNameStyle = {
        paddingTop: '0.2em',
        fontFamily: 'cursive',
        position: 'absolute',
        right: '15em'
    }
    const buttonStyle = {
        position: 'absolute',
        right: '8em',
        paddingTop: '0.1em',
        height: '2em'
    }
    return (
        <Nav
            className="justify-content-start"
            style={navStyle}
            activeKey="/">

            <Nav.Item>
                <img
                    className="mx-5 mt-1"
                    src={icon}
                    alt="icon"
                    style={imgStyle} />
            </Nav.Item>

            <Nav.Item>
                <Nav.Link style={navLinkStyle} href="/">
                    Home
                </Nav.Link>
            </Nav.Item>

            {/* if not loggedin */}
            {!isLoggedIn && (
                <>
                    <Nav.Item>
                        <Nav.Link
                            style={navLinkStyle}
                            href="/signup"
                            eventKey="link-3">
                            Sign Up
                        </Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Link
                            style={navLinkStyle}
                            href="/login"
                            eventKey="link-4">
                            Login
                        </Nav.Link>
                    </Nav.Item>
                </>
            )}

            {/* if is loggedin */}
            {isLoggedIn && (
                <>
                    <Nav.Item>
                        <Nav.Link
                            style={navLinkStyle}
                            href="/discoveries"
                            eventKey="link-1">
                            Discoveries
                        </Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Link
                            style={navLinkStyle}
                            href="/secondHandGoods"
                            eventKey="link-2">
                            Second-hand-Goods
                        </Nav.Link>
                    </Nav.Item>


                    <div className="d-flex flex-row mt-1">

                        <Nav.Item style={userNameStyle} >
                            <span className="mx-3">{user && user.name}</span>
                        </Nav.Item>

                        <Nav.Item>
                            <Button
                                variant="outline-danger"
                                style={buttonStyle}
                                onClick={logOutUser}>
                                Logout
                            </Button>
                        </Nav.Item>

                    </div>
                </>
            )}

        </Nav>
    )
}