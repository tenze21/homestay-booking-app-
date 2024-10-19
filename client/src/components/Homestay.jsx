import { Card} from "react-bootstrap";
import { Link } from "react-router-dom";
import {FaStar} from 'react-icons/fa';

const Homestay=({homestay})=>{
    return(
        <Card className='my-3 rounded'>
                <Link to={`/homestay/${homestay.homestay_id}`}>
                    <Card.Img src={homestay.images[0]} variant='top' />
                </Link>
                <Card.Body>
                    <Link to={`/homestay/${homestay.homestay_id}`} className="text-decoration-none">
                    <div className="d-flex justify-content-between">
                        <Card.Title as='div' className="homestay-title m-0">
                            <h2 className="text-dark fs-5 m-0">{homestay.title}</h2>
                        </Card.Title>
                        <Card.Text as='p' className="text-dark text-nowrap m-0 d-flex align-items-center fs-5 fw-semibold"><FaStar size={24} /> <span className="ms-1">{homestay.rating}({homestay.numreviews})</span></Card.Text>
                    </div>
                    </Link>
                    <Card.Text as='p' className="m-0 fw-semibold text-secondary mb-2">
                        {homestay.gewog}, {homestay.dzongkhag}
                    </Card.Text>
                    <Card.Text as='p' className="m-0">
                        BTN {homestay.rate}/night
                    </Card.Text>
                </Card.Body>
            </Card>
    )
}
export default Homestay;