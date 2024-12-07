import React, {useState, useEffect} from 'react'
import {Form, Button, Container, Col, Row} from 'react-bootstrap';
import { FaChevronLeft } from "react-icons/fa";
import { savePropertyLocation } from '../slices/propertyListingSlice';
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Location({setPage}) {
    const propertyInfo= useSelector((state) => state.propertyInfo);
    const {propertyLocation}= propertyInfo;

    const [dzongkhag, setDzongkhag] = useState(propertyLocation?.dzongkhag || '');
    const [gewog, setGewog] = useState(propertyLocation?.gewog || '');
    const [latitude, setLatitude] = useState(propertyLocation?.latitude || '');
    const [longitude, setLongitude] = useState(propertyLocation?.longitude || '');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchLocation= async()=>{
            function success(position){
                let {coords}=position;
                fetch(`https://geocode.maps.co/reverse?lat=${coords.latitude}&lon=${coords.longitude}&api_key=666a968c8194e880102121nxg020d6e`)
                .then(res=>res.json())
                .then(data=>{
                    if(data){
                        // console.log(data);
                        setLatitude(data.lat);
                        setLongitude(data.lon);
                        setDzongkhag(data.address.state);
                        setGewog(data.address.county);
                    }else{
                        alert("Hmm... we couldn't find you location.");
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            };
            const options={
                enableHighAccuracy: true,
                timeout: 60000,
                maximumAge: 0,
            };
            function error(error){
                console.error(error);
            };
            
            navigator.geolocation.getCurrentPosition(success, error, options);
        }
        fetchLocation();
    },[latitude, longitude, dzongkhag, gewog]);

    const submitHandler= (e) => {
        e.preventDefault();
        dispatch(savePropertyLocation({dzongkhag, gewog, latitude, longitude}));
        navigate('/property_listing/service_setup');
    }
  return (
    <Container className='w-50 mt-5'>
        <h2 className='mb-3 fs-4 fw-semibold'>Where is your property located?</h2>
        <Form onSubmit={submitHandler}>
            <div className='rounded shadow-sm ps-4 pe-4 pt-3 pb-5 mb-3' style={{backgroundColor: 'white'}}>
                <p className='fw-semibold fs-5 text-muted'>Please ensure that you are at your property location because will be getting your exact location automatically to avoid inaccuracies.</p>
                <Form.Control minLength={5} maxLength={50} className='my-3' type='text' placeholder='Dzongkhag' value={dzongkhag} required size='lg'></Form.Control>
                <Form.Control minLength={5} maxLength={50} className='mb-5' type='text' placeholder='Gewog' value={gewog} required size='lg'></Form.Control>
            </div>
            <Row>
            <Col md={2}>
                <Button className='w-100 form-back-btn' size='lg' onClick={() => setPage(0)}><FaChevronLeft size={24}/></Button>
            </Col>
            <Col md={10}>
                <Button type='submit' className='w-100 button-custom' size='lg'>Continue</Button>
            </Col>
            </Row>
        </Form>
    </Container>
  )
}

export default Location;
