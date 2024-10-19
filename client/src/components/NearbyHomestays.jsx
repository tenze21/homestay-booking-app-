// import homestays from "../data/homestays";
import { Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import Homestay from "./Homestay";

const NearbyHomestays=({homestays})=>{

    const [currentLocation, setCurrentLocation]= useState('');
    const homeStaysInLocation= homestays.filter((homestay)=>homestay.gewog.toLowerCase()===currentLocation.toLowerCase());

    useEffect(()=>{
        const fetchLocation= async()=>{
            function success(position){
                let {coords}=position;
                // perform reverse geocode
                fetch(`https://geocode.maps.co/reverse?lat=${coords.latitude}&lon=${coords.longitude}&api_key=666a968c8194e880102121nxg020d6e`)
                .then(res=>res.json())
                .then(data=>{
                    if(data){
                        // console.log(data);
                        // document.getElementById('location').textContent = `${data.address.county}, ${data.address.city}, ${data.address.country}`;
                        setCurrentLocation(data.address.county);
                    }else{
                        alert("Hmm... we couldn't find you location.");
                    }
                })
                .catch(error => {
                    // document.getElementById('location').textContent = 'Error retrieving location name';
                    alert('Error:', error.message)
                    console.error('Error:', error);
                });
            };
            
            const options={
                enableHighAccuracy: true,
                timeout: 10000,//wait for five minutes
                maximumAge: 0,// specifies that the browser should return the current position and not a cached position.
            };
            
            
            
            function error(error){
                console.error(error);
            };
            
            navigator.geolocation.getCurrentPosition(success, error, options);
        }
        fetchLocation();
    },[currentLocation]);

    return(
        <>
            {currentLocation && <h1 className="fs-3">Homestays in {currentLocation}</h1>} 
            <Row as="section" aria-label="Nearby Homestays" className="mb-3">
                {homeStaysInLocation.length > 0 ? (
                    homeStaysInLocation.map((homestay) => (
                        <Col key={homestay._id} sm={12} md={6} lg={4} xl={3}>
                            <Homestay homestay={homestay}/>
                        </Col>
                    ))
                ) : (
                    <Col sm={12}>
                       {currentLocation && <h3 className="text-muted fw-semibold fs-3 opacity-25">No homestays found in {currentLocation}</h3>} 
                    </Col>
                )}
            </Row>
        </>
    )
}

export default NearbyHomestays;