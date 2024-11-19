import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Card,
  Button,
  Spinner,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import BookingSteps from "../components/BookingSteps";
import { toast } from "react-toastify";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  useCreateReservationMutation,
  useGetExchangeRateQuery,
} from "../slices/reservationApiSlice";

function BookReservationPage() {
  const navigate = useNavigate();

  const reservationInfo = useSelector((state) => state.reservationInfo);
  const { details, paymentMethod } = reservationInfo;
  const {
    homestayId,
    name,
    userId,
    rate,
    arrivalDate,
    numberofDays,
    numberOfGuests,
  } = details;

  const [createReservation, { isLoading, error }] =
    useCreateReservationMutation();

  const {
    data,
    isLoading: loadingExhangeRate,
    error: errorExchangeRate,
  } = useGetExchangeRateQuery();

  useEffect(() => {
    if (
      !homestayId ||
      !userId ||
      !arrivalDate ||
      !numberofDays ||
      !numberOfGuests ||
      !name ||
      !rate
    ) {
      navigate("/");
    } else if (!paymentMethod) {
      navigate("/reservation/payment");
    }
  }, [
    navigate,
    homestayId,
    userId,
    arrivalDate,
    numberofDays,
    numberOfGuests,
    paymentMethod,
    name,
    rate,
  ]);

  const makeReservation = async () => {
    const tamount = (
      (rate * numberofDays * numberOfGuests) /
      data.exgrate
    ).toFixed(2);
    try {
      const res = await createReservation({
        userId,
        homestayId,
        rate,
        numGuests: numberOfGuests,
        arrivalDate,
        numDays: numberofDays,
        paymentMethod,
        totalPayment: Number(tamount),
      }).unwrap();
      localStorage.removeItem("reservationInfo");
      navigate(`/reservation/${res.reservation_id}`);
    } catch (err) {
      toast.error(error);
    }
  };

  return (
    <Container>
      <BookingSteps step1 step2 step3 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item className="ps-5">
              <strong className="fs-3 mb-3">Reservation details:</strong>
              <p className="fs-5">
                <strong>HomeStay:</strong> {name}
              </p>
              <p className="fs-5">
                <strong>Rate:</strong> {rate}
              </p>
              <p className="fs-5">
                <strong>Arrival Date:</strong> {arrivalDate}
              </p>
              <p className="fs-5">
                <strong>Number of Days:</strong> {numberofDays}
              </p>
              <p className="fs-5">
                <strong>Number of Guests:</strong> {numberOfGuests}
              </p>
            </ListGroup.Item>
            <ListGroup.Item className="ps-5">
              {loadingExhangeRate ? (
                <Loader />
              ) : errorExchangeRate ? (
                <Message variant={"danger"}>
                  {errorExchangeRate?.data?.message || errorExchangeRate.error}
                </Message>
              ) : (
                <>
                  <strong className="fs-3 mb-3">Payment details:</strong>
                  <p className="fs-5">
                    <strong>Total Amount in BTN:</strong>{" "}
                    {rate * numberOfGuests * numberofDays}
                  </p>
                  <p className="fs-5">
                    <strong>Total Amount in USD:</strong>{" "}
                    {(
                      (rate * numberOfGuests * numberofDays) /
                      data.exgrate
                    ).toFixed(2)}
                  </p>
                  <p className="fs-5">
                    <strong>Payment Method:</strong> {paymentMethod}{" "}
                  </p>
                </>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card className="pt-3 ps-3 pe-3">
            {error && <Message variant="danger">{error.data.message}</Message>}
            <strong className="text-center fs-3 mb-3">{name}</strong>
            {isLoading ? (
              <Button className="button-custom mb-3" disabled>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              </Button>
            ) : (
              <Button className="button-custom mb-3" onClick={makeReservation}>
                Make a Reservation
              </Button>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default BookReservationPage;
