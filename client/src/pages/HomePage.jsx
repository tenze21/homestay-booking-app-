import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
// import homestays from "../data/homestays";
import Homestay from "../components/Homestay.jsx";
import "../assets/styles/homePage.css";
import Meta from "../components/Meta.jsx";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import NearbyHomestays from "../components/NearbyHomestays.jsx";
import { useGetHomestaysQuery } from "../slices/homestaysApiSlice.js";
import { setNavigation } from "../slices/navigationSlice.js";
import { useDispatch } from "react-redux";

function HomePage() {
  const { data: homestays, isLoading, error } = useGetHomestaysQuery();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setNavigation(0));
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
        <Meta/>
          <NearbyHomestays homestays={homestays}/>
          <h1 className="fs-3">Homestays Across Bhutan</h1>
          <Row as="section">
            {homestays.map((homestay) => {
              return (
                <Col key={homestay._id} sm={12} md={6} lg={4} xl={3}>
                  <Homestay homestay={homestay} />
                </Col>
              );
            })}
          </Row>
        </>
      )}
    </>
  );
}
export default HomePage;
