import axios from "axios";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import BCG from "../images/BCG.jpg"

const divStyle = {
    width: '100vw',
    height: '93vh',
    color: '#828484',
    backgroundImage: 'url(' + BCG + ')'
}
const divTwoStyle = {
    width: '25%',
    position: 'absolute',
    right: '35em',
    margin: '5em 8em',
    background: 'rgba(239, 245, 250, 0.95)'
}
const buttonStyle = {
    backgroundColor: '#90d1ec'
}

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleName = (e) => setName(e.target.value);

    const handleSignupSubmit = (e) => {
        e.preventDefault();

        const requestBody = { email, password, name };

        axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, requestBody)
            .then(() => navigate("/login"))
            .catch((e) => { setErrorMessage(e.response.data.message) })
    };    

    return (
        <div id="signup" className="pt-3" style={divStyle}>
            <div className="p-5" style={divTwoStyle}>

                <h1 className="mb-5">Sign Up</h1>

                <Form onSubmit={handleSignupSubmit}>
                
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

                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={name}
                            placeholder="Name"
                            onChange={handleName}
                        />
                    </Form.Group>

                    <Button
                        className="border-0 my-2"
                        variant="primary"
                        type="submit"
                        style={buttonStyle}>
                        Submit
                    </Button>
                </Form>

                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <p>Already have account?</p>

                <Link to={"/login"} className="nav-link text-primary">
                    Login
                </Link>

            </div>
        </div>
    )
}