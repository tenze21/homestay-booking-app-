import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {Form, Button, Col, Container} from 'react-bootstrap';
import { savePaymentMethod } from "../slices/reservationSlice";
import BookingSteps from "../components/BookingSteps";

const PaymentPage = ()=>{
   const [paymentMethod, setPaymentMethod]= useState('paypal');

   const dispatch= useDispatch();
   const navigate= useNavigate();

   const reservationInfo= useSelector((state)=>state.reservationInfo);
   const {details}= reservationInfo;

   useEffect(()=>{
       if(!details.homestayId || !details.numberOfGuests || !details.arrivalDate || !details.numberofDays){
           navigate('/');
       }
   },[details, navigate]);

   const submitHandler=(e)=>{
       e.preventDefault();
       dispatch(savePaymentMethod(paymentMethod));
       navigate('/reservation/book');
   }

   return(
    <>
        <BookingSteps step1 step2/>
        <Container className="rounded shadow-sm p-3 w-50" style={{backgroundColor: 'white'}}>
           <h1>Payment Method</h1>
           <Form onSubmit={submitHandler}>
               <Form.Group>
                   <Form.Label as='legend'>Select Method</Form.Label>
                   <Col>
                       <Form.Check type="radio" className="my-2" label="Paypal or Credit Card" id="paypal" name="paymentMethod" value='paypal' checked onChange={(e)=>setPaymentMethod(e.target.value)}></Form.Check>
                   </Col>
               </Form.Group>
               <Button type="submit" className="button-custom mt-3 me-0 ms-0 w-25">Continue</Button>
           </Form>
        </Container>
    </>
   )
}
export default PaymentPage;