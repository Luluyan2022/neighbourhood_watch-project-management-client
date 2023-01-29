import { useContext } from "react";
import icon from "../images/support.png"
import { AuthContext } from "../context/auth.context"
import Nav from 'react-bootstrap/Nav';
import { Button } from "react-bootstrap";
export default function Navbar() {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
    return (
        <Nav className="justify-content-start" style={{height:'3em', backgroundColor:'#f0f5fb'}} activeKey="/">
            <Nav.Item>
                <img className="mx-5 mt-1" src={icon} alt="icon" style={{width:'2em'}}/>               
            </Nav.Item>
            
            <Nav.Item>
                <Nav.Link id="navLink1" href="/">Home</Nav.Link>               
            </Nav.Item>

             {/* if not loggedin */}
             {!isLoggedIn && (
                <>
                    <Nav.Item>                        
                        <Nav.Link id="navLink" href="/signup" eventKey="link-3">Sign Up</Nav.Link>                        
                    </Nav.Item>
                    <Nav.Item>                        
                        <Nav.Link id="navLink2" href="/login" eventKey="link-4">Login</Nav.Link>                         
                    </Nav.Item>
                </>
            )}

            {/* if is loggedin */}
            {isLoggedIn && (
                <>
                    <Nav.Item>
                        <Nav.Link id="navLink3" href="/discoveries" eventKey="link-1">Discoveries</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link id="navLink4" href="/secondHandGoods" eventKey="link-2">Second-hand-Goods</Nav.Link>
                    </Nav.Item>
                  

                    <div className="d-flex flex-row mt-1">
                        <Nav.Item id="userName" >
                            <span className="mx-3">{user && user.name}</span>
                        </Nav.Item>
                        <Nav.Item>
                            <Button id="navButtonLogout" variant="outline-danger" style={{height:'2em'}} onClick={logOutUser}>Logout</Button>
                        </Nav.Item>                        
                    </div>
                </>
            )}
           
        </Nav>
    )
}