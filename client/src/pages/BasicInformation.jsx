import React, {useState, useEffect} from "react";
import { Container} from "react-bootstrap";
import ListingSteps from "../components/ListingSteps";
import ServiceName from "../components/ServiceName";
import Location from "../components/Location";
import { useSelector } from "react-redux";

function BasicInformation() {
  const [page, setPage]= useState(0);
  const propertyInfo = useSelector((state) => state.propertyInfo);
  const {propertyLocation}= propertyInfo;

  useEffect(()=>{
    if(propertyLocation.dzongkhag && propertyLocation.gewog){
      setPage(1);
    }
  },[propertyLocation]);

  return (
    <Container>
      <ListingSteps step1/>
      {page === 0 && <ServiceName setPage={setPage}/>}
      {page === 1 && <Location setPage={setPage}/>}
    </Container>
  );
}

export default BasicInformation;
