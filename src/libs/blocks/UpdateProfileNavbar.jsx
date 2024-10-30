import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { IoChevronBackCircle } from "react-icons/io5";
import "../../style/Navbar.css";

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
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate("/catalog");
  };

  const handleProfileClick = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    setLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    // Perform the logout logic here (e.g., clearing tokens, redirecting to login)
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    navigate("/");
  };

  const cancelLogout = () => {
    setLogoutModalOpen(false);
  };

  return (
    <div>
      <header className="home-header1">
        <div className="header-left1">
          <IoChevronBackCircle className="hamburger-icon1" onClick={handleCartClick} />
        </div>
        <div>
          <div>
            <CgProfile className="profile-icon1" onClick={handleProfileClick} />
          </div>
          {isDropdownOpen && (
            <div className="profiledropdown">
              <button onClick={() => navigate("/my-profile")}>My Profile</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </header>
      {isLogoutModalOpen && (
        <LogoutConfirmation confirmLogout={confirmLogout} cancelLogout={cancelLogout} />
      )}
    </div>
  );
};

export default Nav;
