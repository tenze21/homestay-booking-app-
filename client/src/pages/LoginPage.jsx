import { Form, Container, Row, Button, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Container className="w-50 custom-container">
      <h1 className="text-center">Log In</h1>
      <Row>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email" className="my-3">
            <Form.Label className="fw-semibold fs-4">Email Address:</Form.Label>
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
            <Form.Label className="fw-semibold fs-4">Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="xxxxxxxxx"
              value={password}
              size="lg"
              onChange={(e) => setPassword(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          {isLoading ? (
            <Button type="submit" size="lg" className="mt-2 button-custom" disabled>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            </Button>
          ) : (
            <Button type="submit" size="lg" className="mt-2 button-custom">
              Log In
            </Button>
          )}
        </Form>
        <Row className="my-3 text-center fs-5">
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </Row>
      </Row>
    </Container>
  );
};

export default Login;
