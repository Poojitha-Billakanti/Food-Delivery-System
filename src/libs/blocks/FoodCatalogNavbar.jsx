import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaCartShopping } from "react-icons/fa6";
import { useDispatch } from 'react-redux';
import { clearToken } from "../../feature/redux/slice/tokenSlice";
import "../../style/Home.css";
import { useNavigate } from "react-router-dom";

const LogoutConfirmation = ({ confirmLogout, cancelLogout }) => (
  <div className="confirmation-modal">
    <div className="confirmation-content">
      <p>Are you sure you want to log out?</p>
      <div>
        <button onClick={confirmLogout}>Yes</button>
        <button onClick={cancelLogout}>No</button>
      </div>
    </div>
  </div>
);

const Nav = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleLogout = () => {
    setLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    dispatch(clearToken());
    navigate("/");
  };

  const cancelLogout = () => {
    setLogoutModalOpen(false);
  };

  return (
    <div>
      <header className="home-header">
        <div className="header-right">
          <FaCartShopping
            className="notification-icon"
            onClick={handleCartClick}
          />
          <div
            className="profile-container"
            onClick={() => setDropdownOpen(!isDropdownOpen)}
          >
            <CgProfile className="profile-icon" />
            {isDropdownOpen && (
              <div className="profile-dropdown">
                <button onClick={() => navigate("/my-profile")}>My Profile</button>
                <button onClick={() => navigate("/update-profile")}>Update Profile</button>
                <button onClick={() => navigate("/change-password")}>Change Password</button>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </header>
      {isLogoutModalOpen && (
        <LogoutConfirmation
          confirmLogout={confirmLogout}
          cancelLogout={cancelLogout}
        />
      )}
    </div>
  );
};

export default Nav;
