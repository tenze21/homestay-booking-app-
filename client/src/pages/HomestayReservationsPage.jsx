import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Button } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { LinkContainer } from "react-router-bootstrap";
import { setNavigation } from "../slices/navigationSlice";
import { useGetHostHomestayQuery } from "../slices/homestaysApiSlice";
import {
  useGetHomestayReservationQuery,
  useUpdateReservationStatusMutation,
} from "../slices/reservationApiSlice";
import { toast } from "react-toastify";

function HomestayReservationsPage() {
  const { userInfo } = useSelector((state) => state.auth);
  const {
    data: homestay,
    isLoading,
    error: homestayError,
  } = useGetHostHomestayQuery(userInfo._id);
  const {
    data: reservations,
    refetch,
    isLoading: loadingReservations,
    error,
  } = useGetHomestayReservationQuery(homestay?.homestay_id);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setNavigation(2));
  }, [dispatch]);

  const [updateReservationStatus, { isLoading: loadingUpdate }] =
    useUpdateReservationStatusMutation();

  const updateHandler = async (reservationId, status) => {
    console.log(reservationId, status);

    try {
      await updateReservationStatus({homestayId: {_id: homestay.homestay_id}, rId: {_id: reservationId}, data: {status}});
      refetch();
      toast.success("Reservation Status updated successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <main>
      {isLoading || loadingReservations ? (
        <Loader />
      ) : homestayError || error ? (
        (
          error && (
            <Message variant={"danger"}>
              {error?.data?.message || error.error}
            </Message>
          )
        )(
          homestayError && (
            <Message variant={"danger"}>
              {homestayError?.data?.message || homestayError.error}
            </Message>
          )
        )
      ) : (
        <>
          <ListGroup variant="flush">
            <ListGroup.Item
              style={{ backgroundColor: "transparent" }}
              className="ps-0"
            >
              <h1 className="fs-2">Reservations</h1>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup variant="flush">
            {reservations.length === 0 && (
              <Message variant={"info"}>No Reservations to show yet</Message>
            )}
            {reservations.map((reservation) => (
              <ListGroup.Item
                key={reservation.reservation_id}
                className="cursor border-bottom pt-4"
              >
                <LinkContainer
                  to={`/reservation/${reservation.reservation_id}`}
                  className="cursor"
                >
                  <div className="cursor">
                  <Row className="cursor">
                    <Col
                      md={6}
                      className="d-flex align-items-center gap-3 cursor"
                    >
                      <Image
                        src={reservation.profile}
                        className="rounded-circle cursor"
                        style={{ width: "60px", height: "60px" }}
                      />
                      <div className="cursor">
                        <h3 className="mb-0 fs-5 cursor">
                          {reservation.full_name}
                        </h3>
                        {reservation.contact_number === "        " ? (
                          <p className="mb-0 fw-semibold text-muted cursor">
                            {reservation.email}, No contact number
                          </p>
                        ) : (
                          <p className="mb-0 fw-semibold text-muted cursor">
                            {reservation.email}, {reservation.contact_number}
                          </p>
                        )}
                      </div>
                    </Col>
                    <Col md={6} className="d-flex justify-content-end cursor">
                      <p className="mt-1 fw-semibold text-muted me-2 cursor">
                        {reservation.created_at.split("T")[0]}
                      </p>
                    </Col>
                  </Row>
                  <Row className="mt-3 cursor">
                    <Col md={4} className="cursor">
                      <p className="fs-5 cursor">
                        <strong className="cursor">Gender:</strong>{" "}
                        {reservation.gender}
                      </p>
                    </Col>
                    <Col md={4} className="cursor">
                      <p className="fs-5 cursor">
                        <strong className="cursor">Country:</strong>{" "}
                        {reservation.country}
                      </p>
                    </Col>
                    <Col md={4} className="cursor">
                      <p className="fs-5 cursor">
                        <strong className="cursor">State or District:</strong>{" "}
                        {reservation.region}
                      </p>
                    </Col>
                  </Row>
                  </div>
                </LinkContainer>
                {reservation.status === "Completed" ? (
                  <div className="d-flex gap-3 justify-content-end">
                    <p className="border border-3 rounded-3 border-success py-2 px-4 text-success fw-semibold">
                      Completed
                    </p>
                  </div>
                ) : reservation.status === "No show" ? (
                  <div className="d-flex gap-3 justify-content-end">
                    <p className="border border-3 rounded-3 border-danger py-2 px-4 text-danger fw-semibold">
                      Didn't show up
                    </p>
                  </div>
                ) : (
                  <div className="d-flex gap-3 justify-content-end">
                    {loadingUpdate ? (
                      <Button variant="success" disabled>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      </Button>
                    ) : (
                      <Button
                        variant="success"
                        onClick={() =>
                          updateHandler(reservation.reservation_id, "Completed")
                        }
                      >
                        Mark as Complete
                      </Button>
                    )}
                    {loadingUpdate ? (
                      <Button variant="warning" disabled>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      </Button>
                    ) : (
                      <Button
                        variant="warning"
                        onClick={() =>
                          updateHandler(reservation.reservation_id, "No show")
                        }
                      >
                        Didn't show up
                      </Button>
                    )}
                  </div>
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      )}
    </main>
  );
}

export default HomestayReservationsPage;
