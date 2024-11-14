import React from 'react';
import { useSelector } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
} from "react-bootstrap";
import '../assets/styles/userReservation.css';
import { LinkContainer } from 'react-router-bootstrap';
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import Loader from '../components/Loader';
import Message from '../components/Message';
import ProfileSidebar from '../components/ProfileSidebar';
import { useGetUserReservationsQuery } from '../slices/usersApiSlice';

function UserReservationsPage() {
  const {userInfo}= useSelector((state)=>state.auth);
  const {
    data: reservations,
    isLoading,
    error
  }= useGetUserReservationsQuery(userInfo._id);

  return (
    <Row>
      <Col
        md={2}
        className="border-end position-absolute h-100 top-0 start-0 ps-0 pe-0 pt-5 mb-5"
        style={{ backgroundColor: "white" }}
      >
        <ProfileSidebar reservations/>
      </Col>
      <Col md={10} className='wrapper'>
      {isLoading? (
        <Loader/>
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
        <>
        <ListGroup variant='flush' className='mt-3'>
          <ListGroup.Item style={{backgroundColor: "transparent"}}>
            <h1 className='fs-2'>My Reservations</h1>
          </ListGroup.Item>
        </ListGroup>
        <ListGroup variant='flush'>
          {reservations.length===0 && (
            <Message variant={"info"}>No reservations to show</Message>
          )}
          {reservations.map((reservation)=>(
            reservation.status==='Pending'?(
              <LinkContainer key={reservation.reservation_id} to={`/reservation/${reservation.reservation_id}`} className='cursor'>
                <ListGroup.Item className='cursor border-bottom' style={{backgroundColor: "transparent"}}>
                  <Row className='cursor'>
                    <Col md={6}><h2 className='cursor fs-4'>{reservation.title}</h2></Col>
                    <Col md={3}><p className='cursor'>USD {reservation.total_payment}</p></Col>
                    <Col md={3}><p className='cursor'>{reservation.created_at.split('T')[0]}</p></Col>
                  </Row>
                  {reservation.isPaid===false && <small className='text-danger fw-semibold'>Not paid</small>}
                </ListGroup.Item>
              </LinkContainer>
            ) : reservation.status==='No show'? (
              <LinkContainer key={reservation.reservation_id} to={`/reservation/${reservation.reservation_id}`} className='cursor'>
                <ListGroup.Item className='cursor border-bottom' style={{backgroundColor: "transparent"}}>
                  <Row className='cursor'>
                    <Col md={5}><h2 className='cursor fs-4'>{reservation.title}</h2></Col>
                    <Col md={3}><p className='cursor'>USD {reservation.total_payment}</p></Col>
                    <Col md={3}><p className='cursor'>{reservation.created_at.split('T')[0]}</p></Col>
                    <Col md={1}><p className='cursor' title='No show'><MdClose className='text-danger'/></p></Col>
                  </Row>
                </ListGroup.Item>
              </LinkContainer>
            ) : (
              <LinkContainer key={reservation.reservation_id} to={`/reservation/${reservation.reservation_id}`} className='cursor'>
                <ListGroup.Item className='cursor border-bottom' style={{backgroundColor: "transparent"}}>
                  <Row className='cursor'>
                    <Col md={5}><h2 className='cursor fs-4'>{reservation.title}</h2></Col>
                    <Col md={3}><p className='cursor'>USD {reservation.total_payment}</p></Col>
                    <Col md={3}><p className='cursor'>{reservation.created_at.split('T')[0]}</p></Col>
                    <Col md={1}><p className='cursor' title='completed'><FaCheck className='text-success'/></p></Col>
                  </Row>
                </ListGroup.Item>
              </LinkContainer>
            )
          ))}
        </ListGroup>
        </>
      )}
      </Col>
    </Row>
  )
}

export default UserReservationsPage;
