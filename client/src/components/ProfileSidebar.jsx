import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Nav } from "react-bootstrap";

function ProfileSidebar() {
  return (
    <>
      <LinkContainer
        to={"/user/profile"}
        className="pb-2 pt-2 fs-4 fw-semibold ps-2 custom-sidebar-link"
      >
        <Nav.Link>Profile</Nav.Link>
      </LinkContainer>
      <LinkContainer
        to={"/user/updatepassword"}
        className="pb-2 pt-2 fs-4 fw-semibold ps-2 custom-sidebar-link"
      >
        <Nav.Link>Update Password</Nav.Link>
      </LinkContainer>
      <LinkContainer
        to={"/user/reservations"}
        className="pb-2 pt-2 fs-4 fw-semibold ps-2 custom-sidebar-link"
      >
        <Nav.Link>My Reservations</Nav.Link>
      </LinkContainer>
    </>
  );
}

export default ProfileSidebar;
