import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  Card,
  Button,
  Form,
  ListGroup,
} from "react-bootstrap";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { FaStar, FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import "../assets/styles/homestayPage.css";
import { useState } from "react";
import Meta from "../components/Meta";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { useGetHomestayDetailsQuery } from "../slices/homestaysApiSlice";
import { saveDetails } from "../slices/reservationSlice";
import { useGetReviewsQuery } from "../slices/reviewsApiSlice";
import ReviewModal from "../components/ReviewModal";

const HomestayPage = () => {
  const { id: homestayId } = useParams();

  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [arrivalDate, setArrivalDate] = useState("");
  const [numberofDays, setNumberofDays] = useState();
  const [modalShow, setModalShow] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    data: homestay,
    isLoading,
    error,
  } = useGetHomestayDetailsQuery(homestayId);

  const {
    data: reviews,
    isLoading: loadingReview,
    refetch,
    error: reviewError,
  } = useGetReviewsQuery(homestayId);
  const { userInfo } = useSelector((state) => state.auth);

  const checkoutHandler = () => {
    if (!userInfo) {
      navigate(`/login?redirect=/homestay/${homestayId}`);
      return;
    }
    dispatch(
      saveDetails({
        homestayId,
        name: homestay.title,
        userId: userInfo._id,
        rate: homestay.rate,
        numberOfGuests,
        arrivalDate,
        numberofDays,
      })
    );
    navigate("/reservation/payment");
  };

  return (
    <>
      <Link className="text-dark fs-1" to="/">
        <IoMdArrowRoundBack />
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
        <Meta title={homestay.title} description={homestay.description}/>
          <Row>
            <h1 className="fs-3 fw-semibold mt-3 mb-2">{homestay.title}</h1>
            <Col sm={12} md={12} lg={6}>
              <Image src={homestay.images[0]} fluid className="main_img" />
            </Col>
            <Col sm={12} md={12} lg={6}>
              <Row className="mb-3">
                <Col sm={12} md={12} lg={6}>
                  <Image src={homestay.images[1]} fluid className="img-1" />
                </Col>
                <Col sm={12} md={12} lg={6}>
                  <Image
                    src={homestay.images[2]}
                    fluid
                    className="radius-top img-2"
                  />
                </Col>
              </Row>
              <Row>
                <Col sm={12} md={12} lg={6}>
                  <Image src={homestay.images[3]} fluid className="img-3" />
                </Col>
                <Col sm={12} md={12} lg={6}>
                  <Image
                    src={homestay.images[4]}
                    fluid
                    className="radius-bottom img-4"
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col lg={8}>
              <ListGroup
                variant="flush"
                className="bg-transparent border-bottom my-3"
              >
                <ListGroup.Item className="bg-transparent border-0 p-0 pb-2 d-flex align-items-center fs-4">
                  <FaLocationDot className="fs-4 me-3" />
                  <Link
                    to={`https://www.google.com/maps?q=${homestay.latitude},${homestay.longitude}`}
                    className="text-dark"
                    target="blank"
                    title="View location on map"
                  >
                    {homestay.gewog}, {homestay.dzongkhag}
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent border-0 p-0 pb-2 d-flex align-items-center fs-4">
                  <FaStar className="fs-4 me-3" />
                  {homestay.rating} (
                  <Link
                    to="#reviews"
                    className="text-dark"
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById("reviews")
                        .scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {homestay.numreviews} reviews
                  </Link>
                  )
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent p-0 pb-2 d-flex align-items-center fs-4">
                  <IoIosPeople className="fs-4 me-3" />
                  Accomodation for {homestay.accomodation} people
                </ListGroup.Item>
              </ListGroup>
              <ListGroup
                variant="flush"
                className="bg-transparent border-bottom my-3"
              >
                <Row className="align-items-center">
                  <Col lg={2}>
                    <ListGroup.Item className="bg-transparent border-0 p-0 pb-2 d-flex align-items-center fs-4">
                      <Image
                        src={homestay.profile}
                        className="rounded-circle host-profile"
                      />
                    </ListGroup.Item>
                  </Col>
                  <Col lg={10}>
                    <ListGroup.Item className="bg-transparent border-0 p-0 d-flex align-items-center fs-4 fw-bold host-name">
                      Hosted by {homestay.full_name}
                    </ListGroup.Item>
                    <ListGroup.Item className="bg-transparent border-0 p-0 pb-2 d-flex align-items-center fs-4 fw-bold text-secondary opacity-50 host-contact">
                      {homestay.contact_number}, {homestay.email}
                    </ListGroup.Item>
                  </Col>
                </Row>
              </ListGroup>
              <ListGroup
                variant="flush"
                className="bg-transparent border-bottom my-3"
              >
                <Row>
                  {homestay.facilities.map((facilities) => {
                    return (
                      <Col className="py-3" lg={3}>
                        <ListGroup.Item className="bg-transparent border-0 p-0 d-flex align-items-center fs-5 mb-3 fw-semibold host-name">
                          <FaCheck className="me-2" />
                          {facilities}
                        </ListGroup.Item>
                      </Col>
                    );
                  })}
                </Row>
              </ListGroup>
              {homestay.rules.length > 0 && (
                <ListGroup
                  variant="flush"
                  className="bg-transparent border-bottom my-3"
                >
                  <Row>
                    <h3 className="fs-4 fw-semibold my-2">House Rules:</h3>
                    {homestay.rules.map((rule) => {
                      return (
                        <Col className="py-3" lg={3}>
                          <ListGroup.Item className="bg-transparent border-0 p-0 d-flex align-items-center fs-5 mb-3 fw-semibold host-name">
                            <ImCross className="me-2" />
                            {rule}
                          </ListGroup.Item>
                        </Col>
                      );
                    })}
                  </Row>
                </ListGroup>
              )}
              <ListGroup
                variant="flush"
                className="bg-transparent border-bottom my-3"
              >
                <h3 className="fw-semibold pt-3">
                  Short description about the service.
                </h3>
                <ListGroup.Item className="bg-transparent border-0 p-0 d-flex align-items-center fs-5 mb-3 fw-normal host-name">
                  {homestay.description}
                </ListGroup.Item>
              </ListGroup>
              <ListGroup
                variant="flush"
                className="bg-transparent border-bottom my-3"
              >
                <h3 className="fw-semibold pt-3">Know your host.</h3>
                {homestay.full_name && (
                  <ListGroup.Item className="bg-transparent border-0 p-0 d-flex align-items-center fs-5 mb-2 fw-normal host-name">
                    Full Name: {homestay.full_name}
                  </ListGroup.Item>
                )}
                {homestay.profession && (
                  <ListGroup.Item className="bg-transparent border-0 p-0 d-flex align-items-center fs-5 mb-2 fw-normal host-name">
                    Profession: {homestay.profession}
                  </ListGroup.Item>
                )}
                {homestay.education && (
                  <ListGroup.Item className="bg-transparent border-0 p-0 d-flex align-items-center fs-5 mb-2 fw-normal host-name">
                    Education: {homestay.education}
                  </ListGroup.Item>
                )}
                {homestay.spoken_languages && (
                  <ListGroup.Item className="bg-transparent border-0 p-0 fs-5 mb-2 fw-normal">
                    Spoken Languages:
                    <ul
                      className="d-flex gap-5 p-0"
                      style={{ listStyle: "none" }}
                    >
                      {homestay.spoken_languages.map((language) => (
                        <li>
                          <FaCheck size={14} /> {language}
                        </li>
                      ))}
                    </ul>
                  </ListGroup.Item>
                )}
                {homestay.bio && (
                  <ListGroup.Item className="bg-transparent border-0 p-0 d-flex align-items-center fs-5 mb-2 fw-normal host-name">
                    Bio: <br /> {homestay.bio}
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Col>
            <Col lg={4} className="mt-4">
              {homestay.isavaliable ? (
                <Card className="p-3">
                  <h2 className="fs-3 fw-semibold">
                    BTN {homestay.rate} per night
                  </h2>
                  <Form onSubmit={checkoutHandler}>
                    <ListGroup>
                      <ListGroup.Item>
                        <Row className="justify-content-around align-items-center">
                          <Col className="p-0 border-end">
                            <h6 className="text-center fw-semibold">
                              Check-in
                            </h6>
                            <p className="m-0 text-center">
                              {homestay.check_in}
                            </p>
                          </Col>
                          <Col className="p-0">
                            <h6 className="text-center fw-semibold">
                              Check-out
                            </h6>
                            <p className="m-0 text-center">
                              {homestay.check_out}
                            </p>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item className="pb-3">
                        <Form.Group controlId="number-of-guest my-2">
                          <Form.Label>Number of guests</Form.Label>
                          <Form.Control
                            as="select"
                            value={numberOfGuests}
                            onChange={(e) => setNumberOfGuests(e.target.value)}
                            required
                          >
                            {[...Array(homestay.accomodation).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Form.Group>
                        <Form.Group className="my-2">
                          <Form.Label>Arrival Date</Form.Label>
                          <Form.Control
                            type="date"
                            value={arrivalDate}
                            onChange={(e) => setArrivalDate(e.target.value)}
                            required
                          ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Number of days</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter number of days"
                            value={numberofDays}
                            onChange={(e) => setNumberofDays(e.target.value)}
                            required
                          ></Form.Control>
                        </Form.Group>
                      </ListGroup.Item>
                    </ListGroup>
                    {userInfo?._id === homestay.user_id ? (
                      <Button
                        type="submit"
                        className="btn-block mt-3 reservation-btn"
                        disabled
                        style={{
                          backgroundColor: "#ff4500",
                          pointerEvents: "auto",
                          cursor: "not-allowed",
                        }}
                      >
                        Book a Reservation
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="btn-block mt-3 reservation-btn"
                      >
                        Book a Reservation
                      </Button>
                    )}
                  </Form>
                </Card>
              ) : (
                <Card className="p-3">
                  <h2 className="fs-3 fw-semibold">
                    BTN {homestay.rate} per night
                  </h2>
                  <h3 className="my-3 fw-semibold text-secondary">
                    Currently Unavailable
                  </h3>
                  <Button
                    className="reservation-btn-disabled mt-2"
                    variant="secondary"
                    disabled
                  >
                    Book a Reservation
                  </Button>
                </Card>
              )}
            </Col>
          </Row>
          <ListGroup id="reviews">
            <Row>
              <h3 className="fs-3 mb-3 fw-semibold">Reviews</h3>
            </Row>
            <Row>
              {loadingReview ? (
                <Loader />
              ) : reviewError ? (
                <Message variant={"danger"}>
                  {reviewError?.data?.message || error.error}
                </Message>
              ) : (
                <>
                  {reviews.length === 0 && (
                    <h3 className="fs-1 fw-bold text-secondary opacity-50">
                      No reviews to show yet.
                    </h3>
                  )}
                  {reviews.map((review) => (
                    <Col as={"article"} md={6} className="mb-3">
                      <ListGroup.Item
                        key={review.review_id}
                        className="border-0"
                        style={{ backgroundColor: "transparent" }}
                      >
                        <Row className="align-items-center">
                          <Col md={2} className="p-0" style={{ width: "60px" }}>
                            <Image
                              src={review.profile}
                              className="rounded-circle"
                              style={{ width: "50px", height: "50px" }}
                            />
                          </Col>
                          <Col md={9} className="ps-3">
                            <p className="m-0 fw-semibold">
                              {review.full_name}
                            </p>
                            <p className="m-0 fw-semibold text-muted">
                              {review.country}, {review.region}
                            </p>
                          </Col>
                        </Row>
                        <p className="mt-2 mb-0 fw-semibold fs-5">
                          {review.rating}(<FaStar />)
                        </p>
                        <p className="mb-1">{review.review}</p>
                        <p className="fw-semibold text-muted">
                          {review.created_at.split("T")[0]}
                        </p>
                      </ListGroup.Item>
                    </Col>
                  ))}
                </>
              )}
            </Row>
          </ListGroup>
          {userInfo && userInfo?._id !== homestay.user_id ? (
            <Button
              className="border-0 rounded-circle fs-3 position-fixed"
              style={{
                backgroundColor: "#ff4500",
                padding: "0 13px",
                right: "70px",
                top: "70vh",
              }}
              title="Drop a review"
              onClick={() => setModalShow(true)}
            >
              +
            </Button>
          ) : (
            ""
          )}
          <ReviewModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            setModalShow={setModalShow}
            homestayId={homestayId}
            refetch={refetch}
          />
        </>
      )}
    </>
  );
};
export default HomestayPage;
