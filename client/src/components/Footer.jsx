import { FaFacebook, FaInstagramSquare, FaLinkedin  } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs"
import { Link } from "react-router-dom";

function Footer(){
    return(
        <footer>
            <div className="logo"><p>Homestay</p></div>
            <div className="site-links">
                <Link to="/">Terms and conditions</Link>
                <Link to="/">Privacy policy</Link>
                <Link to="/">Cookie policy</Link>
            </div>
            <div className="social-links">
                <h3>Connect with us on:</h3>
                <div className="social-icons">
                    <FaFacebook className="icon"/>
                    <FaInstagramSquare className="icon"/>
                    <BsTwitterX className="icon"/>
                    <FaLinkedin className="icon"/>
                </div>
            </div>
        </footer>
    )
}
export default Footer;