import React, { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import { IoChevronBackCircle } from 'react-icons/io5';
import '../../style/Navbar.css';
import { clearToken } from "../../feature/redux/slice/tokenSlice";
import { useDispatch } from 'react-redux';

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
  const dispatch = useDispatch();

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleProfileClick = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    setLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    dispatch(clearToken());
    navigate('/');
  };

  const cancelLogout = () => {
    setLogoutModalOpen(false);
  };
  const handleClick = () => {
    navigate('/my-profile');
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
              <button onClick={() => navigate('/my-profile')}>My Profile</button>
              <button onClick={() => navigate('/update-profile')}>Update Profile</button>
              <button onClick={() => navigate('/change-password')}>Change Password</button>
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
