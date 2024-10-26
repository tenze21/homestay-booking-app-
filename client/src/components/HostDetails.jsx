import React, { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom";
import { saveHostDetails } from "../slices/propertyListingSlice";

function HostDetails({ setPage }) {
  const propertyInfo = useSelector((state) => state.propertyInfo);
  const { hostDetails } = propertyInfo;

  const [profession, setProfession] = useState(hostDetails.profession? hostDetails.profession : "");
  const [education, setEducation] = useState(hostDetails.education? hostDetails.education : "");
  const [date_of_birth, setDateOfBirth] = useState(hostDetails.date_of_birth? hostDetails.date_of_birth : "");
  const [bio, setBio] = useState(hostDetails.bio? hostDetails.bio : "");
  const [spoken_languages, setSpokenLanguages] = useState(hostDetails.spoken_languages?.length>0? [...hostDetails.spoken_languages] : []);
  const [focus, setFocus] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveHostDetails({ ...hostDetails ,profession, education, date_of_birth, bio, spoken_languages }));
    setPage(1);
  };
  return (
    <Container className="w-50 mt-5">
      <h2 className="mb-3 fs-4 fw-semibold">
        Let your guests know more about you.
      </h2>
      <Form onSubmit={submitHandler}>
        <div
          className="rounded shadow-sm ps-4 pe-4 pt-4 pb-5 mb-3"
          style={{ backgroundColor: "white" }}
        >
          <p>
            All the fields are optional but providing these information can
            increase your chances of getting more bookings.
          </p>
          <Form.Control
            className="my-3"
            inputMode="numeric"
            placeholder="Profession"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            size="lg"
          ></Form.Control>
          <Form.Select
            className="my-3"
            aria-label="Select your education level"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            size="lg"
          >
            <option>Education</option>
            <option value="Primary School">
              Primary School (Till 6th grade)
            </option>
            <option value="Middle School">
              Middle school (Till 10th grade)
            </option>
            <option value="High School">High School (Till 12th grade)</option>
            <option value="Bachelors Degree">Bachelors Degree</option>
            <option value="Masters Degree">Masters Degree</option>
            <option value="phD">phD</option>
          </Form.Select>
          <Form.Control
            className="my-3"
            type={focus ? "date" : "text"}
            onFocus={() => setFocus(true)}
            value={date_of_birth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            placeholder="Date of Birth"
            size="lg"
          ></Form.Control>
          <Form.Control
            as="textarea"
            className="my-3 textarea-custom"
            placeholder="Write a short bio about yourself. You can include any additional information you would like your guests to know."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            size="lg"
          ></Form.Control>
          <Form.Group className="my-3">
            <Form.Label className="fs-4 fw-semibold">
              Spoken Languages
            </Form.Label>
            <Row>
              <Col md={6}>
                {hostDetails.spoken_languages?.includes("English") ? (
                  <Form.Check
                    label="English"
                    type="checkbox"
                    value={"English"}
                    checked={spoken_languages.includes("English")}
                    className="d-flex align-items-center checkbox-custom"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (e.target.checked) {
                        setSpokenLanguages([...spoken_languages, value]);
                      } else {
                        setSpokenLanguages(
                          spoken_languages.filter(
                            (language) => language !== value
                          )
                        );
                      }
                    }}
                  />
                ) : (
                  <Form.Check
                    label="English"
                    type="checkbox"
                    value={"English"}
                    className="d-flex align-items-center checkbox-custom"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (e.target.checked) {
                        setSpokenLanguages([...spoken_languages, value]);
                      } else {
                        setSpokenLanguages(
                          spoken_languages.filter(
                            (language) => language !== value
                          )
                        );
                      }
                    }}
                  />
                )}
                {hostDetails.spoken_languages?.includes("Hindi") ? (
                  <Form.Check
                    label="Hindi"
                    type="checkbox"
                    value={"Hindi"}
                    checked={spoken_languages.includes("Hindi")}
                    className="d-flex align-items-center checkbox-custom"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (e.target.checked) {
                        setSpokenLanguages([...spoken_languages, value]);
                      } else {
                        setSpokenLanguages(
                          spoken_languages.filter(
                            (language) => language !== value
                          )
                        );
                      }
                    }}
                  />
                ) : (
                  <Form.Check
                    label="Hindi"
                    type="checkbox"
                    value={"Hindi"}
                    className="d-flex align-items-center checkbox-custom"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (e.target.checked) {
                        setSpokenLanguages([...spoken_languages, value]);
                      } else {
                        setSpokenLanguages(
                          spoken_languages.filter(
                            (language) => language !== value
                          )
                        );
                      }
                    }}
                  />
                )}
                {hostDetails.spoken_languages?.includes("Japanese") ? (
                  <Form.Check
                    label="Japanese"
                    type="checkbox"
                    value={"Japanese"}
                    checked={spoken_languages.includes("Japanese")}
                    className="d-flex align-items-center checkbox-custom"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (e.target.checked) {
                        setSpokenLanguages([...spoken_languages, value]);
                      } else {
                        setSpokenLanguages(
                          spoken_languages.filter(
                            (language) => language !== value
                          )
                        );
                      }
                    }}
                  />
                ) : (
                  <Form.Check
                    label="Japanese"
                    type="checkbox"
                    value={"Japanese"}
                    className="d-flex align-items-center checkbox-custom"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (e.target.checked) {
                        setSpokenLanguages([...spoken_languages, value]);
                      } else {
                        setSpokenLanguages(
                          spoken_languages.filter(
                            (language) => language !== value
                          )
                        );
                      }
                    }}
                  />
                )}
                {hostDetails.spoken_languages?.includes("Korean") ? (
                  <Form.Check
                    label="Korean"
                    type="checkbox"
                    value={"korean"}
                    checked={spoken_languages.includes("Korean")}
                    className="d-flex align-items-center checkbox-custom"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (e.target.checked) {
                        setSpokenLanguages([...spoken_languages, value]);
                      } else {
                        setSpokenLanguages(
                          spoken_languages.filter(
                            (language) => language !== value
                          )
                        );
                      }
                    }}
                  />
                ) : (
                  <Form.Check
                    label="Korean"
                    type="checkbox"
                    value={"Korean"}
                    className="d-flex align-items-center checkbox-custom"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (e.target.checked) {
                        setSpokenLanguages([...spoken_languages, value]);
                      } else {
                        setSpokenLanguages(
                          spoken_languages.filter(
                            (language) => language !== value
                          )
                        );
                      }
                    }}
                  />
                )}
              </Col>
              <Col md={6}>
                {hostDetails.spoken_languages?.includes("Chinese") ? (
                  <Form.Check
                    label="Chinese"
                    type="checkbox"
                    value={"Chinese"}
                    checked={spoken_languages.includes("Chinese")}
                    className="d-flex align-items-center checkbox-custom"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (e.target.checked) {
                        setSpokenLanguages([...spoken_languages, value]);
                      } else {
                        setSpokenLanguages(
                          spoken_languages.filter(
                            (language) => language !== value
                          )
                        );
                      }
                    }}
                  />
                ) : (
                  <Form.Check
                    label="Chinese"
                    type="checkbox"
                    value={"Chinese"}
                    className="d-flex align-items-center checkbox-custom"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (e.target.checked) {
                        setSpokenLanguages([...spoken_languages, value]);
                      } else {
                        setSpokenLanguages(
                          spoken_languages.filter(
                            (language) => language !== value
                          )
                        );
                      }
                    }}
                  />
                )}
                {hostDetails.spoken_languages?.includes("French") ? (
                  <Form.Check
                    label="French"
                    type="checkbox"
                    value={"French"}
                    checked={spoken_languages.includes("French")}
                    className="d-flex align-items-center checkbox-custom"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (e.target.checked) {
                        setSpokenLanguages([...spoken_languages, value]);
                      } else {
                        setSpokenLanguages(
                          spoken_languages.filter(
                            (language) => language !== value
                          )
                        );
                      }
                    }}
                  />
                ) : (
                  <Form.Check
                    label="French"
                    type="checkbox"
                    value={"French"}
                    className="d-flex align-items-center checkbox-custom"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (e.target.checked) {
                        setSpokenLanguages([...spoken_languages, value]);
                      } else {
                        setSpokenLanguages(
                          spoken_languages.filter(
                            (language) => language !== value
                          )
                        );
                      }
                    }}
                  />
                )}
                {hostDetails.spoken_languages?.includes("Spanish") ? (
                  <Form.Check
                    label="Spanish"
                    type="checkbox"
                    value="Spanish"
                    checked={spoken_languages.includes("Spanish")}
                    className="d-flex align-items-center checkbox-custom"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (e.target.checked) {
                        setSpokenLanguages([...spoken_languages, value]);
                      } else {
                        setSpokenLanguages(
                          spoken_languages.filter(
                            (language) => language !== value
                          )
                        );
                      }
                    }}
                  />
                ) : (
                  <Form.Check
                    label="Spanish"
                    type="checkbox"
                    value="Spanish"
                    className="d-flex align-items-center checkbox-custom"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (e.target.checked) {
                        setSpokenLanguages([...spoken_languages, value]);
                      } else {
                        setSpokenLanguages(
                          spoken_languages.filter(
                            (language) => language !== value
                          )
                        );
                      }
                    }}
                  />
                )}
              </Col>
            </Row>
          </Form.Group>
        </div>
        <Row>
          <Col md={2}>
            <Button
              className="w-100 form-back-btn"
              size="lg"
              onClick={() => {
                navigate("/property_listing/service_setup");
              }}
            >
              <FaChevronLeft size={24} />
            </Button>
          </Col>
          <Col md={10}>
            <Button
              type="submit"
              className="d-block w-100 button-custom"
              size="lg"
            >
              Continue
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default HostDetails;
