import { Card} from "react-bootstrap";
import { Link } from "react-router-dom";
import {FaStar} from 'react-icons/fa';

const Homestay=({homestay})=>{
    return(
        <Card className='my-3 rounded'>
                <Link to={`/homestay/${homestay._id}`}>
                    <Card.Img src={homestay.images[0]} variant='top' />
                </Link>
                <Card.Body>
                    <Link to={`/homestay/${homestay._id}`} className="text-decoration-none">
                    <div className="d-flex justify-content-between">
                        <Card.Title as='div' className="homestay-title m-0">
                            <h2 className="text-dark fs-5 m-0">{homestay.title}</h2>
                        </Card.Title>
                        <Card.Text as='div' className="text-dark text-nowrap m-0"><FaStar/> {homestay.rating}({homestay.num_reviews})</Card.Text>
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