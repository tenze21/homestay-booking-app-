import React from "react";
import { Nav } from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'

function ListingSteps({step1, step2, step3}) {
  return <Nav className="justify-content-center">
    <Nav.Item>
        {step1?(
            <LinkContainer to={"/property_listing/basic_information"}>
                <Nav.Link className="fs-4 fw-semibold custom-link">Basic Information</Nav.Link>
            </LinkContainer>
        ) : (
            <Nav.Link disabled className="fs-4 fw-semibold">Basic Information</Nav.Link>
        )}
    </Nav.Item>
    <Nav.Item>
        {step2?(
            <LinkContainer to={"/property_listing/service_setup"}>
                <Nav.Link className="fs-4 fw-semibold custom-link">Service Setup</Nav.Link>
            </LinkContainer>
        ) : (
            <Nav.Link disabled className="fs-4 fw-semibold">Service Setup</Nav.Link>
        )}
    </Nav.Item>
    <Nav.Item>
        {step3?(
            <LinkContainer to={"/property_listing/finish_up"}>
                <Nav.Link className="fs-4 fw-semibold custom-link">Finish Up</Nav.Link>
            </LinkContainer>
        ) : (
            <Nav.Link disabled className="fs-4 fw-semibold">Finish Up</Nav.Link>
        )}
    </Nav.Item>
  </Nav>;
}

export default ListingSteps;
