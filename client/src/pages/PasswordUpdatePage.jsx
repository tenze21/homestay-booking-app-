import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Col, Row, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { useUpdatePasswordMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/usersApiSlice";
import ProfileSidebar from "../components/ProfileSidebar";

function PasswordUpdatePage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [count, setCount] = useState(0);

  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApiCall] = useLogoutMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  useEffect(() => {
    if (count > 3) {
        toast.error("Multiple failed attempts detected. Logging out.");
        const logoutHandler = async () => {
            try {
              await logoutApiCall().unwrap();
              dispatch(logout());
              navigate("/login");
            } catch (err) {
              console.error(err);
            }
          };
        logoutHandler();
    }
  }, [count, dispatch, navigate, logoutApiCall]); 

  const submitHandler = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmpassword) {
      return toast.error("Passwords do not match");
    }
    try {
      const res = await updatePassword({
        userId: { _id: userInfo._id },
        data: {
          currentPassword,
          newPassword,
        },
      }).unwrap();
      toast.success(res.message);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
        setCount(count + 1);
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <Container>
      <Row>
        <Col
          md={2}
          className="border-end position-absolute h-100 top-0 start-0 ps-0 pe-0 pt-5 mb-5"
          style={{ backgroundColor: "white" }}
        >
          <ProfileSidebar passwordUpdate/>
        </Col>
        <Col
          md={10}
          style={{ position: "relative", left: "8rem", top: "-3rem" }}
          className="w-50 mt-5 m-auto"
        >
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="currentpassword" className="my-3">
              <Form.Label className="fs-4 fw-semibold">
                Current Password:
              </Form.Label>
              <Form.Control
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                size="lg"
                required
                placeholder="Enter your current password"
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="newPassword" className="my-3">
              <Form.Label className="fs-4 fw-semibold">
                New Password:
              </Form.Label>
              <Form.Control
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                size="lg"
                minLength={8}
                pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$"
                required
                placeholder="Enter new password"
              ></Form.Control>
              <small className="custom-inst">
                A secure password must have atleast 8 characters including
                atleast 1 number, 1 special character and 1 uppercase letter.
              </small>
            </Form.Group>
            <Form.Group controlId="confirmPassword" className="my-3">
              <Form.Label className="fs-4 fw-semibold">
                Confirm Password:
              </Form.Label>
              <Form.Control
                type="password"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                size="lg"
                required
                placeholder="Confirm password"
              ></Form.Control>
            </Form.Group>
            {isLoading ? (
              <Button
                disabled
                variant="success"
                className="w-25 d-block ms-auto"
              >
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              </Button>
            ) : (
              <Button
                type="submit"
                variant="success"
                className="w-25 d-block ms-auto"
              >
                Update
              </Button>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default PasswordUpdatePage;
