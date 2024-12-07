import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaChevronLeft } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { saveTiming } from "../slices/propertyListingSlice";

function Timing({ setPage }) {
  const propertyInfo = useSelector((state) => state.propertyInfo);
  const { timing } = propertyInfo;

  const [check_in, setCheck_in] = useState(
    timing.check_in ? timing.check_in : ""
  );
  const [check_out, setCheck_out] = useState(
    timing.check_out ? timing.check_out : ""
  );

  const dispatch = useDispatch();

  const submithandler = (e) => {
    e.preventDefault();
    dispatch(saveTiming({ check_in, check_out }));
    setPage(4)
  };

  return (
    <Container className="w-50 mt-5">
      <h2 className="mb-3 fs-4 fw-semibold">
        When should your guests arrive and leave?
      </h2>
      <Form onSubmit={submithandler}>
        <div
          className="rounded shadow-sm ps-4 pe-4 pt-4 pb-5 mb-3"
          style={{ backgroundColor: "white" }}
        >
          <label htmlFor="check_in"  className="mb-2 fw-semibold ">Check In:</label>
          <Form.Control
            className="mb-4"
            type="time"
            placeholder="Checkin time"
            value={check_in}
            onChange={(e) => setCheck_in(e.target.value)}
            required
            size="lg"
          ></Form.Control>
          <label htmlFor="check_out" className="mb-2 fw-semibold p-0">Check Out:</label>
          <Form.Control
            className="mb-5"
            type="time"
            placeholder="Checkout time"
            value={check_out}
            onChange={(e) => setCheck_out(e.target.value)}
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
                setPage(2);
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

export default Timing;
