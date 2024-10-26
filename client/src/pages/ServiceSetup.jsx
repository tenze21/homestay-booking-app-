import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ListingSteps from "../components/ListingSteps";
import Facilities from "../components/Facilities";
import Rules from "../components/Rules";
import Accomodation from "../components/Accomodation";
import Timing from "../components/Timing";
import Description from "../components/Description";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ServiceSetup() {
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  const propertyInfo = useSelector((state) => state.propertyInfo);
  const {
    propertyLocation,
    facilities,
    rules,
    accomodation,
    timing,
    description,
  } = propertyInfo;

  useEffect(() => {
    if (!propertyLocation.dzongkhag || !propertyLocation.gewog) {
      navigate("/property_listing/basic_information");
    }
  }, [propertyLocation, navigate]);

  useEffect(() => {
    if (facilities.length > 0) {
      setPage(1);
    };
    if(rules.length>0){
      setPage(2);
    };
    if(accomodation!==''){
      setPage(3);
    };
    if(timing.check_in && timing.check_out){
      setPage(4);
    };
  }, [facilities, rules, accomodation, timing, description]);

  return (
    <Container>
      <ListingSteps step1 step2 />
      {page === 0 && <Facilities setPage={setPage} />}
      {page === 1 && <Rules setPage={setPage} />}
      {page === 2 && <Accomodation setPage={setPage} />}
      {page === 3 && <Timing setPage={setPage} />}
      {page === 4 && <Description setPage={setPage} />}
    </Container>
  );
}

export default ServiceSetup;
