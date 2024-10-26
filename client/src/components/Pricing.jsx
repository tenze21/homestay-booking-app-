import React, { useState } from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { FaChevronLeft } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { saveRate } from "../slices/propertyListingSlice";
import { saveHostDetails } from "../slices/propertyListingSlice";

function Pricing({ setPage }) {
  const propertyInfo = useSelector((state) => state.propertyInfo);
  const { rate, hostDetails } = propertyInfo;

  const [rateValue, setRateValue] = useState(rate ? rate : "");
  const [account_number, setAccountNumber] = useState(
    hostDetails.account_number ? hostDetails.account_number : ""
  );
  const [bank_name, setBankName] = useState(
    hostDetails.bank_name ? hostDetails.bank_name : ""
  );
  const [account_holder_name, setAccountHolderName] = useState(
    hostDetails.account_holder_name ? hostDetails.account_holder_name : ""
  );

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveRate(rateValue));
    dispatch(
      saveHostDetails({
        ...hostDetails,
        account_number,
        bank_name,
        account_holder_name,
      })
    );
    setPage(2);
  };

  return (
    <Container className="w-50 mt-5">
      <h2 className="mb-3 fs-4 fw-semibold">
        Please ensure that you have read, agreed and understand our terms and
        conditions.
      </h2>
      <Form onSubmit={submitHandler}>
        <div
          className="rounded shadow-sm ps-4 pe-4 pt-3 pb-5 mb-3"
          style={{ backgroundColor: "white" }}
        >
          <p className="fw-semibold fs-5 text-muted">
            All fields are required. Your bank details will only be visible to
            us and yourself. Please ensure you provide valid account
            details to avoid inconveniences later on.
          </p>
          <InputGroup className="my-3">
            <InputGroup.Text>BTN</InputGroup.Text>
            <Form.Control
              type="number"
              inputMode="numeric"
              placeholder="Pricing per night"
              value={rateValue}
              required
              size="lg"
              onChange={(e) => {
                setRateValue(e.target.value);
              }}
            />
          </InputGroup>
          <Form.Control
              type="number"
              inputMode="numeric"
              placeholder="Account number"
              className="my-3"
              value={account_number}
              required
              size="lg"
              onChange={(e) => {
                setAccountNumber(e.target.value);
              }}
            />
          <Form.Control
              type="text"
              placeholder="Account holder name"
              className="my-3"
              value={account_holder_name}
              required
              size="lg"
              onChange={(e) => {
                setAccountHolderName(e.target.value);
              }}
            />
          <Form.Control
              type="text"
              placeholder="Bank name (ex.Bhutan National Bank)"
              className="my-3"
              value={bank_name}
              required
              size="lg"
              onChange={(e) => {
                setBankName(e.target.value);
              }}
            />
        </div>
        <Row>
          <Col md={2}>
            <Button
              className="w-100 form-back-btn"
              size="lg"
              onClick={() => setPage(0)}
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

export default Pricing;
