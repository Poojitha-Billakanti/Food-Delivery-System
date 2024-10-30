import React from "react";
import { IoChevronBackCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "../../style/ProfileNavbar.css";

const Nav = () => {
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate("/catalog");
  };

  const handleLogout = () => {
    // Perform logout logic here
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    navigate("/sign-in");
  };

  return (
    <header className="home-header2">
      <div className="header-left2">
        <IoChevronBackCircle
          className="hamburger-icon2"
          onClick={handleCartClick}
        />
      </div>
      <div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Nav;
