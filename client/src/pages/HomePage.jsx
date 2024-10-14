import { Row, Col } from "react-bootstrap";
import homestays from "../data/homestays";
import Homestay from "../components/Homestay.jsx";
import "../assets/styles/homePage.css"

function HomePage(){
    return(
        <>
            <h1 className="fs-3">Homestays Across Bhutan</h1>
            <Row>
                {homestays.map((homestay)=>{
                    return(
                        <Col key={homestay._id} sm={12} md={6} lg={4} xl={3}>
                            <Homestay homestay={homestay}/>
                        </Col>
                    )
                })}
            </Row>
        </>
    )
}
export default HomePage;