import axios from "axios";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

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
       
        const requestBody={email, password, name};
       
       axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, requestBody)
            .then(() => navigate("/login"))
            .catch((e) => {setErrorMessage(e.response.data.message)})
     };

    return (
        <div>
            <h1>Sign Up</h1>
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
                
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                    type="text" 
                    name="name"
                    value={name}
                    placeholder="Name"
                    onChange={handleName}
                     />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <p>Already have account?</p>
            <Link to={"/login"}>Login</Link>
        </div>
    )
}