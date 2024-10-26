import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaChevronLeft } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { saveDescription } from "../slices/propertyListingSlice";
import { useNavigate } from "react-router-dom";

function Description({ setPage }) {
  const propertyInfo = useSelector((state) => state.propertyInfo);
  const { description } = propertyInfo;
  const dispatch = useDispatch();
  const navigate= useNavigate();

  const [propertyDescription, setPropertyDescription] = useState(
    description ? description : ""
  );
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveDescription(propertyDescription));
    navigate("/property_listing/finish_up");
  };
  return (
    <Container className="w-50 mt-5">
      <h2 className="mb-3 fs-4 fw-semibold">
        Write a short description about your service.
      </h2>
      <Form onSubmit={submitHandler}>
        <div
          className="rounded shadow-sm ps-4 pe-4 pt-4 pb-5 mb-3"
          style={{ backgroundColor: "white" }}
        >
            <p className="text-muted">Try to keep your description short and concise including information that would be of interest to your guest</p>
          <Form.Control
            as="textarea"
            className="mb-5 textarea-custom"
            placeholder="Start typing..."
            value={propertyDescription}
            onChange={(e) => setPropertyDescription(e.target.value)}
            required
            size="lg"
          ></Form.Control>
        </div>
        <Row>
          <Col md={2}>
            <Button
              className="w-100 form-back-btn"
              size="lg"
              onClick={() => {
                setPage(3);
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

export default Description;
