import React, { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { Form, Button, Container, Col, Row, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { saveFacilities } from "../slices/propertyListingSlice";
import { useDispatch, useSelector } from "react-redux";

function Facilities({ setPage }) {
  const propertyInfo = useSelector((state) => state.propertyInfo);
  const { facilities } = propertyInfo;

  const [propertyFacilities, setPropertyFacilities] = useState(
    facilities.length > 0 ? [...facilities] : []
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveFacilities(propertyFacilities));
    setPage(1);
  };
  return (
    <Container className="w-50 mt-5">
      <h2 className="mb-3 fs-4 fw-semibold">
        What are the the services your guests can avail?
      </h2>
      <Form onSubmit={submitHandler}>
        <div
          className="rounded shadow-sm ps-4 pe-4 pt-3 pb-5 mb-3"
          style={{ backgroundColor: "white" }}
        >
          <p className="text-muted">
            Please select only the facilities that apply to you. If you are providing any additional facilities not included below please let us know and you can mention it in your service description for now.
          </p>
          <ListGroup variant="flush">
            <ListGroup.Item as="h6">General</ListGroup.Item>
            <ListGroup.Item>
              {facilities.includes("Air conditioning") ? (
                <Form.Check
                  label="Air conditioning"
                  type="checkbox"
                  name="facilities"
                  value="Air conditioning"
                  checked={propertyFacilities.includes("Air conditioning")}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (e.target.checked) {
                      setPropertyFacilities([...propertyFacilities, value]); // Add facility
                    } else {
                      setPropertyFacilities(
                        propertyFacilities.filter(
                          (facility) => facility !== value
                        )
                      ); // Remove facility
                    }
                  }}
                />
              ) : (
                <Form.Check
                  label="Air conditioning"
                  type="checkbox"
                  name="facilities"
                  value="Air conditioning"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (e.target.checked) {
                      setPropertyFacilities([...propertyFacilities, value]); // Add facility
                    } else {
                      setPropertyFacilities(
                        propertyFacilities.filter(
                          (facility) => facility !== value
                        )
                      ); // Remove facility
                    }
                  }}
                />
              )}
              {facilities.includes("Heating") ? (
                <Form.Check
                  label="Heating"
                  type="checkbox"
                  name="facilities"
                  value="Heating"
                  checked={propertyFacilities.includes("Heating")}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (e.target.checked) {
                      setPropertyFacilities([...propertyFacilities, value]); // Add facility
                    } else {
                      setPropertyFacilities(
                        propertyFacilities.filter(
                          (facility) => facility !== value
                        )
                      ); // Remove facility
                    }
                  }}
                />
              ) : (
                <Form.Check
                  label="Heating"
                  type="checkbox"
                  name="facilities"
                  value="Heating"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (e.target.checked) {
                      setPropertyFacilities([...propertyFacilities, value]); // Add facility
                    } else {
                      setPropertyFacilities(
                        propertyFacilities.filter(
                          (facility) => facility !== value
                        )
                      ); // Remove facility
                    }
                  }}
                />
              )}
              {facilities.includes("Free wifi") ? (
                <Form.Check
                  label="Free wifi"
                  type="checkbox"
                  name="facilities"
                  value="Free wifi"
                  checked={propertyFacilities.includes("Free wifi")}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (e.target.checked) {
                      setPropertyFacilities([...propertyFacilities, value]); // Add facility
                    } else {
                      setPropertyFacilities(
                        propertyFacilities.filter(
                          (facility) => facility !== value
                        )
                      ); // Remove facility
                    }
                  }}
                />
              ) : (
                <Form.Check
                  label="Free wifi"
                  type="checkbox"
                  name="facilities"
                  value="Free wifi"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (e.target.checked) {
                      setPropertyFacilities([...propertyFacilities, value]); // Add facility
                    } else {
                      setPropertyFacilities(
                        propertyFacilities.filter(
                          (facility) => facility !== value
                        )
                      ); // Remove facility
                    }
                  }}
                />
              )}
            </ListGroup.Item>
          </ListGroup>
          <ListGroup variant="flush">
            <ListGroup.Item as="h6">Cooking & Cleaning</ListGroup.Item>
            <ListGroup.Item>
              {facilities.includes("Kitchen") ? (
                <Form.Check
                  label="Kitchen"
                  type="checkbox"
                  name="facilities"
                  value="Kitchen"
                  checked={propertyFacilities.includes("Kitchen")}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (e.target.checked) {
                      setPropertyFacilities([...propertyFacilities, value]); // Add facility
                    } else {
                      setPropertyFacilities(
                        propertyFacilities.filter(
                          (facility) => facility !== value
                        )
                      ); // Remove facility
                    }
                  }}
                />
              ) : (
                <Form.Check
                  label="Kitchen"
                  type="checkbox"
                  name="facilities"
                  value="Kitchen"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (e.target.checked) {
                      setPropertyFacilities([...propertyFacilities, value]); // Add facility
                    } else {
                      setPropertyFacilities(
                        propertyFacilities.filter(
                          (facility) => facility !== value
                        )
                      ); // Remove facility
                    }
                  }}
                />
              )}

              {facilities.includes("Washing machine") ? (
                <Form.Check
                  label="Washing machine"
                  type="checkbox"
                  name="facilities"
                  value="Wasing machine"
                  checked={propertyFacilities.includes("Washing machine")}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (e.target.checked) {
                      setPropertyFacilities([...propertyFacilities, value]); // Add facility
                    } else {
                      setPropertyFacilities(
                        propertyFacilities.filter(
                          (facility) => facility !== value
                        )
                      ); // Remove facility
                    }
                  }}
                />
              ) : (
                <Form.Check
                  label="Washing machine"
                  type="checkbox"
                  name="facilities"
                  value="Wasing machine"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (e.target.checked) {
                      setPropertyFacilities([...propertyFacilities, value]); // Add facility
                    } else {
                      setPropertyFacilities(
                        propertyFacilities.filter(
                          (facility) => facility !== value
                        )
                      ); // Remove facility
                    }
                  }}
                />
              )}
            </ListGroup.Item>
          </ListGroup>
          <ListGroup variant="flush">
            <ListGroup.Item as="h6">Entertainment</ListGroup.Item>
            <ListGroup.Item>
              {facilities.includes("Games") ? (
                <Form.Check
                  label="Games"
                  type="checkbox"
                  name="facilities"
                  value="Games"
                  checked={propertyFacilities.includes("Games")}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (e.target.checked) {
                      setPropertyFacilities([...propertyFacilities, value]); // Add facility
                    } else {
                      setPropertyFacilities(
                        propertyFacilities.filter(
                          (facility) => facility !== value
                        )
                      ); // Remove facility
                    }
                  }}
                />
              ) : (
                <Form.Check
                  label="Games"
                  type="checkbox"
                  name="facilities"
                  value="Games"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (e.target.checked) {
                      setPropertyFacilities([...propertyFacilities, value]); // Add facility
                    } else {
                      setPropertyFacilities(
                        propertyFacilities.filter(
                          (facility) => facility !== value
                        )
                      ); // Remove facility
                    }
                  }}
                />
              )}
              {facilities.includes("Television") ? (
                <Form.Check
                  label="Television"
                  type="checkbox"
                  name="facilities"
                  value="Television"
                  checked={propertyFacilities.includes("Television")}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (e.target.checked) {
                      setPropertyFacilities([...propertyFacilities, value]); // Add facility
                    } else {
                      setPropertyFacilities(
                        propertyFacilities.filter(
                          (facility) => facility !== value
                        )
                      ); // Remove facility
                    }
                  }}
                />
              ) : (
                <Form.Check
                  label="Television"
                  type="checkbox"
                  name="facilities"
                  value="Television"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (e.target.checked) {
                      setPropertyFacilities([...propertyFacilities, value]); // Add facility
                    } else {
                      setPropertyFacilities(
                        propertyFacilities.filter(
                          (facility) => facility !== value
                        )
                      ); // Remove facility
                    }
                  }}
                />
              )}
              {facilities.includes("Hot tub") ? (
                <Form.Check
                  label="Hot tub"
                  type="checkbox"
                  name="facilities"
                  value="Hot tub"
                  checked={propertyFacilities.includes("Hot tub")}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (e.target.checked) {
                      setPropertyFacilities([...propertyFacilities, value]); // Add facility
                    } else {
                      setPropertyFacilities(
                        propertyFacilities.filter(
                          (facility) => facility !== value
                        )
                      ); // Remove facility
                    }
                  }}
                />
              ) : (
                <Form.Check
                  label="Hot tub"
                  type="checkbox"
                  name="facilities"
                  value="Hot tub"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (e.target.checked) {
                      setPropertyFacilities([...propertyFacilities, value]); // Add facility
                    } else {
                      setPropertyFacilities(
                        propertyFacilities.filter(
                          (facility) => facility !== value
                        )
                      ); // Remove facility
                    }
                  }}
                />
              )}
            </ListGroup.Item>
          </ListGroup>
          <ListGroup variant="flush">
            <ListGroup.Item as="h6">Outside & View</ListGroup.Item>
            <ListGroup.Item>
              {facilities.includes("Balcony") ? (
                <Form.Check
                  label="Balcony"
                  type="checkbox"
                  name="facilities"
                  value="Balcony"
                  checked={propertyFacilities.includes("Balcony")}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (e.target.checked) {
                      setPropertyFacilities([...propertyFacilities, value]); // Add facility
                    } else {
                      setPropertyFacilities(
                        propertyFacilities.filter(
                          (facility) => facility !== value
                        )
                      ); // Remove facility
                    }
                  }}
                />
              ) : (
                <Form.Check
                  label="Balcony"
                  type="checkbox"
                  name="facilities"
                  value="Balcony"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (e.target.checked) {
                      setPropertyFacilities([...propertyFacilities, value]); // Add facility
                    } else {
                      setPropertyFacilities(
                        propertyFacilities.filter(
                          (facility) => facility !== value
                        )
                      ); // Remove facility
                    }
                  }}
                />
              )}
              {facilities.includes("Terrace") ? (
                <Form.Check
                  label="Terrace"
                  type="checkbox"
                  name="facilities"
                  value="Terrace"
                  checked={propertyFacilities.includes("Terrace")}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (e.target.checked) {
                      setPropertyFacilities([...propertyFacilities, value]); // Add facility
                    } else {
                      setPropertyFacilities(
                        propertyFacilities.filter(
                          (facility) => facility !== value
                        )
                      ); // Remove facility
                    }
                  }}
                />
              ) : (
                <Form.Check
                  label="Terrace"
                  type="checkbox"
                  name="facilities"
                  value="Terrace"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (e.target.checked) {
                      setPropertyFacilities([...propertyFacilities, value]); // Add facility
                    } else {
                      setPropertyFacilities(
                        propertyFacilities.filter(
                          (facility) => facility !== value
                        )
                      ); // Remove facility
                    }
                  }}
                />
              )}
              {facilities.includes("Nature & Greenery") ? (
                <Form.Check
                  label="Nature & Greenery"
                  type="checkbox"
                  name="facilities"
                  value="Nature & Greenery"
                  checked={propertyFacilities.includes("Nature & Greenery")}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (e.target.checked) {
                      setPropertyFacilities([...propertyFacilities, value]); // Add facility
                    } else {
                      setPropertyFacilities(
                        propertyFacilities.filter(
                          (facility) => facility !== value
                        )
                      ); // Remove facility
                    }
                  }}
                />
              ) : (
                <Form.Check
                  label="Nature & Greenery"
                  type="checkbox"
                  name="facilities"
                  value="Nature & Greenery"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (e.target.checked) {
                      setPropertyFacilities([...propertyFacilities, value]); // Add facility
                    } else {
                      setPropertyFacilities(
                        propertyFacilities.filter(
                          (facility) => facility !== value
                        )
                      ); // Remove facility
                    }
                  }}
                />
              )}
            </ListGroup.Item>
          </ListGroup>
        </div>
        <Row>
          <Col md={2}>
            <Button
              className="w-100 form-back-btn"
              size="lg"
              onClick={() => navigate("/property_listing/basic_information")}
            >
              <FaChevronLeft size={24} />
            </Button>
          </Col>
          <Col md={10}>
            <Button type="submit" className="w-100 button-custom" size="lg">
              Continue
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default Facilities;
