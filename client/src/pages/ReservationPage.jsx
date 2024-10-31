import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Container
} from "react-bootstrap";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useGetReservationDetailsQuery, usePayReservationMutation, useGetPaypalClientIdQuery, useInsertPaymentDetailsMutation } from "../slices/reservationApiSlice";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
function ReservationPage() {
    const {id: reservationId} = useParams();
    const {data: reservationDetails, refetch, isLoading, error} = useGetReservationDetailsQuery(reservationId);

    const [payReservation, {isLoading: loadingPay}]= usePayReservationMutation();

    const [{isPending}, paypalDispatch] = usePayPalScriptReducer();

    const {data: paypal, isLoading: loadingPaypal, error: paypalError} = useGetPaypalClientIdQuery();
    const [insertPaymentDetails, {isLoading: loadingInsertPayment}]= useInsertPaymentDetailsMutation();

    useEffect(()=>{
        if(!paypalError && !loadingPaypal && paypal.clientId){
            const loadPayPalScript = async () => {
                paypalDispatch({
                    type: "resetOptions",
                    value: {
                        "client-id": paypal.clientId,
                        currency: "USD",
                    },
                });
                paypalDispatch({type: "setLoadingStatus", value: "pending"});
            };
            if(reservationDetails && !reservationDetails.isPaid){
                if(!window.paypal){
                    loadPayPalScript();
                }
            }
        }

    },[paypal, reservationDetails, loadingPaypal, paypalError, paypalDispatch]);

    function onApprove(data, actions){
        return actions.order.capture().then(async function (details){
            try {
                await payReservation(reservationId);
                await insertPaymentDetails({reservationId, details});
                refetch();
                toast.success("Payment successful!");
            } catch (err) {
                toast.error(err?.data?.message || err.message);
            }
        })
    }

    function onError(err){
        toast.error(err.message);
    }

    function createOrder(data, actions) {
        const totalPayment = parseFloat(reservationDetails.total_payment).toFixed(2);
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: totalPayment
                    }
                }
            ]
        });
    }
  return isLoading? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error?.data?.message || error.error}</Message>
  ) : (
    <>
    <h1>Reservation ID: {reservationDetails.reservation_id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
                <p className="fs-4"><strong>Homestay Name:</strong>{' '} <Link to={`/homestay/${reservationDetails.homestay_id}`} target="_blank">{reservationDetails.title}.</Link></p>  
                <p className="fs-4"><strong>Location:</strong>{' '} {reservationDetails.dzongkhag}, {reservationDetails.gewog}.</p>  
                <p className="fs-4"><strong>Hosted by:</strong>{' '} {reservationDetails.host_full_name}.</p>  
            </ListGroup.Item>
            <ListGroup.Item>
                <h3>Reservation Details</h3>
                <p className="fs-4"><strong>Number of guests:</strong>{' '} {reservationDetails.num_guests}</p>
                <p className="fs-4"><strong>Arrival date:</strong>{' '} {reservationDetails.arrival_date.split('T')[0]}</p>
                <p className="fs-4"><strong>Number of days:</strong>{' '} {reservationDetails.num_days}</p>
                {reservationDetails.status==='Pending' && <Message variant="info">Pending</Message>}
                {reservationDetails.status==='No show' && <Message variant="danger">Didn't show up</Message>}
                {reservationDetails.status==='Completed' && <Message variant="success">Completed</Message>}
            </ListGroup.Item>
            <ListGroup.Item>
                <h3>Payment Method</h3>
                <p className="fs-4"><strong>Method: </strong>{' '} {reservationDetails.payment_method}</p>
                {reservationDetails.ispaid ? (
                <Message variant="success">Paid on {reservationDetails.paidat.split('T')[0]}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
        <Card>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <h3>Reservation Summary</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col className="fw-semibold">Total Amount in BTN: </Col>
                        <Col>{reservationDetails.rate * reservationDetails.num_guests * reservationDetails.num_days}</Col>
                    </Row>
                    <Row>
                        <Col className="fw-semibold">Total amount in USD: </Col>
                        <Col>{reservationDetails.total_payment}</Col>
                    </Row>
                </ListGroup.Item>
                {!reservationDetails.ispaid && (
                    <ListGroup.Item>
                        {loadingPaypal && <Loader />}
                        {isPending? (
                            <Loader/>
                        ) : (
                            <div>
                                <PayPalButtons
                                createOrder={createOrder}
                                onApprove={onApprove}
                                onError={onError}
                                ></PayPalButtons>
                            </div>
                        )}
                    </ListGroup.Item>
                )}
            </ListGroup>
        </Card>
        </Col>
      </Row>
    </>
  )
};

export default ReservationPage;
