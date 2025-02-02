import { RxQuestionMarkCircled } from "react-icons/rx";
import "../assets/styles/base.css";
import { NavDropdown, Image } from "react-bootstrap";
import { TbLogout2 } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice.js";
import { logout } from "../slices/authSlice";

// Start of Selection
function Header() {
  const { userInfo } = useSelector((state) => state.auth);
  const navigationState= useSelector((state)=>state.navigationState);

  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="navbar_custom">
      <Link className="nav-brand-custom" to="/">
        Homestay
      </Link>
      {userInfo ? (
        <>
        {userInfo.isHost !== true && (
          <div className="property-list">
            <Link className="nav-link-custom" to="/property_listing/basic_information">
              List Your Property
            </Link>
            <div className="tooltip-container">
              <RxQuestionMarkCircled
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
              />
              {isOpen && (
                <div className="tooltip-custom">
                  Visit the link to list your property on our platform. Ensure
                  to provide all necessary details and photos for a successful
                  listing.
                </div>
              )}
            </div>
          </div>
        )}
        {userInfo.isHost === true && (
            <div className="host-nav">
                <ul className="host-nav-list">
                    <li>
                      {navigationState===1? (
                        <Link to="/myproperty" className="active-nav">Property</Link>
                      ) : (
                        <Link to="/myproperty">Property</Link>
                      )}
                    </li>
                    {navigationState===2? (
                      <li><Link to="/reservations" className="active-nav">Reservations</Link></li>
                    ) : (
                      <li><Link to="/reservations">Reservations</Link></li>
                    )}
                    {navigationState===3? (
                      <li><Link to="/reviews" className="active-nav">Reviews</Link></li>
                    ) : (
                      <li><Link to="/reviews">Reviews</Link></li>
                    )}
                </ul>
            </div>
        )}
          <NavDropdown
            className="nav-dropdown-custom fs-4"
            title={userInfo.fullName}
          >
            <Link to="/user/profile" className="profile-link">
              <Image src={userInfo.profile} className="me-3" />
              Profile
            </Link>
            <p onClick={logoutHandler} className="logout-link">
              <TbLogout2 size={32} className="me-4" /> Logout
            </p>
          </NavDropdown>
        </>
      ) : (
        <div className="nav-btns">
          <Link className="nav-link-custom" to="/login">
            Sign in 
          </Link>
          <FaUser size={24}/>
        </div>
      )}
    </nav>
  );
}
export default Header;
