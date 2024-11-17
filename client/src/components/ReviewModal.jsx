import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Row, Form } from "react-bootstrap";
import { Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { useCreateReviewMutation } from "../slices/reviewsApiSlice";

function ReviewModal(props) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const [createReview, { isLoading }] = useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("submit");
    
    try {
      await createReview({
        homestayId: { _id: props.homestayId },
        data: {
          rating,
          review,
        },
      }).unwrap();
      props.refetch();
      props.setModalShow(false)
      toast.success("Review posted successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form onSubmit={submitHandler}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Drop a review.
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <fieldset className="d-flex gap-3 justify-content-center align-items-center">
              <input
                type="radio"
                id="rating-1"
                name="rating"
                className="d-none"
                onChange={() => setRating(1)}
                required
              />
              <label htmlFor="rating-1" className="review-label">
                1
              </label>
              <input
                type="radio"
                id="rating-2"
                name="rating"
                className="d-none"
                onChange={() => setRating(2)}
              />
              <label htmlFor="rating-2" className="review-label">
                2
              </label>
              <input
                type="radio"
                id="rating-3"
                name="rating"
                className="d-none"
                onChange={() => setRating(3)}
              />
              <label htmlFor="rating-3" className="review-label">
                3
              </label>
              <input
                type="radio"
                id="rating-4"
                name="rating"
                className="d-none"
                onChange={() => setRating(4)}
              />
              <label htmlFor="rating-4" className="review-label">
                4
              </label>
              <input
                type="radio"
                id="rating-5"
                name="rating"
                className="d-none"
                onChange={() => setRating(5)}
              />
              <label htmlFor="rating-5" className="review-label">
                5
              </label>
            </fieldset>
          </Row>
          <textarea
            name="review"
            id="review"
            className="review-textarea"
            placeholder="Start typing your review..."
            required
            onChange={(e) => setReview(e.target.value)}
            minLength={50}
          ></textarea>
        </Modal.Body>
        <Modal.Footer>
          {isLoading ? (
            <button
              style={{
                backgroundColor: "#ff4500",
                border: "none",
                borderRadius: "8px",
                padding: "0.5rem 1.5rem",
              }}
              disabled
            >
              <Spinner
                as={"span"}
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            </button>
          ) : (
            <Button
              type="submit"
              className="border-0 px-5"
              style={{ backgroundColor: "#ff4500" }}
            >
              Post
            </Button>
          )}
        </Modal.Footer>
      </Form>
    </Modal>
  );
}


export default ReviewModal;
