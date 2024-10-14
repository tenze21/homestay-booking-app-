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
import homestays from "../data/homestays";
import { useState } from "react";

const HomestayPage = () => {
  const { id: homestayId } = useParams();

  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [arrivalDate, setArrivalDate]= useState('');
  const [numberofDays, setNumberofDays]= useState();

  const navigate=useNavigate();

  const checkoutHandler=()=>{
    navigate('/login?redirect=/payment')
  }

  const homestay = homestays.find(
    (homestay) => homestay._id === Number(homestayId)
  );

  return (
    <>
      <Link className="text-dark fs-1" to="/">
        <IoMdArrowRoundBack />
      </Link>
      <Row>
        <h1 className="fs-3 fw-semibold mt-3 mb-2">{homestay.title}</h1>
        <Col sm={12} md={12} lg={6}>
          <Image src={homestay.images[0]} fluid className="main_img" />
        </Col>
        <Col sm={12} md={12} lg={6}>
          <Row className="mb-3">
            <Col sm={12} md={12} lg={6}>
              <Image src={homestay.images[1]} fluid />
            </Col>
            <Col sm={12} md={12} lg={6}>
              <Image src={homestay.images[2]} fluid className="radius-top" />
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={12} lg={6}>
              <Image src={homestay.images[1]} fluid />
            </Col>
            <Col sm={12} md={12} lg={6}>
              <Image src={homestay.images[2]} fluid className="radius-bottom" />
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
              {homestay.gewog}, {homestay.dzongkhag}
            </ListGroup.Item>
            <ListGroup.Item className="bg-transparent border-0 p-0 pb-2 d-flex align-items-center fs-4">
              <FaStar className="fs-4 me-3" />
              {homestay.rating} (
              <Link to="#reviews" className="text-dark">{homestay.num_reviews} reviews</Link>)
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
                    src={homestay.host_profile}
                    className="rounded-circle host-profile"
                  />
                </ListGroup.Item>
              </Col>
              <Col lg={10}>
                <ListGroup.Item className="bg-transparent border-0 p-0 d-flex align-items-center fs-4 fw-bold host-name">
                  Hosted by {homestay.host_name}
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent border-0 p-0 pb-2 d-flex align-items-center fs-4 fw-bold text-secondary opacity-50 host-contact">
                  {homestay.host_number}, {homestay.host_email}
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
          <ListGroup
            variant="flush"
            className="bg-transparent border-bottom my-3"
          >
            <Row>
              <h3 className="fs-4 fw-semibold my-2">House Rules:</h3>
              {homestay.house_rules.map((rule) => {
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
            <ListGroup.Item className="bg-transparent border-0 p-0 d-flex align-items-center fs-5 mb-2 fw-normal host-name">
              Full Name: {homestay.host_name}
            </ListGroup.Item>
            <ListGroup.Item className="bg-transparent border-0 p-0 d-flex align-items-center fs-5 mb-2 fw-normal host-name">
              Profession: {homestay.profession}
            </ListGroup.Item>
            <ListGroup.Item className="bg-transparent border-0 p-0 d-flex align-items-center fs-5 mb-2 fw-normal host-name">
              Education: {homestay.education}
            </ListGroup.Item>
            <ListGroup.Item className="bg-transparent border-0 p-0 d-flex align-items-center fs-5 mb-2 fw-normal host-name">
              Bio: <br /> {homestay.bio}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col lg={4}className="mt-4">
        {homestay.isAvailable? (
            <Card className="p-3">
            <h2 className="fs-3 fw-semibold">BTN {homestay.rate} per night</h2>
            <Form>
            <ListGroup>
              <ListGroup.Item>
                <Row className="justify-content-around align-items-center">
                  <Col className="p-0 border-end">
                    <h6 className="text-center fw-semibold">Check-in</h6>
                    <p className="m-0 text-center">{homestay.checkin}</p>
                  </Col>
                  <Col className="p-0">
                    <h6 className="text-center fw-semibold">Check-out</h6>
                    <p className="m-0 text-center">{homestay.checkout}</p>
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
                    >
                      {[...Array(homestay.accomodation).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1} 
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group className="my-2">
                    <Form.Label>Arrival Date</Form.Label>
                    <Form.Control type="date" value={arrivalDate} onChange={(e)=>setArrivalDate(e.target.value)}></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Number of days</Form.Label>
                    <Form.Control type="number" placeholder="Enter number of days" value={numberofDays} onChange={(e)=>setNumberofDays(e.target.value)}></Form.Control>
                  </Form.Group>
              </ListGroup.Item>
            </ListGroup>
            <Button type="button" className="btn-block mt-3 reservation-btn" onClick={checkoutHandler}>Book a Reservation</Button>
            </Form>
          </Card>
        ):(
            <Card className="p-3">
                <h2 className="fs-3 fw-semibold">BTN {homestay.rate} per night</h2>
                <h3 className="my-3 fw-semibold text-secondary">Currently Unavailable</h3>
                <Button className="reservation-btn-disabled mt-2" variant="secondary" disabled>Book a Reservation</Button>
            </Card>
        )}
        </Col>
      </Row>
    </>
  );
};
export default HomestayPage;
