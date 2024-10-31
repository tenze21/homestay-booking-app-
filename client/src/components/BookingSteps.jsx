import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";

const BookingSteps= ({step1, step2, step3})=>{
    const reservationInfo= useSelector((state)=>state.reservationInfo);
    const {details}= reservationInfo;
    return(
        <Nav className="justify-content-center mb-4">
            <Nav.Item>
                {step1?(
                    <LinkContainer to={`/homestay/${details.homestayId}`}>
                        <Nav.Link className="custom-link fs-4">Details</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled className="fs-4">Details</Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step2?(
                    <LinkContainer to={`/reservation/payment`}>
                        <Nav.Link className="custom-link fs-4">Payment</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled className="fs-4">Payment</Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step3?(
                    <LinkContainer to={`/reservation/book`}>
                        <Nav.Link className="custom-link fs-4">Make Reservation</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled className="fs-4">Make Reservation</Nav.Link>
                )}
            </Nav.Item>
        </Nav>
    )
};
export default BookingSteps;