import React, { useState, useEffect } from "react";
import "../assets/styles/propertyPage.css";
import { Row, Col, Image, Button, Form, InputGroup } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { FaCamera } from "react-icons/fa6";
import Loader from "../components/Loader";
import Message from "../components/Message";
import ConfirmationModal from "../components/DeleteConfirmModal";
import { toast } from "react-toastify";
import {
  useGetHostHomestayQuery,
  useUpdateHomestayImageMutation,
  useUpdateHomestayMutation,
  useUpdateAvailabilityMutation,
} from "../slices/homestaysApiSlice";
import { setNavigation } from "../slices/navigationSlice";

function PropertyPage() {
  const { userInfo } = useSelector((state) => state.auth);
  const {
    data: homestay,
    refetch,
    isLoading,
    error,
  } = useGetHostHomestayQuery(userInfo._id);
  const [updateImage, { isLoading: loadingUpload }] =
    useUpdateHomestayImageMutation();
  const [updateHomestay, { isLoading: loadingUpdate }] =
    useUpdateHomestayMutation();
  const [updateAvailability] = useUpdateAvailabilityMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setNavigation(1));
  }, [dispatch]);

  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [facilities, setFacilities] = useState([]);
  const [rules, setRules] = useState([]);
  const [accomodation, setAccomodation] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [description, setDescription] = useState("");
  const [rate, setRate] = useState(0);

  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    if (homestay) {
      setImages(homestay.images);
      setTitle(homestay.title);
      setFacilities(homestay.facilities);
      setRules(homestay.rules);
      setAccomodation(homestay.accomodation);
      setCheckIn(homestay.check_in);
      setCheckOut(homestay.check_out);
      setDescription(homestay.description);
      setRate(homestay.rate);
    }
  }, [homestay]);

  const imageUpdateHandler = async (e, index) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    formData.append("imageIndex", index);
    try {
      const res = await updateImage({
        homestayId: { _id: homestay.homestay_id },
        data: { formData },
      }).unwrap();
      toast.success(res.message);
      const updatedImages = [...images];
      updatedImages.splice(index, 1, res.image);
      setImages(updatedImages);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const resetHandler = () => {
    refetch();
    setImages(homestay.images);
    setTitle(homestay.title);
    setFacilities(homestay.facilities);
    setRules(homestay.rules);
    setAccomodation(homestay.accomodation);
    setCheckIn(homestay.check_in);
    setCheckOut(homestay.check_out);
    setDescription(homestay.description);
    setRate(homestay.rate);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateHomestay({
        homestayId: { _id: homestay.homestay_id },
        data: {
          title,
          images,
          facilities,
          checkIn,
          checkOut,
          rate,
          rules,
          accomodation,
          description,
        },
      }).unwrap();
      refetch();
      toast.success("Property details updated successfully.");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const updateAvailabilityHandler= async ()=>{
    try {
      await updateAvailability({homestayId: homestay.homestay_id, isAvailable: !homestay.isavaliable}).unwrap();
      toast.success("Your homestay is now " + (homestay.isavaliable ? "unavailable " : "available ") + "for reservation.");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  return (
    <main>
      {isLoading || loadingUpload ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Form className="border-bottom" onSubmit={submitHandler}>
            <Form.Check
              type="switch"
              label="Active"
              className="mb-3 position-relative fw-semibold fs-3"
              style={{ color: "#ff4500", left: "80vw" }}
              checked={homestay.isavaliable}
              onChange={updateAvailabilityHandler}
            />
            <Row>
              <Col sm={12} md={12} lg={6} className="position-relative">
                <Image src={images[0]} fluid className="main_img" />
                <Form.Group>
                  <label
                    htmlFor="main-image"
                    className="position-absolute main-label"
                  >
                    <FaCamera size={40} />
                  </label>
                  <Form.Control
                    type="file"
                    name="image"
                    id="main-image"
                    className="d-none"
                    onChange={(e) => imageUpdateHandler(e, 0)}
                  />
                </Form.Group>
              </Col>
              <Col sm={12} md={12} lg={6}>
                <Row className="mb-3">
                  <Col sm={12} md={12} lg={6} className="position-relative">
                    <Image src={images[1]} fluid className="sub_img" />
                    <Form.Group>
                      <label
                        htmlFor="sub-image-1"
                        className="position-absolute label"
                      >
                        <FaCamera size={32} />
                      </label>
                      <Form.Control
                        type="file"
                        name="image"
                        id="sub-image-1"
                        className="d-none"
                        onChange={(e) => imageUpdateHandler(e, 1)}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={12} md={12} lg={6} className="position-relative">
                    <Image
                      src={images[2]}
                      fluid
                      className="radius-top sub_img"
                    />
                    <Form.Group>
                      <label
                        htmlFor="sub-image-2"
                        className="position-absolute label"
                      >
                        <FaCamera size={32} />
                      </label>
                      <Form.Control
                        type="file"
                        name="image"
                        id="sub-image-2"
                        className="d-none"
                        onChange={(e) => imageUpdateHandler(e, 2)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12} md={12} lg={6} className="position-relative">
                    <Image src={images[3]} fluid className="sub_img" />
                    <Form.Group>
                      <label
                        htmlFor="sub-image-3"
                        className="position-absolute label"
                      >
                        <FaCamera size={32} />
                      </label>
                      <Form.Control
                        type="file"
                        name="image"
                        id="sub-image-3"
                        className="d-none"
                        onChange={(e) => imageUpdateHandler(e, 3)}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={12} md={12} lg={6} className="position-relative">
                    <Image
                      src={images[4]}
                      fluid
                      className="radius-bottom sub_img"
                    />
                    <Form.Group>
                      <label
                        htmlFor="sub-image-4"
                        className="position-absolute label"
                      >
                        <FaCamera size={32} />
                      </label>
                      <Form.Control
                        type="file"
                        name="image"
                        id="sub-image-4"
                        className="d-none"
                        onChange={(e) => imageUpdateHandler(e, 4)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Form.Group className="my-3 w-50">
              <Form.Label htmlFor="title" className="fw-semibold fs-4">
                Service Name:
              </Form.Label>
              <Form.Control
                type="text"
                name="title"
                id="title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="fs-5"
              />
            </Form.Group>
            <Row className="my-3">
              <h2>Services available:</h2>
              <Col md={3}>
                <h3>General</h3>
                <Form.Check
                  label="Air conditioning"
                  type="checkbox"
                  value={"Air conditioning"}
                  checked={facilities.includes("Air conditioning")}
                  className="d-flex align-items-center checkbox-custom fw-semibold my-3"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (e.target.checked) {
                      setFacilities([...facilities, value]);
                    } else {
                      setFacilities(
                        facilities.filter((facility) => facility !== value)
                      );
                    }
                  }}
                />
                <Form.Check
                  label="Heating"
                  type="checkbox"
                  value={"Heating"}
                  checked={facilities.includes("Heating")}
                  className="d-flex align-items-center checkbox-custom fw-semibold my-3"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (e.target.checked) {
                      setFacilities([...facilities, value]);
                    } else {
                      setFacilities(
                        facilities.filter((facility) => facility !== value)
                      );
                    }
                  }}
                />
                <Form.Check
                  label="Free wifi"
                  type="checkbox"
                  value={"Free wifi"}
                  checked={facilities.includes("Free wifi")}
                  className="d-flex align-items-center checkbox-custom fw-semibold my-3"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (e.target.checked) {
                      setFacilities([...facilities, value]);
                    } else {
                      setFacilities(
                        facilities.filter((facility) => facility !== value)
                      );
                    }
                  }}
                />
              </Col>
              <Col md={3}>
                <h3>Cooking & Cleaning</h3>
                <Form.Check
                  label="Kitchen"
                  type="checkbox"
                  value={"Kitchen"}
                  checked={facilities.includes("Kitchen")}
                  className="d-flex align-items-center checkbox-custom fw-semibold my-3"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (e.target.checked) {
                      setFacilities([...facilities, value]);
                    } else {
                      setFacilities(
                        facilities.filter((facility) => facility !== value)
                      );
                    }
                  }}
                />
                <Form.Check
                  label="Washing machine"
                  type="checkbox"
                  value={"Washing machine"}
                  checked={facilities.includes("Washing machine")}
                  className="d-flex align-items-center checkbox-custom fw-semibold my-3"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (e.target.checked) {
                      setFacilities([...facilities, value]);
                    } else {
                      setFacilities(
                        facilities.filter((facility) => facility !== value)
                      );
                    }
                  }}
                />
              </Col>
              <Col md={3}>
                <h3>Entertainment</h3>
                <Form.Check
                  label="Television"
                  type="checkbox"
                  value={"Television"}
                  checked={facilities.includes("Television")}
                  className="d-flex align-items-center checkbox-custom fw-semibold my-3"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (e.target.checked) {
                      setFacilities([...facilities, value]);
                    } else {
                      setFacilities(
                        facilities.filter((facility) => facility !== value)
                      );
                    }
                  }}
                />
                <Form.Check
                  label="Games"
                  type="checkbox"
                  value={"Games"}
                  checked={facilities.includes("Games")}
                  className="d-flex align-items-center checkbox-custom fw-semibold my-3"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (e.target.checked) {
                      setFacilities([...facilities, value]);
                    } else {
                      setFacilities(
                        facilities.filter((facility) => facility !== value)
                      );
                    }
                  }}
                />
                <Form.Check
                  label="Hot tub"
                  type="checkbox"
                  value={"Hot tub"}
                  checked={facilities.includes("Hot tub")}
                  className="d-flex align-items-center checkbox-custom fw-semibold my-3"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (e.target.checked) {
                      setFacilities([...facilities, value]);
                    } else {
                      setFacilities(
                        facilities.filter((facility) => facility !== value)
                      );
                    }
                  }}
                />
              </Col>
              <Col md={3}>
                <h3>Outside & View</h3>
                <Form.Check
                  label="Balcony"
                  type="checkbox"
                  value={"Balcony"}
                  checked={facilities.includes("Balcony")}
                  className="d-flex align-items-center checkbox-custom fw-semibold my-3"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (e.target.checked) {
                      setFacilities([...facilities, value]);
                    } else {
                      setFacilities(
                        facilities.filter((facility) => facility !== value)
                      );
                    }
                  }}
                />
                <Form.Check
                  label="Terrace"
                  type="checkbox"
                  value={"Terrace"}
                  checked={facilities.includes("Terrace")}
                  className="d-flex align-items-center checkbox-custom fw-semibold my-3"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (e.target.checked) {
                      setFacilities([...facilities, value]);
                    } else {
                      setFacilities(
                        facilities.filter((facility) => facility !== value)
                      );
                    }
                  }}
                />
                <Form.Check
                  label="Nature & Greenery"
                  type="checkbox"
                  value={"Nature & Greenery"}
                  checked={facilities.includes("Nature & Greenery")}
                  className="d-flex align-items-center checkbox-custom fw-semibold my-3"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (e.target.checked) {
                      setFacilities([...facilities, value]);
                    } else {
                      setFacilities(
                        facilities.filter((facility) => facility !== value)
                      );
                    }
                  }}
                />
              </Col>
            </Row>
            <div>
              <h2>House Rules:</h2>
              <div className="d-flex align-items-center gap-5">
                <Form.Check
                  label="Smoking"
                  type="checkbox"
                  value={"Smoking"}
                  checked={rules.includes("Smoking")}
                  className="d-flex align-items-center checkbox-custom fw-semibold my-3"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (e.target.checked) {
                      setRules([...rules, value]);
                    } else {
                      setRules(rules.filter((rule) => rule !== value));
                    }
                  }}
                />
                <Form.Check
                  label="Alcohol"
                  type="checkbox"
                  value={"Alcohol"}
                  checked={rules.includes("Alcohol")}
                  className="d-flex align-items-center checkbox-custom fw-semibold my-3"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (e.target.checked) {
                      setRules([...rules, value]);
                    } else {
                      setRules(rules.filter((rule) => rule !== value));
                    }
                  }}
                />
                <Form.Check
                  label="Pets"
                  type="checkbox"
                  value={"Pets"}
                  checked={rules.includes("Pets")}
                  className="d-flex align-items-center checkbox-custom fw-semibold my-3"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (e.target.checked) {
                      setRules([...rules, value]);
                    } else {
                      setRules(rules.filter((rule) => rule !== value));
                    }
                  }}
                />
                <Form.Check
                  label="Parties & Events"
                  type="checkbox"
                  value={"Parties & Events"}
                  checked={rules.includes("Parties & Events")}
                  className="d-flex align-items-center checkbox-custom fw-semibold my-3"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (e.target.checked) {
                      setRules([...rules, value]);
                    } else {
                      setRules(rules.filter((rule) => rule !== value));
                    }
                  }}
                />
              </div>
            </div>
            <Form.Group className="my-3 w-50">
              <Form.Label htmlFor="accommodation" className="fw-semibold fs-4">
                Number of people Accomodable:
              </Form.Label>
              <Form.Control
                type="number"
                name="accomodation"
                id="accomodation"
                min={1}
                required
                value={accomodation}
                onChange={(e) => setAccomodation(e.target.value)}
                className="fs-5"
              />
            </Form.Group>
            <Row className="my-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label htmlFor="check-in" className="fw-semibold fs-4">
                    Check-in:
                  </Form.Label>
                  <Form.Control
                    type="time"
                    name="check-in"
                    id="check-in"
                    required
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="fs-5"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label htmlFor="check-out" className="fw-semibold fs-4">
                    Check-out:
                  </Form.Label>
                  <Form.Control
                    type="time"
                    name="check-out"
                    id="check-out"
                    required
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="fs-5"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="my-3">
              <Form.Label className="fw-semibold fs-4">
                Service Description:
              </Form.Label>
              <Form.Control
                as={"textarea"}
                type="text"
                name="description"
                id="description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="fs-5 textarea-custom"
              />
            </Form.Group>
            <Form.Label htmlFor="rate" className="fw-semibold fs-4 mt-3">
              Charge per night:
            </Form.Label>
            <InputGroup className="mb-3 w-50">
              <InputGroup.Text>BTN</InputGroup.Text>
              <Form.Control
                type="number"
                inputMode="numeric"
                id="rate"
                min={1}
                value={rate}
                required
                size="lg"
                onChange={(e) => {
                  setRate(e.target.value);
                }}
              />
            </InputGroup>
            <div className="d-flex gap-3 justify-content-end mb-3">
              <Button type="button" variant="danger" onClick={resetHandler}>
                Discard Changes
              </Button>
              {loadingUpdate ? (
                <Button type="submit" variant="success">
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                </Button>
              ) : (
                <Button type="submit" variant="success">
                  Save Changes
                </Button>
              )}
            </div>
          </Form>
          <section className="mt-4">
            <h2 className="fw-semibold mb-4" style={{ color: "red" }}>
              Dangerzone:
            </h2>
            <Button variant="danger" onClick={() => setModalShow(true)}>
              Delete Property
            </Button>
          </section>
          <ConfirmationModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            homestayId={homestay.homestay_id}
          />
        </>
      )}
    </main>
  );
}

export default PropertyPage;
