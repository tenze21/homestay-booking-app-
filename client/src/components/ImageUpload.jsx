import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Image,
  Spinner,
} from "react-bootstrap";
import { FaChevronLeft } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { toast } from "react-toastify";
import Loader from "./Loader";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useCreateHomestayMutation,
  useUploadHomestayImageMutation,
} from "../slices/homestaysApiSlice";
import {
  useCreateHostMutation,
  useUpdateUserRoleMutation,
} from "../slices/usersApiSlice";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";

function ImageUpload({ setPage }) {
  const [propertyImages, setPropertyImages] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const propertyInfo = useSelector((state) => state.propertyInfo);
  const {
    serviceName,
    propertyLocation,
    facilities,
    accomodation,
    timing,
    rules,
    rate,
    description,
    hostDetails,
  } = propertyInfo;
  const { dzongkhag, gewog, latitude, longitude } = propertyLocation;
  const { check_in, check_out } = timing;
  const {
    education,
    spoken_languages,
    profession,
    date_of_birth,
    account_number,
    account_holder_name,
    bank_name,
    bio,
  } = hostDetails;
  const { userInfo } = useSelector((state) => state.auth);

  const [uploadHomestayImage, { isLoading: loadingUpload }] =
    useUploadHomestayImageMutation();
  const [createHomestay, { isLoading: loadingCreate }] =
    useCreateHomestayMutation();
  const [createHost, { isLoading: loadingHost }] = useCreateHostMutation();
  const [updateUserRole, { isLoading: loadingUpdate }] =
    useUpdateUserRoleMutation();
  const [logoutApiCall] = useLogoutMutation();

  const uploadImageHandler = async (e) => {
    const formData = new FormData();
    propertyImages.forEach((image) => {
      formData.append("images", image);
    });
    try {
      const res = await uploadHomestayImage(formData).unwrap();
      toast.success(res.message);
      return res.images;
    } catch (err) {
      toast.error(err?.data?.message || err.error);
      return [];
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const uploadedImages= await uploadImageHandler();
      await createHomestay({
        userId: userInfo._id,
        serviceName,
        dzongkhag,
        gewog,
        latitude,
        longitude,
        facilities,
        rules,
        accomodation,
        checkIn: check_in,
        checkOut: check_out,
        description,
        rate,
        images: uploadedImages,
      }).unwrap();
      await createHost({
        userId: userInfo._id,
        education,
        spokenLanguages: spoken_languages,
        profession,
        dateOfBirth: date_of_birth,
        accountNumber: account_number,
        accountHolderName: account_holder_name,
        bankName: bank_name,
        bio,
      }).unwrap();
      await updateUserRole({ isHost: true, userId: userInfo._id }).unwrap();
      await logoutApiCall().unwrap();
      dispatch(logout());
      localStorage.removeItem("propertyInfo");
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container className="w-50 mt-5">
      {loadingUpload || loadingCreate || loadingHost || loadingUpdate ? (
        <Loader />
      ) : null}
      <h2 className="mb-3 fs-4 fw-semibold">
        You have made it to the final step. Upload images of your property.
      </h2>
      <Form onSubmit={submitHandler}>
        <div
          className="rounded shadow-sm ps-4 pe-4 pt-4 pb-5 mb-3"
          style={{ backgroundColor: "white" }}
        >
          <p className="text-muted mb-2">
            Don't have a proper picture right now? It's fine you can always
            change it later. Please note that the first image you upload will be
            used as the main image for your service.
          </p>
          <p>Upload 5 pictures.</p>
          <label
            htmlFor="property-image"
            className="image-upload d-flex flex-column justify-content-center align-items-center"
          >
            <p className="m-0 fw-semibold">Drag & Drop</p>
            <p className="m-0 fw-semibold">or</p>
            <p className="m-0 fw-semibold text-primary">click to browse</p>
          </label>
          <input
            type="file"
            id="property-image"
            accept="image/*"
            multiple
            className="mb-5 d-none"
            onChange={(e) => {
              const selectedFiles = Array.from(e.target.files);
              if (propertyImages.length + selectedFiles.length <= 5) {
                setPropertyImages([...propertyImages, ...selectedFiles]);
              } else {
                alert("You can only upload up to 5 images");
              }
            }}
            required
            size="lg"
          ></input>
          {propertyImages.length === 1 ? (
            <Row className="img-wrapper">
              <Col md={3} className="position-relative p-2">
                <Button
                  variant="light"
                  className="p-0 rounded-circle opacity-75"
                  onClick={() => {
                    const newImages = [...propertyImages];
                    newImages.splice(0, 1);
                    setPropertyImages(newImages);
                  }}
                >
                  <IoIosClose size={24} />
                </Button>
                {propertyImages.length > 0 && (
                  <Image src={URL.createObjectURL(propertyImages[0])} fluid />
                )}
              </Col>
            </Row>
          ) : propertyImages.length === 2 ? (
            <Row className="img-wrapper">
              <Col md={3} className="position-relative p-2">
                <Button
                  variant="light"
                  className="p-0 rounded-circle opacity-75"
                  onClick={() => {
                    const newImages = [...propertyImages];
                    newImages.splice(0, 1);
                    setPropertyImages(newImages);
                  }}
                >
                  <IoIosClose size={24} />
                </Button>
                {propertyImages.length > 0 && (
                  <Image src={URL.createObjectURL(propertyImages[0])} fluid />
                )}
              </Col>
              <Col md={3} className="position-relative p-2">
                <Button
                  variant="light"
                  className="p-0 rounded-circle opacity-75"
                  onClick={() => {
                    const newImages = [...propertyImages];
                    newImages.splice(1, 1);
                    setPropertyImages(newImages);
                  }}
                >
                  <IoIosClose size={24} />
                </Button>
                {propertyImages.length > 1 && (
                  <Image src={URL.createObjectURL(propertyImages[1])} fluid />
                )}
              </Col>
            </Row>
          ) : propertyImages.length === 3 ? (
            <Row className="img-wrapper">
              <Col md={3} className="position-relative p-2">
                <Button
                  variant="light"
                  className="p-0 rounded-circle opacity-75"
                  onClick={() => {
                    const newImages = [...propertyImages];
                    newImages.splice(0, 1);
                    setPropertyImages(newImages);
                  }}
                >
                  <IoIosClose size={24} />
                </Button>
                {propertyImages.length > 0 && (
                  <Image src={URL.createObjectURL(propertyImages[0])} fluid />
                )}
              </Col>
              <Col md={3} className="position-relative p-2">
                <Button
                  variant="light"
                  className="p-0 rounded-circle opacity-75"
                  onClick={() => {
                    const newImages = [...propertyImages];
                    newImages.splice(1, 1);
                    setPropertyImages(newImages);
                  }}
                >
                  <IoIosClose size={24} />
                </Button>
                {propertyImages.length > 1 && (
                  <Image src={URL.createObjectURL(propertyImages[1])} fluid />
                )}
              </Col>
              <Col md={3} className="position-relative p-2">
                <Button
                  variant="light"
                  className="p-0 rounded-circle opacity-75"
                  onClick={() => {
                    const newImages = [...propertyImages];
                    newImages.splice(2, 1);
                    setPropertyImages(newImages);
                  }}
                >
                  <IoIosClose size={24} />
                </Button>
                {propertyImages.length > 2 && (
                  <Image src={URL.createObjectURL(propertyImages[2])} fluid />
                )}
              </Col>
            </Row>
          ) : propertyImages.length === 4 ? (
            <Row className="img-wrapper">
              <Col md={3} className="position-relative p-2">
                <Button
                  variant="light"
                  className="p-0 rounded-circle opacity-75"
                  onClick={() => {
                    const newImages = [...propertyImages];
                    newImages.splice(0, 1);
                    setPropertyImages(newImages);
                  }}
                >
                  <IoIosClose size={24} />
                </Button>
                {propertyImages.length > 0 && (
                  <Image src={URL.createObjectURL(propertyImages[0])} fluid />
                )}
              </Col>
              <Col md={3} className="position-relative p-2">
                <Button
                  variant="light"
                  className="p-0 rounded-circle opacity-75"
                  onClick={() => {
                    const newImages = [...propertyImages];
                    newImages.splice(1, 1);
                    setPropertyImages(newImages);
                  }}
                >
                  <IoIosClose size={24} />
                </Button>
                {propertyImages.length > 1 && (
                  <Image src={URL.createObjectURL(propertyImages[1])} fluid />
                )}
              </Col>
              <Col md={3} className="position-relative p-2">
                <Button
                  variant="light"
                  className="p-0 rounded-circle opacity-75"
                  onClick={() => {
                    const newImages = [...propertyImages];
                    newImages.splice(2, 1);
                    setPropertyImages(newImages);
                  }}
                >
                  <IoIosClose size={24} />
                </Button>
                {propertyImages.length > 2 && (
                  <Image src={URL.createObjectURL(propertyImages[2])} fluid />
                )}
              </Col>
              <Col md={3} className="position-relative p-2">
                <Button
                  variant="light"
                  className="p-0 rounded-circle opacity-75"
                  onClick={() => {
                    const newImages = [...propertyImages];
                    newImages.splice(3, 1);
                    setPropertyImages(newImages);
                  }}
                >
                  <IoIosClose size={24} />
                </Button>
                {propertyImages.length > 3 && (
                  <Image src={URL.createObjectURL(propertyImages[3])} fluid />
                )}
              </Col>
            </Row>
          ) : propertyImages.length === 5 ? (
            <Row className="img-wrapper">
              <Col md={3} className="position-relative p-2">
                <Button
                  variant="light"
                  className="p-0 rounded-circle opacity-75"
                  onClick={() => {
                    const newImages = [...propertyImages];
                    newImages.splice(0, 1);
                    setPropertyImages(newImages);
                  }}
                >
                  <IoIosClose size={24} />
                </Button>
                {propertyImages.length > 0 && (
                  <Image src={URL.createObjectURL(propertyImages[0])} fluid />
                )}
              </Col>
              <Col md={3} className="position-relative p-2">
                <Button
                  variant="light"
                  className="p-0 rounded-circle opacity-75"
                  onClick={() => {
                    const newImages = [...propertyImages];
                    newImages.splice(1, 1);
                    setPropertyImages(newImages);
                  }}
                >
                  <IoIosClose size={24} />
                </Button>
                {propertyImages.length > 1 && (
                  <Image src={URL.createObjectURL(propertyImages[1])} fluid />
                )}
              </Col>
              <Col md={3} className="position-relative p-2">
                <Button
                  variant="light"
                  className="p-0 rounded-circle opacity-75"
                  onClick={() => {
                    const newImages = [...propertyImages];
                    newImages.splice(2, 1);
                    setPropertyImages(newImages);
                  }}
                >
                  <IoIosClose size={24} />
                </Button>
                {propertyImages.length > 2 && (
                  <Image src={URL.createObjectURL(propertyImages[2])} fluid />
                )}
              </Col>
              <Col md={3} className="position-relative p-2">
                <Button
                  variant="light"
                  className="p-0 rounded-circle opacity-75"
                  onClick={() => {
                    const newImages = [...propertyImages];
                    newImages.splice(3, 1);
                    setPropertyImages(newImages);
                  }}
                >
                  <IoIosClose size={24} />
                </Button>
                {propertyImages.length > 3 && (
                  <Image src={URL.createObjectURL(propertyImages[3])} fluid />
                )}
              </Col>
              <Col md={3} className="position-relative p-2">
                <Button
                  variant="light"
                  className="p-0 rounded-circle opacity-75"
                  onClick={() => {
                    const newImages = [...propertyImages];
                    newImages.splice(4, 1);
                    setPropertyImages(newImages);
                  }}
                >
                  <IoIosClose size={24} />
                </Button>
                {propertyImages.length > 4 && (
                  <Image src={URL.createObjectURL(propertyImages[4])} fluid />
                )}
              </Col>
            </Row>
          ) : (
            ""
          )}
        </div>
        <Row>
          <Col md={2}>
            <Button
              className="w-100 form-back-btn"
              size="lg"
              onClick={() => {
                setPage(1);
              }}
            >
              <FaChevronLeft size={24} />
            </Button>
          </Col>
          <Col md={10}>
            {loadingCreate || loadingHost || loadingUpdate || loadingUpload ? (
              <Button
                type="submit"
                disabled
                className="d-block w-100 button-custom"
                size="lg"
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
                className="d-block w-100 button-custom"
                size="lg"
              >
                Submit
              </Button>
            )}
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default ImageUpload;
