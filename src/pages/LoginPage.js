import axios from "axios";
import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context"
import loginImage from "../images/login.png"

const divStyle = {
    width: '100vw',
    color: '#828484',
    height: '93vh',
    backgroundImage: 'url(' + loginImage + ')',
    backgroundSize: 'cover'
}
const divTwoStyle = {
    position: 'absolute',
    left: '11%',
    top: '10em',
    width: '25%'
}
const buttonStyle = {
    backgroundColor: '#ff7c00'
}

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();

    const { storeToken, authenticateUser } = useContext(AuthContext);

    const handleEmail = (event) => setEmail(event.target.value);
    const handlePassword = (event) => setPassword(event.target.value)
    const handleLoginSubmit = (event) => {
        event.preventDefault();
        const requestBody = { email, password };
        axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, requestBody)
            .then((res) => {
                storeToken(res.data.authToken);
                authenticateUser();
                navigate("/");
            })
            .catch((e) => {
                const errorDescription = e.response.data.message;
                setErrorMessage(errorDescription);
            })
    }
   
    return (
        <div className="pt-5 position-relative" style={divStyle}>
            <div style={divTwoStyle}>
                <h1 className="mb-5">Login</h1>
                <Form onSubmit={handleLoginSubmit}>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Enter email"
                            onChange={handleEmail} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Password"
                            onChange={handlePassword}
                        />
                    </Form.Group>

                    <Button className="border-0 my-2" type="submit" style={buttonStyle}>
                        Submit
                    </Button>
                </Form>

                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <p>Don't have an account yet</p>

                <Link to={"/signup"} className="nav-link text-primary">
                    Sign Up
                </Link>

            </div>
        </div>
    )
}