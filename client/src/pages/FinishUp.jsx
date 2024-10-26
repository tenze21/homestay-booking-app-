import React, { useState } from "react";
import { Container } from "react-bootstrap";
import ListingSteps from "../components/ListingSteps";
import HostDetails from "../components/HostDetails";
import Pricing from "../components/Pricing";
import ImageUpload from "../components/ImageUpload";

function FinishUp() {
  const [page, setPage] = useState(0);
  return (
    <Container>
      <ListingSteps step1 step2 step3 />
      {page === 0 && <HostDetails setPage={setPage} />}
      {page === 1 && <Pricing setPage={setPage} />}
      {page === 2 && <ImageUpload setPage={setPage} />}
    </Container>
  );
}

export default FinishUp;
