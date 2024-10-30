import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../style/UpdateProfile.css";
import Navbar from "../libs/blocks/UpdateProfileNavbar.jsx";

const UpdateProfile = () => {
  const authToken = useSelector((state) => state.tokenLoader.token);
  const userId = useSelector((state) => state.tokenLoader.id);
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    address: "",
    mobileNumber: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await axios.get(
        `http://localhost:8080/auth/my-profile/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setProfile(response.data);
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/auth/update-profile`, profile, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    navigate("/my-profile");
  };

  return (
    <div className="container">
      <Navbar />
      <div className="update-profile-container">
        <h2>Update Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={profile.fullName}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              readOnly
              className="read-only-input"
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={profile.address}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <label>Mobile Number:</label>
            <input
              type="text"
              name="mobileNumber"
              value={profile.mobileNumber}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
          <button type="submit">Update Profile</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
