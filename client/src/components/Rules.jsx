import React, { useState } from 'react';
import { FaChevronLeft } from "react-icons/fa";
import { Container, Row, Col, ListGroup, Button, Form } from 'react-bootstrap';
import { saveRules } from "../slices/propertyListingSlice";
import { useDispatch, useSelector } from "react-redux";

function Rules({setPage}) {
    const propertyInfo= useSelector((state) => state.propertyInfo);
    const {rules}= propertyInfo;

    const dispatch= useDispatch();

    const [propertyRules, setPropertyRules] = useState(rules.length>0? [...rules]:[]);

    const handleSubmit= (e)=>{
        e.preventDefault();
        dispatch(saveRules(propertyRules));
        setPage(2);
    }
  return (
    <Container className="w-50 mt-5">
        <h2 className="mb-3 fs-4 fw-semibold">What are some things guests should know before booking your service?</h2>
        <Form onSubmit={handleSubmit}>
        <div
          className="rounded shadow-sm ps-4 pe-4 pt-3 pb-5 mb-3"
          style={{ backgroundColor: "white" }}
        >
          <p className="text-muted">
            If you need your guests to abide by any additional rules not included below please let us know and you can mention it in your service description for now.
          </p>
          <ListGroup variant="flush">
            <ListGroup.Item>
              {rules.includes("Smoking") ? (
                <Form.Check
                  label="Smoking"
                  type="checkbox"
                  name="facilities"
                  value="Smoking"
                  checked={propertyRules.includes("Smoking")}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (e.target.checked) {
                      setPropertyRules([...propertyRules, value]); // Add facility
                    } else {
                      setPropertyRules(
                        propertyRules.filter(
                          (rule) => rule !== value
                        )
                      ); // Remove facility
                    }
                  }}
                />
              ) : (
                <Form.Check
                label="Smoking"
                type="checkbox"
                name="facilities"
                value="Smoking"
                onChange={(e) => {
                  const value = e.target.value;
                  if (e.target.checked) {
                    setPropertyRules([...propertyRules, value]); // Add facility
                  } else {
                    setPropertyRules(
                      propertyRules.filter(
                        (rule) => rule !== value
                      )
                    ); // Remove facility
                  }
                }}
              />
              )}
              {rules.includes("Alcohol") ? (
                <Form.Check
                  label="Alcohol"
                  type="checkbox"
                  name="facilities"
                  value="Alcohol"
                  checked={propertyRules.includes("Alcohol")}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (e.target.checked) {
                      setPropertyRules([...propertyRules, value]); // Add facility
                    } else {
                      setPropertyRules(
                        propertyRules.filter(
                          (rule) => rule !== value
                        )
                      ); // Remove facility
                    }
                  }}
                />
              ) : (
                <Form.Check
                label="Alcohol"
                type="checkbox"
                name="facilities"
                value="Alcohol"
                onChange={(e) => {
                  const value = e.target.value;
                  if (e.target.checked) {
                    setPropertyRules([...propertyRules, value]); // Add facility
                  } else {
                    setPropertyRules(
                      propertyRules.filter(
                        (rule) => rule !== value
                      )
                    ); // Remove facility
                  }
                }}
              />
              )}
              {propertyRules.includes("Pets") ? (
                <Form.Check
                  label="Pets"
                  type="checkbox"
                  name="facilities"
                  value="Pets"
                  checked={propertyRules.includes("Pets")}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (e.target.checked) {
                      setPropertyRules([...propertyRules, value]); // Add facility
                    } else {
                      setPropertyRules(
                        propertyRules.filter(
                          (rule) => rule !== value
                        )
                      ); // Remove facility
                    }
                  }}
                />
              ) : (
                <Form.Check
                  label="Pets"
                  type="checkbox"
                  name="facilities"
                  value="Pets"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (e.target.checked) {
                      setPropertyRules([...propertyRules, value]); // Add facility
                    } else {
                      setPropertyRules(
                        propertyRules.filter(
                          (rule) => rule !== value
                        )
                      ); // Remove facility
                    }
                  }}
                />
              )}
              {propertyRules.includes("Parties & Events") ? (
                <Form.Check
                  label="Parties & Events"
                  type="checkbox"
                  name="facilities"
                  value="Parties & Events"
                  checked={propertyRules.includes("Parties & Events")}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (e.target.checked) {
                      setPropertyRules([...propertyRules, value]); // Add facility
                    } else {
                      setPropertyRules(
                        propertyRules.filter(
                          (rule) => rule !== value
                        )
                      ); // Remove facility
                    }
                  }}
                />
              ) : (
                <Form.Check
                  label="Parties & Events"
                  type="checkbox"
                  name="facilities"
                  value="Parties & Events"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (e.target.checked) {
                      setPropertyRules([...propertyRules, value]); // Add facility
                    } else {
                      setPropertyRules(
                        propertyRules.filter(
                          (rule) => rule !== value
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
              onClick={() => {
                setPage(0);
              }}
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
  )
};

export default Rules;
