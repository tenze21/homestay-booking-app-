import React, { useEffect } from "react";
import { Row, Col, Image } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useSelector, useDispatch } from "react-redux";
import { FaStar } from "react-icons/fa";
import { useGetHostHomestayQuery } from "../slices/homestaysApiSlice";
import { useGetReviewsQuery } from "../slices/reviewsApiSlice";
import { setNavigation } from "../slices/navigationSlice";

function HostReviewsPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setNavigation(3));
  }, [dispatch]);
  const { userInfo } = useSelector((state) => state.auth);
  const {
    data: homestay,
    isLoading,
    error,
  } = useGetHostHomestayQuery(userInfo._id);

  const {
    data: reviews,
    isLoading: loadingReview,
    error: reviewError,
  } = useGetReviewsQuery(homestay?.homestay_id);
  return (
    <>
      <h1 className="p-0 mb-4">Reviews</h1>
      {isLoading || loadingReview ? (
        <Loader />
      ) : error || reviewError ? (
        <>
          <Message variant={"danger"}>
            {error?.data?.message || error.error}
          </Message>
          <Message variant={"danger"}>
            {reviewError?.data?.message || error.error}
          </Message>
        </>
      ) : (
        <Row>
          {reviews.length === 0 && (
            <Message variant={"info"}>No reviews to show yet</Message>
          )}
          {reviews.map((review) => (
            <Col key={review.review_id} md={6}>
              <Row className="align-items-center">
                <Col md={2} className="p-0" style={{ width: "60px" }}>
                  <Image
                    src={review.profile}
                    className="rounded-circle ms-3"
                    style={{ width: "50px", height: "50px" }}
                  />
                </Col>
                <Col md={9} className="ps-3">
                  <p className="m-0 fw-semibold">{review.full_name}</p>
                  <p className="m-0 fw-semibold text-muted">
                    {review.country}, {review.region}
                  </p>
                </Col>
              </Row>
              <p className="mt-2 mb-0 fw-semibold fs-5">
                {review.rating}(<FaStar />)
              </p>
              <p className="mb-1">{review.review}</p>
              <p className="fw-semibold text-muted">
                {review.created_at.split("T")[0]}
              </p>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}

export default HostReviewsPage;
