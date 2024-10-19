import { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container, InputGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import axios from "axios";
import "../assets/styles/form.css";
import CountriesList from "../components/CountriesList";
import StatesList from "../components/StatesList";

const SignupScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // for country and state
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [countries, setCountries] = useState([]);
  const [userCountry, setUserCountry] = useState("");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [states, setStates] = useState([]);
  const [userState, setUserState] = useState("");

  useEffect(() => {
    var config = {
      method: "get",
      url: `https://api.countrystatecity.in/v1/countries`,
      headers: {
        "X-CSCAPI-KEY":
          "Sk5DQVltWGc2em51U2ZpcFJVT0VJdmxFTng3MkxjT2ZRaXlhMnliSQ==",
      },
    };

    axios(config)
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    var config = {
      method: "get",
      url: `https://api.countrystatecity.in/v1/countries/${country.iso2}/states`,
      headers: {
        "X-CSCAPI-KEY":
          "Sk5DQVltWGc2em51U2ZpcFJVT0VJdmxFTng3MkxjT2ZRaXlhMnliSQ==",
      },
    };

    axios(config)
      .then((response) => {
        setStates(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [country]);

  const SubmitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
  };

  return (
    <Container fluid>
      <h1 className="fw-semibold">Sign Up</h1>
      <h3 className="text-secondary">All fileds are required.</h3>

      <Form onSubmit={SubmitHandler}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="name" className="my-3">
              <Form.Label className="fw-semibold fs-4">Full Name:</Form.Label>
              <Form.Control
                type="text"
                size="lg"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                minLength={3}
                maxLength={25}
                required
              ></Form.Control>
            </Form.Group>
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
            <Form.Group controlId="country" className="my-3 position-relative">
              <Form.Label className="fw-semibold fs-4">Country:</Form.Label>
              <Form.Control
                type="text"
                size="lg"
                placeholder="Enter your country"
                value={userCountry}
                onChange={(e) => {
                  setUserCountry(e.target.value);
                  setShowCountryDropdown(true);
                }}
                required
                autoComplete="off"
                spellCheck="false"
              ></Form.Control>
              {showCountryDropdown && (
                <CountriesList
                  countries={countries}
                  setCountry={setCountry}
                  setShowCountryDropdown={setShowCountryDropdown}
                  country={country}
                  setUserCountry={setUserCountry}
                  userCountry={userCountry}
                />
              )}
            </Form.Group>
            <Form.Group controlId="password" className="my-3">
              <Form.Label className="fw-semibold fs-4">Password:</Form.Label>
              <Form.Control
                type="password"
                size="lg"
                placeholder="xxxxxxxxx"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
                pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$"
                required
              ></Form.Control>
              <small className="fw-semibold text-secondary">
                A secure password must have atleast 8 characters including
                atleast 1 number, 1 special character and 1 uppercase letter.
              </small>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="contact-number" className="my-3">
              <Form.Label className="fw-semibold fs-4">
                Contact Number:
              </Form.Label>
              <InputGroup className="mb-2">
                <InputGroup.Text>+975</InputGroup.Text>
                <Form.Control
                  type="number"
                  size="lg"
                  placeholder="Enter your contact number"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  minLength={8}
                  maxLength={8}
                  required
                />
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="contact-number" className="my-3">
              <Form.Label className="fw-semibold fs-4">
                Contact Number:
              </Form.Label>
              <Form.Select
                required
                size="lg"
                onChange={(e) => setGender(e.target.value)}
              >
                <option>Select your gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="region" className="my-3 position-relative">
              <Form.Label className="fw-semibold fs-4">
                State or Dzongkhag:
              </Form.Label>
              <Form.Control
                type="text"
                size="lg"
                placeholder="Enter your state or dzongkhag"
                value={userState}
                onChange={(e) => {
                  setUserState(e.target.value);
                  setShowStateDropdown(true);
                }}
                required
                autoComplete="off"
                spellCheck="false"
              ></Form.Control>
              {showStateDropdown && (
                <StatesList
                  states={states}
                  state={region}
                  setShowStateDropdown={setShowStateDropdown}
                  setRegion={setRegion}
                  setUserState={setUserState}
                  userState={userState}
                />
              )}
            </Form.Group>
            <Form.Group controlId="password" className="my-3">
              <Form.Label className="fw-semibold fs-4">
                Confirm Password:
              </Form.Label>
              <Form.Control
                type="password"
                size="lg"
                placeholder="xxxxxxxxx"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
          </Col>
          <Button type="submit" size="lg" className="button-custom w-25 mt-3">
            Sign Up
          </Button>
        </Row>
      </Form>
      <Row className="py-3 justify-content-center">
        <Col className="text-center fs-4">
          Already have an account? <Link to="/login">Login</Link>
        </Col>
      </Row>
    </Container>
  );
};
export default SignupScreen;
