import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaChevronLeft } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { saveAccomodation } from '../slices/propertyListingSlice';


function Accomodation({setPage}) {
    const propertyInfo= useSelector((state) => state.propertyInfo);
    const {accomodation}= propertyInfo;
    const [propertyAccomodation, setPropertyAccomodation] = useState(accomodation? accomodation: '');
    const dispatch = useDispatch();
    const submitHandler= (e)=>{
        e.preventDefault();
        dispatch(saveAccomodation(propertyAccomodation));
        setPage(3);
    }
  return (
    <Container className='w-50 mt-5'>
        <h2 className='mb-3 fs-4 fw-semibold'>How many people can you accommodate?</h2>
        <Form onSubmit={submitHandler}>
            <div className='rounded shadow-sm ps-4 pe-4 pt-4 pb-5 mb-3' style={{backgroundColor: 'white'}}>
                <Form.Control className='mb-5' type='number' inputMode='numeric' placeholder='Number of people accomodable' value={propertyAccomodation} onChange={(e) => setPropertyAccomodation(e.target.value)} required size='lg'></Form.Control>
            </div>
            <Row>
            <Col md={2}>
            <Button
              className="w-100 form-back-btn"
              size="lg"
              onClick={() => {
                setPage(1);
              }}
            >
              <FaChevronLeft size={24} />
            </Button>
            </Col>
            <Col md={10}>
                <Button type='submit' className='d-block w-100 button-custom' size='lg'>Continue</Button>
            </Col>
            </Row>
        </Form>
    </Container>
  )
};

export default Accomodation;
