import { Form, Container, Row, Button } from "react-bootstrap";
import { useState } from "react";
const Login=()=>{

    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');

    const submitHandler=()=>{
        console.log("submit");
    }

    return(
        <Container className="w-50 custom-container">
            <h1 className="text-center">Log In</h1>
            <Row>
                <Form onSubmit={submitHandler}>
                <Form.Group controlId="email" className="my-3">
                <Form.Label className="fw-semibold fs-4">
                    Email Address:
                </Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    size="lg"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                ></Form.Control>
                </Form.Group>
                <Form.Group controlId="password" className="my-3">
                <Form.Label className="fw-semibold fs-4">
                    Password:
                </Form.Label>
                <Form.Control
                    type="email"
                    placeholder="xxxxxxxxx"
                    value={password}
                    size="lg"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                ></Form.Control>
                </Form.Group>
                <Button type="submit" className="w-50 fs-5 mt-3 fw-semibold button-custom">Log In</Button>
                </Form>
            </Row>
        </Container>
    )
}

export default Login;