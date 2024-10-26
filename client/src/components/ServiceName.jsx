import React, { useState } from 'react';
import {Form, Button, Container, Col, Row} from 'react-bootstrap';
import { saveServiceName } from '../slices/propertyListingSlice';
import {useDispatch, useSelector} from 'react-redux';

function ServiceName({setPage}) {
    const propertyInfo = useSelector((state) => state.propertyInfo);
    const {serviceName}= propertyInfo;

    const [name, setName] = useState(serviceName? serviceName : '');
    const dispatch= useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveServiceName(name));
        setPage(1);
    }
  return (
    <Container className='w-50 mt-5'>
        <h2 className='mb-3 fs-4 fw-semibold'>Give your service a name</h2>
        <Form onSubmit={submitHandler}>
            <div className='rounded shadow-sm ps-4 pe-4 pt-3 pb-5 mb-3' style={{backgroundColor: 'white'}}>
                <p className='fw-semibold fs-5 text-muted'>Give your service a short and catchy name. This name will appear as the title of your listing on the platform.</p>
                <Form.Control minLength={5} maxLength={50} className='mb-5' type='text' placeholder='Service Name' value={name} onChange={(e) => setName(e.target.value)} required size='lg'></Form.Control>
            </div>
            <Row>
            <Col md={2}>
            </Col>
            <Col md={10}>
                <Button type='submit' className='d-block w-100 button-custom' size='lg'>Continue</Button>
            </Col>
            </Row>
        </Form>
    </Container>
  )
}

export default ServiceName
