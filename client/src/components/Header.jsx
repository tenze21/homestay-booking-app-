import { Link } from "react-router-dom";
import { RxQuestionMarkCircled } from "react-icons/rx";
import { useState } from "react";
import '../assets/styles/base.css';

    // Start of Selection
    function Header(){
        const [isOpen, setIsOpen] = useState(false);
        return(
            <nav className="navbar_custom">
                <Link className="nav-brand-custom" to="/">Homestay</Link>
                <div className="property-list">
                    <Link className="nav-link-custom" to="/list_property">List Your Property</Link>
                    <div className="tooltip-container">
                        <RxQuestionMarkCircled 
                            onMouseEnter={() => setIsOpen(true)} 
                            onMouseLeave={() => setIsOpen(false)} 
                        />
                        {isOpen && <div className="tooltip-custom">Visit the link to list your property on our platform. Ensure to provide all necessary details and photos for a successful listing.</div>}
                    </div>
                </div>
                <div className="nav-btns">
                    <Link className="nav-link-custom" to="/login">Login</Link>
                    <Link className="nav-link-custom" to="/signup">Signup</Link>
                </div>
            </nav>
        )
    }
export default Header;